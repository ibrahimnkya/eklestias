"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProjectExpenseDto = exports.AddProjectContributionDto = exports.CreateProjectDto = void 0;
class CreateProjectDto {
    organizationId;
    branchId;
    name;
    description;
    budget;
}
exports.CreateProjectDto = CreateProjectDto;
class AddProjectContributionDto {
    memberId;
    amount;
    paymentMethod;
    reference;
}
exports.AddProjectContributionDto = AddProjectContributionDto;
class AddProjectExpenseDto {
    amount;
    description;
}
exports.AddProjectExpenseDto = AddProjectExpenseDto;
//# sourceMappingURL=project.dtos.js.map