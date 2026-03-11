import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { CreateTitheDto, CreateOfferingDto, CreatePledgeDto, CreatePledgePaymentDto } from './dto/finance-dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('finance')
export class FinanceController {
    constructor(
        private readonly financeService: FinanceService,
        private readonly auditLogsService: AuditLogsService
    ) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Get('summary')
    getSummary(@Query() query: any) {
        return this.financeService.getSummary(query);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Get('records')
    getRecords(@Query() query: any) {
        return this.financeService.getRecords(query);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Get('report')
    getReport(@Query() query: any) {
        return this.financeService.getReport(query);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post('tithes')
    async createTithe(@Body() createTitheDto: CreateTitheDto, @Request() req: any) {
        const res = await this.financeService.createTithe(createTitheDto);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'CREATE_TITHE',
            entity: 'Tithe',
            entityId: res.id,
            details: `Tithe of ${res.amount} recorded`
        });
        return res;
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post('offerings')
    async createOffering(@Body() createOfferingDto: CreateOfferingDto, @Request() req: any) {
        const res = await this.financeService.createOffering(createOfferingDto);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'CREATE_OFFERING',
            entity: 'Offering',
            entityId: res.id,
            details: `${res.type} offering of ${res.amount} recorded`
        });
        return res;
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post('pledges')
    async createPledge(@Body() createPledgeDto: CreatePledgeDto, @Request() req: any) {
        const res = await this.financeService.createPledge(createPledgeDto);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'CREATE_PLEDGE',
            entity: 'Pledge',
            entityId: res.id,
            details: `Pledge for ${res.campaignName} of ${res.targetAmount} recorded`
        });
        return res;
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER')
    @Post('pledges/:id/payments')
    async addPledgePayment(@Param('id') id: string, @Body() paymentDto: CreatePledgePaymentDto, @Request() req: any) {
        const res = await this.financeService.addPledgePayment(id, paymentDto);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'ADD_PLEDGE_PAYMENT',
            entity: 'PledgePayment',
            entityId: res.id,
            details: `Payment of ${res.amount} for pledge ${id}`
        });
        return res;
    }
}
