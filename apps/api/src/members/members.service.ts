import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberStatusDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
    constructor(private prisma: PrismaService) { }

    create(createMemberDto: CreateMemberDto, registeredById: string) {
        return this.prisma.member.create({
            data: {
                ...createMemberDto,
                registeredById,
            },
        });
    }

    findAll(organizationId: string, branchId?: string, status?: any) {
        const where: any = { organizationId, deletedAt: null };
        if (branchId) where.branchId = branchId;
        if (status) where.status = status;

        return this.prisma.member.findMany({
            where,
            include: {
                branch: true,
                department: true,
            },
        });
    }

    findOne(id: string) {
        return this.prisma.member.findUnique({
            where: { id },
            include: { branch: true, department: true }
        });
    }

    updateStatus(id: string, updateMemberStatusDto: UpdateMemberStatusDto) {
        return this.prisma.member.update({
            where: { id },
            data: { status: updateMemberStatusDto.status },
        });
    }

    remove(id: string) {
        // Soft delete
        return this.prisma.member.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
