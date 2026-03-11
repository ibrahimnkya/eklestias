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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const finance_dtos_1 = require("./dto/finance-dtos");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let FinanceController = class FinanceController {
    financeService;
    auditLogsService;
    constructor(financeService, auditLogsService) {
        this.financeService = financeService;
        this.auditLogsService = auditLogsService;
    }
    getSummary(query) {
        return this.financeService.getSummary(query);
    }
    getRecords(query) {
        return this.financeService.getRecords(query);
    }
    getReport(query) {
        return this.financeService.getReport(query);
    }
    async createTithe(createTitheDto, req) {
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
    async createOffering(createOfferingDto, req) {
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
    async createPledge(createPledgeDto, req) {
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
    async addPledgePayment(id, paymentDto, req) {
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
};
exports.FinanceController = FinanceController;
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getSummary", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Get)('records'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getRecords", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Get)('report'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getReport", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Post)('tithes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [finance_dtos_1.CreateTitheDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createTithe", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Post)('offerings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [finance_dtos_1.CreateOfferingDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createOffering", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Post)('pledges'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [finance_dtos_1.CreatePledgeDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createPledge", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'FINANCE_OFFICER'),
    (0, common_1.Post)('pledges/:id/payments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, finance_dtos_1.CreatePledgePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "addPledgePayment", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('finance'),
    __metadata("design:paramtypes", [finance_service_1.FinanceService,
        audit_logs_service_1.AuditLogsService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map