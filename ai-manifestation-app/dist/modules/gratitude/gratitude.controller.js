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
exports.GratitudeController = void 0;
const common_1 = require("@nestjs/common");
const gratitude_service_1 = require("./gratitude.service");
const gratitude_dto_1 = require("../../dto/gratitude.dto");
const swagger_1 = require("@nestjs/swagger");
let GratitudeController = class GratitudeController {
    constructor(gratitudeService) {
        this.gratitudeService = gratitudeService;
    }
    create(createGratitudeDto, req) {
        return this.gratitudeService.create(createGratitudeDto, req.user.userId);
    }
    findAll(req, limit) {
        return this.gratitudeService.findAll(req.user.userId, limit ? parseInt(limit) : undefined);
    }
    getGratitudeStats(req) {
        return this.gratitudeService.getGratitudeStats(req.user.userId);
    }
    getGratitudeCalendar(req, year, month) {
        return this.gratitudeService.getGratitudeCalendar(req.user.userId, year ? parseInt(year) : undefined, month ? parseInt(month) : undefined);
    }
    getDailyGratitudePrompt(req) {
        return this.gratitudeService.getDailyGratitudePrompt(req.user.userId);
    }
    searchGratitudes(query, req) {
        return this.gratitudeService.searchGratitudes(req.user.userId, query);
    }
    findOne(id, req) {
        return this.gratitudeService.findOne(id, req.user.userId);
    }
    update(id, updateGratitudeDto, req) {
        return this.gratitudeService.update(id, updateGratitudeDto, req.user.userId);
    }
    remove(id, req) {
        return this.gratitudeService.remove(id, req.user.userId);
    }
};
exports.GratitudeController = GratitudeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new gratitude entry' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gratitude_dto_1.CreateGratitudeDto, Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all gratitude entries' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get gratitude statistics' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "getGratitudeStats", null);
__decorate([
    (0, common_1.Get)('calendar'),
    (0, swagger_1.ApiOperation)({ summary: 'Get gratitude calendar data' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "getGratitudeCalendar", null);
__decorate([
    (0, common_1.Get)('daily-prompt'),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily gratitude prompt' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "getDailyGratitudePrompt", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search gratitude entries' }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "searchGratitudes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get gratitude entry by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update gratitude entry' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gratitude_dto_1.UpdateGratitudeDto, Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete gratitude entry' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GratitudeController.prototype, "remove", null);
exports.GratitudeController = GratitudeController = __decorate([
    (0, swagger_1.ApiTags)('gratitude'),
    (0, common_1.Controller)('gratitude'),
    __metadata("design:paramtypes", [gratitude_service_1.GratitudeService])
], GratitudeController);
//# sourceMappingURL=gratitude.controller.js.map