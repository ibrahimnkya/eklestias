import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, AddProjectContributionDto, AddProjectExpenseDto } from './dto/project.dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
        return this.projectsService.create(createProjectDto, req.user.userId);
    }

    @Get()
    findAll(@Query('organizationId') organizationId: string) {
        return this.projectsService.findAll(organizationId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post(':id/contributions')
    addContribution(@Param('id') id: string, @Body() dto: AddProjectContributionDto) {
        return this.projectsService.addContribution(id, dto);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post(':id/expenses')
    addExpense(@Param('id') id: string, @Body() dto: AddProjectExpenseDto, @Request() req: any) {
        return this.projectsService.addExpense(id, dto, req.user.userId);
    }

    @Get(':id/progress')
    getProgress(@Param('id') id: string) {
        return this.projectsService.getProgress(id);
    }
}
