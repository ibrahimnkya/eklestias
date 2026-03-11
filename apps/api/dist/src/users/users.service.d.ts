import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findAll(organizationId: string): Promise<({
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        } | null;
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            level: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        email: string;
        branchId: string | null;
        roleId: string;
        password: string;
        firstName: string;
        lastName: string;
    })[]>;
    findById(id: string): Promise<({
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        } | null;
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            level: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        email: string;
        branchId: string | null;
        roleId: string;
        password: string;
        firstName: string;
        lastName: string;
    }) | null>;
    create(data: any): Promise<{
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        } | null;
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            level: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        email: string;
        branchId: string | null;
        roleId: string;
        password: string;
        firstName: string;
        lastName: string;
    }>;
    update(id: string, data: any): Promise<{
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        } | null;
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            level: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        email: string;
        branchId: string | null;
        roleId: string;
        password: string;
        firstName: string;
        lastName: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        email: string;
        branchId: string | null;
        roleId: string;
        password: string;
        firstName: string;
        lastName: string;
    }>;
}
