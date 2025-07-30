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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const wish_entity_1 = require("./wish.entity");
const goal_entity_1 = require("./goal.entity");
const gratitude_entity_1 = require("./gratitude.entity");
const check_in_entity_1 = require("./check-in.entity");
const reward_entity_1 = require("./reward.entity");
const growth_point_entity_1 = require("./growth-point.entity");
const vision_board_entity_1 = require("./vision-board.entity");
class User {
}
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wish_entity_1.Wish, wish => wish.user),
    __metadata("design:type", Array)
], User.prototype, "wishes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goal_entity_1.Goal, goal => goal.user),
    __metadata("design:type", Array)
], User.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => gratitude_entity_1.Gratitude, gratitude => gratitude.user),
    __metadata("design:type", Array)
], User.prototype, "gratitudes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => check_in_entity_1.CheckIn, checkIn => checkIn.user),
    __metadata("design:type", Array)
], User.prototype, "checkIns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reward_entity_1.Reward, reward => reward.user),
    __metadata("design:type", Array)
], User.prototype, "rewards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => growth_point_entity_1.GrowthPoint, growthPoint => growthPoint.user),
    __metadata("design:type", Array)
], User.prototype, "growthPoints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vision_board_entity_1.VisionBoard, visionBoard => visionBoard.user),
    __metadata("design:type", Array)
], User.prototype, "visionBoards", void 0);
//# sourceMappingURL=user.entity.js.map