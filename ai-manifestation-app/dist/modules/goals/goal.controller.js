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
exports.GoalController = void 0;
const common_1 = require("@nestjs/common");
const goal_service_1 = require("./goal.service");
const goal_dto_1 = require("../../dto/goal.dto");
const swagger_1 = require("@nestjs/swagger");
let GoalController = class GoalController {
    constructor(goalService) {
        this.goalService = goalService;
    }
    create(createGoalDto, req) {
        return this.goalService.create(createGoalDto, req.user.userId);
    }
    findAll(req) {
        return this.goalService.findAll(req.user.userId);
    }
    getUpcomingGoals(req) {
        return this.goalService.getUpcomingGoals(req.user.userId);
    }
    getGoalProgress(wishId, req) {
        return this.goalService.getGoalProgress(wishId, req.user.userId);
    }
    findOne(id, req) {
        return this.goalService.findOne(id, req.user.userId);
    }
    update(id, updateGoalDto, req) {
        return this.goalService.update(id, updateGoalDto, req.user.userId);
    }
    remove(id, req) {
        return this.goalService.remove(id, req.user.userId);
    }
    generateSMARTGoals(generateGoalsDto, req) {
        return this.goalService.generateSMARTGoals(generateGoalsDto, req.user.userId);
    }
    reorderGoals(wishId, goalIds, req) {
        return this.goalService.reorderGoals(wishId, goalIds, req.user.userId);
    }
};
exports.GoalController = GoalController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new goal' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_dto_1.CreateGoalDto, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user goals' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Get upcoming goals (next 7 days)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "getUpcomingGoals", null);
__decorate([
    (0, common_1.Get)('wish/:wishId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get goal progress for a specific wish' }),
    __param(0, (0, common_1.Param)('wishId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "getGoalProgress", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get goal by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update goal' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, goal_dto_1.UpdateGoalDto, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete goal' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('generate-smart'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate SMART goals using AI' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_dto_1.GenerateGoalsDto, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "generateSMARTGoals", null);
__decorate([
    (0, common_1.Patch)('wish/:wishId/reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder goals within a wish' }),
    __param(0, (0, common_1.Param)('wishId')),
    __param(1, (0, common_1.Body)('goalIds')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", void 0)
], GoalController.prototype, "reorderGoals", null);
exports.GoalController = GoalController = __decorate([
    (0, swagger_1.ApiTags)('goals'),
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [goal_service_1.GoalService])
], GoalController);
//# sourceMappingURL=goal.controller.js.map