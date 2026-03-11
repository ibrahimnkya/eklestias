import { UsersService } from './users.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class UsersController {
    private readonly usersService;
    private readonly auditLogsService;
    constructor(usersService: UsersService, auditLogsService: AuditLogsService);
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
    findOne(id: string): Promise<({
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
    create(createUserDto: any, req: any): Promise<{
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
    update(id: string, updateUserDto: any, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
