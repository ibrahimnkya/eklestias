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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanceService = class FinanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createTithe(createTitheDto) {
        return this.prisma.tithe.create({ data: createTitheDto });
    }
    createOffering(createOfferingDto) {
        return this.prisma.offering.create({ data: createOfferingDto });
    }
    createPledge(createPledgeDto) {
        return this.prisma.pledge.create({
            data: {
                ...createPledgeDto,
                dueDate: createPledgeDto.dueDate ? new Date(createPledgeDto.dueDate) : null,
            },
        });
    }
    async addPledgePayment(pledgeId, paymentDto) {
        const payment = await this.prisma.pledgePayment.create({
            data: { ...paymentDto, pledgeId }
        });
        const pledge = await this.prisma.pledge.findUnique({ where: { id: pledgeId } });
        if (!pledge)
            throw new Error('Pledge not found');
        const newTotal = pledge.totalPaid + paymentDto.amount;
        const status = newTotal >= pledge.targetAmount ? 'COMPLETED' : 'PENDING';
        await this.prisma.pledge.update({
            where: { id: pledgeId },
            data: { totalPaid: newTotal, status }
        });
        return payment;
    }
    async getBranchReport(branchId) {
        const tithes = await this.prisma.tithe.aggregate({
            where: { branchId },
            _sum: { amount: true },
        });
        const offerings = await this.prisma.offering.aggregate({
            where: { branchId },
            _sum: { amount: true },
        });
        const pledges = await this.prisma.pledgePayment.aggregate({
            where: { pledge: { branchId } },
            _sum: { amount: true },
        });
        return {
            totalTithes: tithes._sum.amount || 0,
            totalOfferings: offerings._sum.amount || 0,
            totalPledgePayments: pledges._sum.amount || 0,
            totalRevenue: (tithes._sum.amount || 0) + (offerings._sum.amount || 0) + (pledges._sum.amount || 0),
        };
    }
    async getSummary(query) {
        const { organizationId, branchId, from, to } = query;
        const where = { branch: { organizationId } };
        if (branchId)
            where.branchId = branchId;
        if (from || to) {
            where.date = {};
            if (from)
                where.date.gte = new Date(from);
            if (to)
                where.date.lte = new Date(to);
        }
        const [tithes, offerings, pledges] = await Promise.all([
            this.prisma.tithe.aggregate({ where, _sum: { amount: true } }),
            this.prisma.offering.aggregate({ where, _sum: { amount: true } }),
            this.prisma.pledgePayment.aggregate({ where: { ...where, pledge: where.branch }, _sum: { amount: true } }),
        ]);
        return {
            totalTithes: tithes._sum.amount || 0,
            totalOfferings: offerings._sum.amount || 0,
            totalPledges: pledges._sum.amount || 0,
            totalRevenue: (tithes._sum.amount || 0) + (offerings._sum.amount || 0) + (pledges._sum.amount || 0),
        };
    }
    async getRecords(query) {
        const { organizationId, branchId, type, from, to } = query;
        const where = { branch: { organizationId } };
        if (branchId)
            where.branchId = branchId;
        if (from || to) {
            where.date = {};
            if (from)
                where.date.gte = new Date(from);
            if (to)
                where.date.lte = new Date(to);
        }
        if (type === 'tithes')
            return this.prisma.tithe.findMany({ where, include: { member: true, branch: true }, orderBy: { date: 'desc' } });
        if (type === 'offerings')
            return this.prisma.offering.findMany({ where, include: { branch: true }, orderBy: { date: 'desc' } });
        if (type === 'pledges')
            return this.prisma.pledgePayment.findMany({
                where: { ...where, pledge: where.branch },
                include: { pledge: { include: { member: true } } },
                orderBy: { date: 'desc' }
            });
        return [];
    }
    async getReport(query) {
        return this.getSummary(query);
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map