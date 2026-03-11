"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProjectDto, managerId) {
        return this.prisma.project.create({
            data: { ...createProjectDto, managerId },
        });
    }
    findAll(organizationId) {
        return this.prisma.project.findMany({
            where: { organizationId },
            include: {
                contributions: true,
                expenses: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: { contributions: true, expenses: true },
        });
    }
    addContribution(projectId, dto) {
        return this.prisma.projectContribution.create({
            data: { ...dto, projectId },
        });
    }
    addExpense(projectId, dto, recordedById) {
        return this.prisma.projectExpense.create({
            data: { ...dto, projectId, recordedById },
        });
    }
    async getProgress(id) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project)
            throw new Error('Project not found');
        const contributions = await this.prisma.projectContribution.aggregate({
            where: { projectId: id },
            _sum: { amount: true },
        });
        const expenses = await this.prisma.projectExpense.aggregate({
            where: { projectId: id },
            _sum: { amount: true },
        });
        const totalContributions = contributions._sum.amount || 0;
        const totalExpenses = expenses._sum.amount || 0;
        return {
            budget: project.budget,
            totalContributions,
            totalExpenses,
            balance: totalContributions - totalExpenses,
            progressPercentage: (totalContributions / project.budget) * 100,
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map