import { PrismaService } from '../prisma/prisma.service';
export declare class DepartmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(organizationId: string): Promise<({
        members: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
            branchId: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            gender: string | null;
            maritalStatus: string | null;
            occupation: string | null;
            baptismStatus: boolean;
            emergencyContact: string | null;
            photoUrl: string | null;
            status: import("@prisma/client").$Enums.MemberStatus;
            joinDate: Date;
            deletedAt: Date | null;
            departmentId: string | null;
            registeredById: string | null;
        }[];
        _count: {
            members: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    })[]>;
    findOne(id: string): Promise<({
        members: {
            id: string;
            firstName: string;
            lastName: string;
            status: import("@prisma/client").$Enums.MemberStatus;
        }[];
        _count: {
            members: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }) | null>;
}
