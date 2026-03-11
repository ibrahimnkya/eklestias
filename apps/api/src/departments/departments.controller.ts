import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) { }

    @Get()
    findAll(@Query('organizationId') organizationId: string) {
        return this.departmentsService.findAll(organizationId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.departmentsService.findOne(id);
    }
}
