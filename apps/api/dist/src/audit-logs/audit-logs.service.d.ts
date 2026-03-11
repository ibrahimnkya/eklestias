import { PrismaService } from '../prisma/prisma.service';
export declare class AuditLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(skip?: number, take?: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entity: string;
        entityId: string | null;
        details: string | null;
    }[]>;
    create(data: {
        userId?: string;
        action: string;
        entity: string;
        entityId?: string;
        details?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entity: string;
        entityId: string | null;
        details: string | null;
    }>;
}
