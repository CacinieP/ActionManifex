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
exports.OptimizeWishDto = exports.UpdateWishDto = exports.CreateWishDto = void 0;
const class_validator_1 = require("class-validator");
class CreateWishDto {
}
exports.CreateWishDto = CreateWishDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['健康', '事业', '财富', '家庭', '学习', '旅行', '爱情', '其他']),
    __metadata("design:type", String)
], CreateWishDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateWishDto.prototype, "keywords", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['low', 'medium', 'high']),
    __metadata("design:type", String)
], CreateWishDto.prototype, "priority", void 0);
class UpdateWishDto {
}
exports.UpdateWishDto = UpdateWishDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWishDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWishDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['健康', '事业', '财富', '家庭', '学习', '旅行', '爱情', '其他']),
    __metadata("design:type", String)
], UpdateWishDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateWishDto.prototype, "keywords", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'completed', 'paused']),
    __metadata("design:type", String)
], UpdateWishDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['low', 'medium', 'high']),
    __metadata("design:type", String)
], UpdateWishDto.prototype, "priority", void 0);
class OptimizeWishDto {
}
exports.OptimizeWishDto = OptimizeWishDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptimizeWishDto.prototype, "wishId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptimizeWishDto.prototype, "focus", void 0);
//# sourceMappingURL=wish.dto.js.map