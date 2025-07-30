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
exports.VisionBoard = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const vision_board_item_entity_1 = require("./vision-board-item.entity");
class VisionBoard {
}
exports.VisionBoard = VisionBoard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VisionBoard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisionBoard.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisionBoard.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VisionBoard.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'grid' }),
    __metadata("design:type", String)
], VisionBoard.prototype, "layout", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VisionBoard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], VisionBoard.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.visionBoards),
    __metadata("design:type", user_entity_1.User)
], VisionBoard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vision_board_item_entity_1.VisionBoardItem, item => item.visionBoard),
    __metadata("design:type", Array)
], VisionBoard.prototype, "items", void 0);
//# sourceMappingURL=vision-board.entity.js.map