// AI Manifestation App - Main JavaScript
class ActionManifexApp {
    constructor() {
        this.currentUser = null;
        this.wishes = [];
        this.milestones = [];
        this.gratitudeEntries = [];
        this.achievements = [];
        this.currentTab = 'wishes';
        this.init();
    }

    init() {
        this.loadUserData();
        this.bindEvents();
        this.renderCurrentTab();
        this.updateUserStats();
    }

    // 加载用户数据
    loadUserData() {
        // 模拟用户数据
        this.currentUser = {
            id: 1,
            name: '用户',
            email: 'user@example.com',
            level: 1,
            experience: 0,
            energyPoints: 100,
            stats: {
                totalWishes: 0,
                completedMilestones: 0,
                gratitudeDays: 0,
                gratitudeStreak: 0
            }
        };

        // 从localStorage加载数据
        this.loadFromStorage();
    }

    // 从localStorage加载数据
    loadFromStorage() {
        const savedWishes = localStorage.getItem('wishes');
        const savedMilestones = localStorage.getItem('milestones');
        const savedGratitude = localStorage.getItem('gratitudeEntries');
        const savedAchievements = localStorage.getItem('achievements');

        if (savedWishes) this.wishes = JSON.parse(savedWishes);
        if (savedMilestones) this.milestones = JSON.parse(savedMilestones);
        if (savedGratitude) this.gratitudeEntries = JSON.parse(savedGratitude);
        if (savedAchievements) this.achievements = JSON.parse(savedAchievements);
    }

    // 保存数据到localStorage
    saveToStorage() {
        localStorage.setItem('wishes', JSON.stringify(this.wishes));
        localStorage.setItem('milestones', JSON.stringify(this.milestones));
        localStorage.setItem('gratitudeEntries', JSON.stringify(this.gratitudeEntries));
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    // 绑定事件
    bindEvents() {
        // 导航标签切换
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // 愿望描述输入监听，用于AI优化
        const wishDescription = document.getElementById('wishDescription');
        if (wishDescription) {
            wishDescription.addEventListener('input', (e) => {
                this.debounce(this.optimizeWishDescription.bind(this), 1000)(e.target.value);
            });
        }

        // 感恩输入方法切换
        document.querySelectorAll('.input-method-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.input-method-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }

    // 切换标签页
    switchTab(tabName) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        this.renderCurrentTab();
    }

    // 渲染当前标签页
    renderCurrentTab() {
        switch (this.currentTab) {
            case 'wishes':
                this.renderWishes();
                break;
            case 'milestones':
                this.renderMilestones();
                break;
            case 'gratitude':
                this.renderGratitude();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    }

    // 渲染愿望列表
    renderWishes() {
        const container = document.getElementById('wishesGrid');
        if (!container) return;

        if (this.wishes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>还没有愿望</h3>
                    <p>点击"新建愿望"开始你的显化之旅</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.wishes.map(wish => this.createWishCard(wish)).join('');
    }

    // 创建愿望卡片
    createWishCard(wish) {
        const progress = this.calculateWishProgress(wish.id);
        const categoryNames = {
            health: '健康',
            career: '事业',
            wealth: '财富',
            relationship: '关系',
            growth: '成长',
            other: '其他'
        };

        return `
            <div class="wish-card" onclick="app.showWishDetail(${wish.id})">
                <div class="wish-card-header">
                    <div>
                        <h3>${wish.title}</h3>
                        <span class="wish-category">${categoryNames[wish.category]}</span>
                    </div>
                    <div class="wish-priority">
                        ${Array(wish.priority).fill('<i class="fas fa-star priority-star"></i>').join('')}
                    </div>
                </div>
                <p class="wish-description">${wish.description}</p>
                <div class="wish-meta">
                    <span class="wish-status status-${wish.status}">${wish.status === 'active' ? '进行中' : '已完成'}</span>
                </div>
                <div class="wish-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <small>${progress}% 完成</small>
                </div>
                <div class="wish-actions">
                    <button class="btn btn-small" onclick="event.stopPropagation(); app.editWish(${wish.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small" onclick="event.stopPropagation(); app.deleteWish(${wish.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // 计算愿望进度
    calculateWishProgress(wishId) {
        const wishMilestones = this.milestones.filter(m => m.wishId === wishId);
        if (wishMilestones.length === 0) return 0;
        
        const completedMilestones = wishMilestones.filter(m => m.completedDate).length;
        return Math.round((completedMilestones / wishMilestones.length) * 100);
    }

    // 显示创建愿望模态框
    showCreateWishModal() {
        document.getElementById('createWishModal').style.display = 'block';
    }

    // 创建愿望
    createWish() {
        const title = document.getElementById('wishTitle').value;
        const description = document.getElementById('wishDescription').value;
        const category = document.getElementById('wishCategory').value;
        const tags = document.getElementById('wishTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        const priority = parseInt(document.getElementById('wishPriority').value);
        const targetDate = document.getElementById('wishTargetDate').value;

        if (!title || !description) {
            alert('请填写愿望标题和描述');
            return;
        }

        const wish = {
            id: Date.now(),
            userId: this.currentUser.id,
            title,
            description,
            optimizedDescription: description, // AI优化后的描述
            category,
            tags,
            priority,
            targetDate,
            status: 'active',
            visionBoard: [],
            aiOptimizations: {
                emotionalWords: [],
                scenarios: [],
                affirmations: []
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.wishes.push(wish);
        this.saveToStorage();
        this.updateUserStats();
        this.renderWishes();
        this.closeModal('createWishModal');
        
        // 清空表单
        document.getElementById('wishTitle').value = '';
        document.getElementById('wishDescription').value = '';
        document.getElementById('wishTags').value = '';
        document.getElementById('wishTargetDate').value = '';
    }

    // AI优化愿望描述
    async optimizeWishDescription(description) {
        if (!description || description.length < 10) return;

        const aiResults = document.getElementById('aiOptimizationResults');
        if (aiResults) {
            aiResults.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> AI正在优化您的愿望...</div>';
        }

        // 模拟AI优化过程
        setTimeout(() => {
            const optimizations = this.generateAIOptimizations(description);
            
            if (aiResults) {
                aiResults.innerHTML = `
                    <div class="optimization-result">
                        <h5>优化后的描述：</h5>
                        <p>${optimizations.optimizedDescription}</p>
                        <h5>推荐的情感词：</h5>
                        <div class="tags">
                            ${optimizations.emotionalWords.map(word => `<span class="tag">${word}</span>`).join('')}
                        </div>
                        <h5>肯定语句：</h5>
                        <p>${optimizations.affirmation}</p>
                    </div>
                `;
            }
        }, 1000);
    }

    // 生成AI优化建议
    generateAIOptimizations(description) {
        const emotionalWords = ['喜悦', '感恩', '丰盛', '爱', '和平', '成功', '健康', '自由'];
        const affirmations = [
            '我已经拥有我所渴望的一切',
            '宇宙正在为我带来最好的结果',
            '我值得拥有所有的美好',
            '我的愿望正在以完美的方式实现'
        ];

        return {
            optimizedDescription: description.replace(/想要/g, '已经拥有').replace(/希望/g, '正在体验'),
            emotionalWords: emotionalWords.slice(0, 3),
            affirmation: affirmations[Math.floor(Math.random() * affirmations.length)]
        };
    }

    // 生成里程碑
    generateMilestones() {
        // 这个功能将在里程碑系统中实现
        console.log('生成里程碑功能');
    }

    // 渲染里程碑
    renderMilestones() {
        const container = document.getElementById('milestonesContainer');
        if (!container) return;

        const activeMilestones = this.milestones.filter(m => !m.completedDate);
        const completedMilestones = this.milestones.filter(m => m.completedDate);

        if (this.milestones.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-flag"></i>
                    <h3>还没有里程碑</h3>
                    <p>创建愿望后，AI会自动为你生成里程碑</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="milestones-section">
                <h3>进行中的里程碑</h3>
                ${activeMilestones.map(milestone => this.createMilestoneItem(milestone)).join('')}
            </div>
            <div class="milestones-section">
                <h3>已完成的里程碑</h3>
                ${completedMilestones.map(milestone => this.createMilestoneItem(milestone)).join('')}
            </div>
        `;
    }

    // 创建里程碑项目
    createMilestoneItem(milestone) {
        const wish = this.wishes.find(w => w.id === milestone.wishId);
        const statusClass = milestone.completedDate ? 'completed' : 'active';
        const statusText = milestone.completedDate ? '已完成' : '进行中';

        return `
            <div class="milestone-item">
                <div class="milestone-header">
                    <div class="milestone-title">${milestone.title}</div>
                    <span class="milestone-status status-${statusClass}">${statusText}</span>
                </div>
                <p class="milestone-description">${milestone.description}</p>
                <div class="milestone-meta">
                    <small>所属愿望: ${wish ? wish.title : '未知'}</small>
                    ${milestone.targetDate ? `<small>目标日期: ${new Date(milestone.targetDate).toLocaleDateString()}</small>` : ''}
                </div>
                <div class="milestone-actions">
                    ${!milestone.completedDate ? `
                        <button class="btn btn-small" onclick="app.completeMilestone(${milestone.id})">
                            <i class="fas fa-check"></i> 完成
                        </button>
                    ` : ''}
                    <button class="btn btn-small" onclick="app.checkInMilestone(${milestone.id})">
                        <i class="fas fa-calendar-check"></i> 打卡
                    </button>
                </div>
            </div>
        `;
    }

    // 完成里程碑
    completeMilestone(milestoneId) {
        const milestone = this.milestones.find(m => m.id === milestoneId);
        if (milestone) {
            milestone.completedDate = new Date().toISOString();
            this.saveToStorage();
            this.updateUserStats();
            this.renderMilestones();
            this.awardEnergyPoints(50);
            this.showAchievement('milestone_completed');
        }
    }

    // 里程碑打卡
    checkInMilestone(milestoneId) {
        const checkInContent = prompt('请输入今日进展：');
        if (checkInContent) {
            const milestone = this.milestones.find(m => m.id === milestoneId);
            if (milestone) {
                if (!milestone.checkIns) milestone.checkIns = [];
                
                milestone.checkIns.push({
                    date: new Date().toISOString(),
                    type: 'text',
                    content: checkInContent,
                    mood: 'positive'
                });
                
                this.saveToStorage();
                this.awardEnergyPoints(10);
                alert('打卡成功！获得10能量积分');
            }
        }
    }

    // 渲染感恩日记
    renderGratitude() {
        this.updateGratitudeStats();
        this.renderGratitudeTree();
    }

    // 更新感恩统计
    updateGratitudeStats() {
        const today = new Date().toDateString();
        const todayEntry = this.gratitudeEntries.find(entry => 
            new Date(entry.date).toDateString() === today
        );

        const streak = this.calculateGratitudeStreak();
        
        document.getElementById('gratitudeStreak').textContent = streak;
        document.getElementById('gratitudeTotal').textContent = this.gratitudeEntries.length;
    }

    // 计算感恩连续天数
    calculateGratitudeStreak() {
        if (this.gratitudeEntries.length === 0) return 0;
        
        const sortedEntries = this.gratitudeEntries
            .map(entry => new Date(entry.date).toDateString())
            .sort((a, b) => new Date(b) - new Date(a));
        
        let streak = 0;
        const today = new Date().toDateString();
        
        for (let i = 0; i < sortedEntries.length; i++) {
            const entryDate = new Date(sortedEntries[i]);
            const expectedDate = new Date(today);
            expectedDate.setDate(expectedDate.getDate() - i);
            
            if (entryDate.toDateString() === expectedDate.toDateString()) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    // 渲染感恩成长树
    renderGratitudeTree() {
        const container = document.getElementById('gratitudeTree');
        if (!container) return;

        const totalDays = this.gratitudeEntries.length;
        const streak = this.calculateGratitudeStreak();
        
        container.innerHTML = `
            <div class="tree-visualization">
                <div class="tree">
                    <div class="tree-trunk"></div>
                    <div class="tree-leaves">
                        ${Array(Math.min(totalDays, 20)).fill('<i class="fas fa-leaf"></i>').join('')}
                    </div>
                </div>
                <div class="tree-stats">
                    <p>已记录 ${totalDays} 天感恩</p>
                    <p>连续 ${streak} 天</p>
                </div>
            </div>
        `;
    }

    // 保存感恩记录
    saveGratitudeEntry() {
        const content = document.getElementById('gratitudeText').value;
        const tags = document.getElementById('gratitudeTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (!content.trim()) {
            alert('请输入感恩内容');
            return;
        }

        const today = new Date().toDateString();
        const existingEntry = this.gratitudeEntries.find(entry => 
            new Date(entry.date).toDateString() === today
        );

        const entry = {
            type: 'text',
            content: content.trim(),
            tags,
            mood: 'grateful'
        };

        if (existingEntry) {
            existingEntry.entries.push(entry);
        } else {
            this.gratitudeEntries.push({
                date: new Date().toISOString(),
                entries: [entry],
                aiResponse: this.generateAIResponse(content)
            });
        }

        this.saveToStorage();
        this.updateUserStats();
        this.renderGratitude();
        this.awardEnergyPoints(20);
        
        // 清空表单
        document.getElementById('gratitudeText').value = '';
        document.getElementById('gratitudeTags').value = '';
        
        alert('感恩记录保存成功！获得20能量积分');
    }

    // 生成AI回复
    generateAIResponse(content) {
        const responses = [
            {
                affirmation: '感恩是吸引更多美好的磁石',
                encouragement: '你的感恩之心正在创造奇迹',
                insight: '每一次感恩都是对宇宙的丰盛回应'
            },
            {
                affirmation: '感恩让你与丰盛频率同频',
                encouragement: '继续保持这份美好的感恩之心',
                insight: '感恩是通往幸福的桥梁'
            }
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // 渲染个人资料
    renderProfile() {
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userLevel').textContent = `等级 ${this.currentUser.level}`;
        document.getElementById('totalWishes').textContent = this.currentUser.stats.totalWishes;
        document.getElementById('completedMilestones').textContent = this.currentUser.stats.completedMilestones;
        document.getElementById('gratitudeDays').textContent = this.currentUser.stats.gratitudeDays;
        document.getElementById('totalEnergy').textContent = this.currentUser.energyPoints;
        document.getElementById('energyCount').textContent = this.currentUser.energyPoints;

        // 更新经验值进度条
        const experienceProgress = (this.currentUser.experience % 100);
        document.querySelector('.progress-fill').style.width = `${experienceProgress}%`;
        document.querySelector('.progress-text').textContent = `${experienceProgress}/100 经验值`;

        this.renderAchievements();
    }

    // 渲染成就徽章
    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        const allAchievements = [
            { id: 'first_wish', title: '第一个愿望', icon: 'fas fa-heart', description: '创建第一个愿望' },
            { id: 'first_milestone', title: '里程碑', icon: 'fas fa-flag', description: '完成第一个里程碑' },
            { id: 'gratitude_week', title: '感恩一周', icon: 'fas fa-calendar-week', description: '连续7天感恩' },
            { id: 'energy_master', title: '能量大师', icon: 'fas fa-bolt', description: '累积1000能量积分' }
        ];

        const userAchievements = allAchievements.map(achievement => {
            const unlocked = this.achievements.some(a => a.id === achievement.id);
            return { ...achievement, unlocked };
        });

        container.innerHTML = userAchievements.map(achievement => `
            <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <i class="${achievement.icon}" style="color: ${achievement.unlocked ? '#ffd700' : '#ccc'}"></i>
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        `).join('');
    }

    // 更新用户统计
    updateUserStats() {
        this.currentUser.stats.totalWishes = this.wishes.length;
        this.currentUser.stats.completedMilestones = this.milestones.filter(m => m.completedDate).length;
        this.currentUser.stats.gratitudeDays = this.gratitudeEntries.length;
        this.currentUser.stats.gratitudeStreak = this.calculateGratitudeStreak();
        
        // 更新等级
        const newLevel = Math.floor(this.currentUser.experience / 100) + 1;
        if (newLevel > this.currentUser.level) {
            this.currentUser.level = newLevel;
            this.showAchievement('level_up');
        }
    }

    // 奖励能量积分
    awardEnergyPoints(points) {
        this.currentUser.energyPoints += points;
        this.currentUser.experience += points;
        this.updateUserStats();
        this.renderProfile();
    }

    // 显示成就
    showAchievement(type) {
        const messages = {
            milestone_completed: '🎉 完成里程碑！获得50能量积分',
            level_up: '⭐ 等级提升！你变得更强大了！',
            first_wish: '🌟 创建第一个愿望！开始显化之旅！',
            gratitude_streak: '🌱 感恩连续记录！你的成长树在茁壮成长！'
        };

        const message = messages[type] || '🎊 获得成就！';
        
        // 创建成就通知
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <i class="fas fa-trophy"></i>
                <div>
                    <h4>成就解锁！</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // 关闭模态框
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // 显示愿望详情
    showWishDetail(wishId) {
        const wish = this.wishes.find(w => w.id === wishId);
        if (!wish) return;

        document.getElementById('detailWishTitle').textContent = wish.title;
        document.getElementById('detailWishDescription').textContent = wish.description;
        document.getElementById('detailWishCategory').textContent = wish.category;
        document.getElementById('detailWishPriority').textContent = `${'⭐'.repeat(wish.priority)}`;
        document.getElementById('detailWishStatus').textContent = wish.status;

        // 渲染相关的里程碑
        const wishMilestones = this.milestones.filter(m => m.wishId === wishId);
        const milestonesContainer = document.getElementById('wishMilestones');
        if (milestonesContainer) {
            milestonesContainer.innerHTML = wishMilestones.map(m => this.createMilestoneItem(m)).join('');
        }

        document.getElementById('wishDetailModal').style.display = 'block';
    }

    // 删除愿望
    deleteWish(wishId) {
        if (confirm('确定要删除这个愿望吗？相关的里程碑也会被删除。')) {
            this.wishes = this.wishes.filter(w => w.id !== wishId);
            this.milestones = this.milestones.filter(m => m.wishId !== wishId);
            this.saveToStorage();
            this.updateUserStats();
            this.renderWishes();
        }
    }

    // 编辑愿望
    editWish(wishId) {
        const wish = this.wishes.find(w => w.id === wishId);
        if (!wish) return;

        document.getElementById('wishTitle').value = wish.title;
        document.getElementById('wishDescription').value = wish.description;
        document.getElementById('wishCategory').value = wish.category;
        document.getElementById('wishTags').value = wish.tags.join(', ');
        document.getElementById('wishPriority').value = wish.priority;
        document.getElementById('wishTargetDate').value = wish.targetDate;

        this.showCreateWishModal();
        
        // 修改创建按钮为更新按钮
        const createBtn = document.querySelector('#createWishModal .btn-primary');
        createBtn.textContent = '更新愿望';
        createBtn.onclick = () => this.updateWish(wishId);
    }

    // 更新愿望
    updateWish(wishId) {
        const wish = this.wishes.find(w => w.id === wishId);
        if (!wish) return;

        wish.title = document.getElementById('wishTitle').value;
        wish.description = document.getElementById('wishDescription').value;
        wish.category = document.getElementById('wishCategory').value;
        wish.tags = document.getElementById('wishTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        wish.priority = parseInt(document.getElementById('wishPriority').value);
        wish.targetDate = document.getElementById('wishTargetDate').value;
        wish.updatedAt = new Date().toISOString();

        this.saveToStorage();
        this.renderWishes();
        this.closeModal('createWishModal');
        
        // 恢复创建按钮
        const createBtn = document.querySelector('#createWishModal .btn-primary');
        createBtn.textContent = '创建愿望';
        createBtn.onclick = () => this.createWish();
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 初始化应用
const app = new ActionManifexApp();

// 全局函数
function showCreateWishModal() {
    app.showCreateWishModal();
}

function createWish() {
    app.createWish();
}

function saveGratitudeEntry() {
    app.saveGratitudeEntry();
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

function completeMilestone(milestoneId) {
    app.completeMilestone(milestoneId);
}

function checkInMilestone(milestoneId) {
    app.checkInMilestone(milestoneId);
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// 添加成就通知样式
const style = document.createElement('style');
style.textContent = `
    .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    }

    .achievement-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .achievement-content i {
        font-size: 1.5rem;
    }

    .achievement-content h4 {
        margin: 0;
        font-size: 1rem;
    }

    .achievement-content p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }

    .empty-state i {
        font-size: 4rem;
        color: #ddd;
        margin-bottom: 20px;
    }

    .empty-state h3 {
        margin-bottom: 10px;
        color: #333;
    }

    .optimization-result {
        line-height: 1.6;
    }

    .optimization-result h5 {
        color: #667eea;
        margin: 10px 0 5px 0;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0;
    }

    .tag {
        background: #e8f5e8;
        color: #4CAF50;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
    }

    .loading {
        text-align: center;
        padding: 20px;
        color: #667eea;
    }

    .tree {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }

    .tree-trunk {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 80px;
        background: #8B4513;
        border-radius: 0 0 5px 5px;
    }

    .tree-leaves {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 120px;
        background: #228B22;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        padding: 20px;
    }

    .tree-leaves i {
        color: #90EE90;
        font-size: 1.2rem;
    }

    .tree-stats {
        text-align: center;
        margin-top: 20px;
    }

    .tree-stats p {
        margin: 5px 0;
        color: #4CAF50;
        font-weight: 500;
    }

    .achievement-badge.locked {
        opacity: 0.5;
    }

    .achievement-badge.unlocked {
        border: 2px solid #ffd700;
    }
`;
document.head.appendChild(style);