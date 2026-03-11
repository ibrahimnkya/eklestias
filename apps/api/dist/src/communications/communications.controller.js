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
exports.CommunicationsController = void 0;
const common_1 = require("@nestjs/common");
const communications_service_1 = require("./communications.service");
const comms_dtos_1 = require("./dto/comms.dtos");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CommunicationsController = class CommunicationsController {
    communicationsService;
    constructor(communicationsService) {
        this.communicationsService = communicationsService;
    }
    sendSms(dto, req) {
        return this.communicationsService.sendSms(dto, req.user.organizationId);
    }
    sendWhatsapp(dto, req) {
        return this.communicationsService.sendWhatsapp(dto, req.user.organizationId);
    }
};
exports.CommunicationsController = CommunicationsController;
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR'),
    (0, common_1.Post)('sms'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comms_dtos_1.SendSmsDto, Object]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "sendSms", null);
__decorate([
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR'),
    (0, common_1.Post)('whatsapp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comms_dtos_1.SendWhatsappDto, Object]),
    __metadata("design:returntype", void 0)
], CommunicationsController.prototype, "sendWhatsapp", null);
exports.CommunicationsController = CommunicationsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('communications'),
    __metadata("design:paramtypes", [communications_service_1.CommunicationsService])
], CommunicationsController);
//# sourceMappingURL=communications.controller.js.map