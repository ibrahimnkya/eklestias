import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
                organization: true,
            },
        });
    }

    async findAll(organizationId: string) {
        return this.prisma.user.findMany({
            where: { organizationId },
            include: {
                role: true,
                branch: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
                branch: true,
            },
        });
    }

    async create(data: any) {
        return this.prisma.user.create({
            data,
            include: {
                role: true,
                branch: true,
            },
        });
    }

    async update(id: string, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: {
                role: true,
                branch: true,
            },
        });
    }

    async delete(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
