import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrganizationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrganizationDto: CreateOrganizationDto): import("@prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.OrganizationType;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.OrganizationType;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__OrganizationClient<({
        branches: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        }[];
    } & {
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.OrganizationType;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): import("@prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.OrganizationType;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.OrganizationType;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
