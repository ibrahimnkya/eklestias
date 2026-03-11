import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentsService {
    constructor(private prisma: PrismaService) { }

    async findAll(organizationId: string) {
        return this.prisma.department.findMany({
            where: { organizationId },
            include: {
                _count: {
                    select: { members: true },
                },
                members: {
                    take: 1
                }
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.department.findUnique({
            where: { id },
            include: {
                members: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        status: true,
                    }
                },
                _count: {
                    select: { members: true },
                },
            },
        });
    }
}
