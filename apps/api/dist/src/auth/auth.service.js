"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const DEFAULT_ROLES = [
    { name: 'SUPER_ADMIN', level: 0 },
    { name: 'FOUNDER', level: 1 },
    { name: 'REGIONAL_LEADER', level: 2 },
    { name: 'BRANCH_PASTOR', level: 3 },
    { name: 'FINANCE_OFFICER', level: 4 },
    { name: 'DEPARTMENT_LEADER', level: 5 },
    { name: 'USHER', level: 6 },
    { name: 'MEMBER', level: 7 },
];
let AuthService = class AuthService {
    usersService;
    jwtService;
    prisma;
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use.');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                let orgType = client_1.OrganizationType.INDEPENDENT_CHURCH;
                if (dto.churchType === 'DIOCESE')
                    orgType = client_1.OrganizationType.DIOCESE;
                else if (dto.churchType === 'MINISTRY')
                    orgType = client_1.OrganizationType.MINISTRY;
                else if (dto.churchType === 'CHURCH_NETWORK')
                    orgType = client_1.OrganizationType.CHURCH_NETWORK;
                const org = await tx.organization.create({
                    data: {
                        name: dto.churchName,
                        type: orgType,
                    }
                });
                const rolesData = DEFAULT_ROLES.map(r => ({ ...r, organizationId: org.id }));
                await tx.role.createMany({ data: rolesData });
                const founderRole = await tx.role.findFirst({
                    where: { organizationId: org.id, name: 'FOUNDER' }
                });
                if (!founderRole)
                    throw new Error("Could not create Founder role.");
                const user = await tx.user.create({
                    data: {
                        organizationId: org.id,
                        roleId: founderRole.id,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        email: dto.email,
                        password: hashedPassword,
                    },
                    include: { role: true }
                });
                return user;
            });
            return this.login(result);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to register. Please try again.');
        }
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role?.name || user.role,
            roleLevel: user.role?.level,
            organizationId: user.organizationId,
            branchId: user.branchId,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: payload.role,
                roleLevel: payload.roleLevel,
                organizationId: user.organizationId,
                branchId: user.branchId,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map