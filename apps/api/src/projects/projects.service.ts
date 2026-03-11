import { Injectable } from '@nestjs/common';
import { CreateProjectDto, AddProjectContributionDto, AddProjectExpenseDto } from './dto/project.dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    create(createProjectDto: CreateProjectDto, managerId: string) {
        return this.prisma.project.create({
            data: { ...createProjectDto, managerId },
        });
    }

    findAll(organizationId: string) {
        return this.prisma.project.findMany({
            where: { organizationId },
            include: {
                contributions: true,
                expenses: true,
            },
        });
    }

    findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: { contributions: true, expenses: true },
        });
    }

    addContribution(projectId: string, dto: AddProjectContributionDto) {
        return this.prisma.projectContribution.create({
            data: { ...dto, projectId },
        });
    }

    addExpense(projectId: string, dto: AddProjectExpenseDto, recordedById: string) {
        return this.prisma.projectExpense.create({
            data: { ...dto, projectId, recordedById },
        });
    }

    async getProgress(id: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) throw new Error('Project not found');
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
}
