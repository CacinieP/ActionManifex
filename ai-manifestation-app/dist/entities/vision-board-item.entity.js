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
exports.VisionBoardItem = void 0;
const typeorm_1 = require("typeorm");
const vision_board_entity_1 = require("./vision-board.entity");
const wish_entity_1 = require("./wish.entity");
class VisionBoardItem {
}
exports.VisionBoardItem = VisionBoardItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VisionBoardItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisionBoardItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisionBoardItem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VisionBoardItem.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisionBoardItem.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VisionBoardItem.prototype, "positionX", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VisionBoardItem.prototype, "positionY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 200 }),
    __metadata("design:type", Number)
], VisionBoardItem.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 200 }),
    __metadata("design:type", Number)
], VisionBoardItem.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], VisionBoardItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VisionBoardItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vision_board_entity_1.VisionBoard, board => board.items),
    __metadata("design:type", vision_board_entity_1.VisionBoard)
], VisionBoardItem.prototype, "visionBoard", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wish_entity_1.Wish, wish => wish.visionBoardItems, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", wish_entity_1.Wish)
], VisionBoardItem.prototype, "wish", void 0);
//# sourceMappingURL=vision-board-item.entity.js.map