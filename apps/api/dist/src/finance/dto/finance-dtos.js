"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePledgePaymentDto = exports.CreatePledgeDto = exports.CreateOfferingDto = exports.CreateTitheDto = void 0;
class CreateTitheDto {
    branchId;
    memberId;
    amount;
    paymentMethod;
    reference;
}
exports.CreateTitheDto = CreateTitheDto;
class CreateOfferingDto {
    branchId;
    amount;
    type;
}
exports.CreateOfferingDto = CreateOfferingDto;
class CreatePledgeDto {
    branchId;
    memberId;
    campaignName;
    targetAmount;
    dueDate;
}
exports.CreatePledgeDto = CreatePledgeDto;
class CreatePledgePaymentDto {
    amount;
    paymentMethod;
    reference;
}
exports.CreatePledgePaymentDto = CreatePledgePaymentDto;
//# sourceMappingURL=finance-dtos.js.map