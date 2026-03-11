import { ProjectsService } from './projects.service';
import { CreateProjectDto, AddProjectContributionDto, AddProjectExpenseDto } from './dto/project.dtos';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        branchId: string | null;
        description: string | null;
        budget: number;
        managerId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(organizationId: string): import("@prisma/client").Prisma.PrismaPromise<({
        contributions: {
            id: string;
            createdAt: Date;
            date: Date;
            memberId: string | null;
            amount: number;
            paymentMethod: string;
            reference: string | null;
            projectId: string;
        }[];
        expenses: {
            id: string;
            createdAt: Date;
            date: Date;
            amount: number;
            description: string;
            projectId: string;
            recordedById: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        branchId: string | null;
        description: string | null;
        budget: number;
        managerId: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ProjectClient<({
        contributions: {
            id: string;
            createdAt: Date;
            date: Date;
            memberId: string | null;
            amount: number;
            paymentMethod: string;
            reference: string | null;
            projectId: string;
        }[];
        expenses: {
            id: string;
            createdAt: Date;
            date: Date;
            amount: number;
            description: string;
            projectId: string;
            recordedById: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        branchId: string | null;
        description: string | null;
        budget: number;
        managerId: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    addContribution(id: string, dto: AddProjectContributionDto): import("@prisma/client").Prisma.Prisma__ProjectContributionClient<{
        id: string;
        createdAt: Date;
        date: Date;
        memberId: string | null;
        amount: number;
        paymentMethod: string;
        reference: string | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    addExpense(id: string, dto: AddProjectExpenseDto, req: any): import("@prisma/client").Prisma.Prisma__ProjectExpenseClient<{
        id: string;
        createdAt: Date;
        date: Date;
        amount: number;
        description: string;
        projectId: string;
        recordedById: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getProgress(id: string): Promise<{
        budget: number;
        totalContributions: number;
        totalExpenses: number;
        balance: number;
        progressPercentage: number;
    }>;
}
