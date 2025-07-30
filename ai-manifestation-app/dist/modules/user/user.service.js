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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            include: {
                wishes: true,
                goals: true,
                gratitudes: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                wishes: {
                    include: {
                        goals: true,
                        visionBoardItems: true,
                    },
                },
                goals: {
                    include: {
                        checkIns: true,
                    },
                },
                gratitudes: true,
                checkIns: true,
                rewards: true,
                growthPoints: true,
                visionBoards: {
                    include: {
                        items: true,
                    },
                },
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async getUserStats(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                wishes: true,
                goals: true,
                gratitudes: true,
                checkIns: true,
                rewards: true,
                growthPoints: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const totalPoints = user.growthPoints.reduce((sum, point) => sum + point.points, 0);
        const activeGoals = user.goals.filter(goal => goal.status === 'in_progress').length;
        const completedGoals = user.goals.filter(goal => goal.status === 'completed').length;
        const totalGratitudeDays = user.gratitudes.length;
        return {
            totalPoints,
            activeGoals,
            completedGoals,
            totalGratitudeDays,
            wishCount: user.wishes.length,
            recentActivity: {
                lastWish: user.wishes[0]?.createdAt,
                lastCheckIn: user.checkIns[0]?.createdAt,
                lastGratitude: user.gratitudes[0]?.createdAt,
            },
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map