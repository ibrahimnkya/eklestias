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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats(organizationId) {
        const totalMembers = await this.prisma.member.count({
            where: { organizationId, deletedAt: null },
        });
        const activeMembers = await this.prisma.member.count({
            where: { organizationId, deletedAt: null, status: 'ACTIVE_MEMBER' },
        });
        const currentMonth = new Date();
        currentMonth.setDate(1);
        const tithes = await this.prisma.tithe.aggregate({
            where: { member: { organizationId }, date: { gte: currentMonth } },
            _sum: { amount: true },
        });
        const offerings = await this.prisma.offering.aggregate({
            where: { branch: { organizationId }, date: { gte: currentMonth } },
            _sum: { amount: true },
        });
        return {
            totalMembers,
            activeMembers,
            monthGiving: (tithes._sum.amount || 0) + (offerings._sum.amount || 0),
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map