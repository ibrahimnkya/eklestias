import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Get('dashboard')
    getDashboardStats(@Query('organizationId') organizationId: string) {
        return this.analyticsService.getDashboardStats(organizationId);
    }
}
