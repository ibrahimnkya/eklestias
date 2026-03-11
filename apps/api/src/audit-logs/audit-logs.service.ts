import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
    constructor(private prisma: PrismaService) { }

    findAll(skip: number = 0, take: number = 50) {
        return this.prisma.auditLog.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        });
    }

    async create(data: { userId?: string, action: string, entity: string, entityId?: string, details?: string }) {
        return this.prisma.auditLog.create({
            data
        });
    }
}
