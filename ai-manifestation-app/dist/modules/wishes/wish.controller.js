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
exports.WishController = void 0;
const common_1 = require("@nestjs/common");
const wish_service_1 = require("./wish.service");
const wish_dto_1 = require("../../dto/wish.dto");
const swagger_1 = require("@nestjs/swagger");
let WishController = class WishController {
    constructor(wishService) {
        this.wishService = wishService;
    }
    create(createWishDto, req) {
        return this.wishService.create(createWishDto, req.user.userId);
    }
    findAll(req) {
        return this.wishService.findAll(req.user.userId);
    }
    getWishStats(req) {
        return this.wishService.getWishStats(req.user.userId);
    }
    findOne(id, req) {
        return this.wishService.findOne(id, req.user.userId);
    }
    update(id, updateWishDto, req) {
        return this.wishService.update(id, updateWishDto, req.user.userId);
    }
    remove(id, req) {
        return this.wishService.remove(id, req.user.userId);
    }
    optimizeWish(id, optimizeDto, req) {
        return this.wishService.optimizeWish({ ...optimizeDto, wishId: id }, req.user.userId);
    }
    generateImage(id, req) {
        return this.wishService.generateImageForWish(id, req.user.userId);
    }
};
exports.WishController = WishController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new wish' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Wish successfully created' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wish_dto_1.CreateWishDto, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user wishes' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get wish statistics' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "getWishStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get wish by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wish found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Wish not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update wish' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, wish_dto_1.UpdateWishDto, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete wish' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/optimize'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimize wish using AI' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, wish_dto_1.OptimizeWishDto, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "optimizeWish", null);
__decorate([
    (0, common_1.Post)(':id/generate-image'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate image for wish using AI' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WishController.prototype, "generateImage", null);
exports.WishController = WishController = __decorate([
    (0, swagger_1.ApiTags)('wishes'),
    (0, common_1.Controller)('wishes'),
    __metadata("design:paramtypes", [wish_service_1.WishService])
], WishController);
//# sourceMappingURL=wish.controller.js.map