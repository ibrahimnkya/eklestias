import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { OrganizationType } from '@prisma/client';

const DEFAULT_ROLES = [
    { name: 'SUPER_ADMIN', level: 0 },
    { name: 'FOUNDER', level: 1 },
    { name: 'REGIONAL_LEADER', level: 2 },
    { name: 'BRANCH_PASTOR', level: 3 },
    { name: 'FINANCE_OFFICER', level: 4 },
    { name: 'DEPARTMENT_LEADER', level: 5 },
    { name: 'USHER', level: 6 },
    { name: 'MEMBER', level: 7 },
];

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existingUser) {
            throw new BadRequestException('Email already in use.');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        try {
            const result = await this.prisma.$transaction(async (tx) => {
                // 1. Create Organization
                let orgType: OrganizationType = OrganizationType.INDEPENDENT_CHURCH;
                if (dto.churchType === 'DIOCESE') orgType = OrganizationType.DIOCESE;
                else if (dto.churchType === 'MINISTRY') orgType = OrganizationType.MINISTRY;
                else if (dto.churchType === 'CHURCH_NETWORK') orgType = OrganizationType.CHURCH_NETWORK;

                const org = await tx.organization.create({
                    data: {
                        name: dto.churchName,
                        type: orgType,
                    }
                });

                // 2. Create Roles
                const rolesData = DEFAULT_ROLES.map(r => ({ ...r, organizationId: org.id }));
                await tx.role.createMany({ data: rolesData });

                const founderRole = await tx.role.findFirst({
                    where: { organizationId: org.id, name: 'FOUNDER' }
                });

                if (!founderRole) throw new Error("Could not create Founder role.");

                // 3. Create User
                const user = await tx.user.create({
                    data: {
                        organizationId: org.id,
                        roleId: founderRole.id,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        email: dto.email,
                        password: hashedPassword,
                    },
                    include: { role: true }
                });

                return user;
            });

            // Auto-login after successful registration
            return this.login(result);

        } catch (error) {
            throw new BadRequestException('Failed to register. Please try again.');
        }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role?.name || user.role, // Handle raw or nested role
            roleLevel: user.role?.level,
            organizationId: user.organizationId,
            branchId: user.branchId,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: payload.role,
                roleLevel: payload.roleLevel,
                organizationId: user.organizationId,
                branchId: user.branchId,
            },
        };
    }
}
