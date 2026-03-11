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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MembersService = class MembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMemberDto, registeredById) {
        return this.prisma.member.create({
            data: {
                ...createMemberDto,
                registeredById,
            },
        });
    }
    findAll(organizationId, branchId, status) {
        const where = { organizationId, deletedAt: null };
        if (branchId)
            where.branchId = branchId;
        if (status)
            where.status = status;
        return this.prisma.member.findMany({
            where,
            include: {
                branch: true,
                department: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.member.findUnique({
            where: { id },
            include: { branch: true, department: true }
        });
    }
    updateStatus(id, updateMemberStatusDto) {
        return this.prisma.member.update({
            where: { id },
            data: { status: updateMemberStatusDto.status },
        });
    }
    remove(id) {
        return this.prisma.member.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map