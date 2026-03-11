import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('audit-logs')
export class AuditLogsController {
    constructor(private readonly auditLogsService: AuditLogsService) { }

    @Roles('SUPER_ADMIN', 'FOUNDER')
    @Get()
    findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
        return this.auditLogsService.findAll(skip ? parseInt(skip) : 0, take ? parseInt(take) : 50);
    }
}
