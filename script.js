class SideHustleRecommender {
    constructor() {
        this.userProfile = {
            tag: '',
            school: '',
            gender: '',
            major: '',
            mainJob: '',
            timeAvailable: '',
            interests: '',
            goal: ''
        };
        
        this.currentStep = 0;
        this.responseHistory = [];  // 记录AI回复历史，避免重复
        
        // 预设的信息收集问题（用于收集用户信息）
        this.questions = [
            { question: "你是哪个学校的？比如「清华大学」「北京理工大学」，已经毕业的话说毕业院校 🎓", key: 'school' },
            { question: "性别是？直接说「男」或「女」就行~ 😊", key: 'gender' },
            { question: "什么专业的？比如「计算机科学与技术」「市场营销」「机械工程」 📚", key: 'major' },
            { question: "现在主要身份是什么？比如「大学生」「上班族」「研究生」 💼", key: 'mainJob' },
            { question: "每天大概有多少时间可以用来搞副业？比如「1-2小时」「周末有空」 ⏰", key: 'timeAvailable' },
            { question: "有什么兴趣爱好或技能？比如「写作」「摄影」「编程」「运动」 🎨", key: 'interests' },
            { question: "做副业主要想达成什么目标？比如「赚零花钱」「个人发展」「兴趣变现」 🎯", key: 'goal' }
        ];
        
        // 信息丰富化映射表
        this.schoolMapping = {
            '复旦': { fullName: '复旦大学', description: '中国顶尖综合性研究型大学，985/211工程重点建设高校' },
            '清华': { fullName: '清华大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '北大': { fullName: '北京大学', description: '中国顶尖综合性大学，985/211工程重点建设高校' },
            '交大': { fullName: '上海交通大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '浙大': { fullName: '浙江大学', description: '中国顶尖综合性研究型大学，985/211工程重点建设高校' },
            '南大': { fullName: '南京大学', description: '中国顶尖综合性大学，985/211工程重点建设高校' },
            '中大': { fullName: '中山大学', description: '华南地区顶尖综合性大学，985/211工程重点建设高校' },
            '华科': { fullName: '华中科技大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '西交': { fullName: '西安交通大学', description: '西北地区顶尖理工科大学，985/211工程重点建设高校' },
            '哈工大': { fullName: '哈尔滨工业大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '同济': { fullName: '同济大学', description: '中国著名理工科大学，以建筑、土木工程闻名，985/211工程重点建设高校' },
            '人大': { fullName: '中国人民大学', description: '中国顶尖人文社科类大学，985/211工程重点建设高校' },
            '北师大': { fullName: '北京师范大学', description: '中国顶尖师范类大学，985/211工程重点建设高校' },
            '中科大': { fullName: '中国科学技术大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '厦大': { fullName: '厦门大学', description: '中国著名综合性大学，985/211工程重点建设高校' },
            '武大': { fullName: '武汉大学', description: '中国著名综合性大学，985/211工程重点建设高校' },
            '华中': { fullName: '华中科技大学', description: '中国顶尖理工科大学，985/211工程重点建设高校' },
            '东南': { fullName: '东南大学', description: '中国著名理工科大学，985/211工程重点建设高校' },
            '天大': { fullName: '天津大学', description: '中国著名理工科大学，985/211工程重点建设高校' },
            '北航': { fullName: '北京航空航天大学', description: '中国顶尖航空航天类大学，985/211工程重点建设高校' },
            '北理工': { fullName: '北京理工大学', description: '中国著名理工科大学，985/211工程重点建设高校' }
        };
        
        this.majorMapping = {
            '计算机': '计算机科学与技术专业',
            '软件': '软件工程专业',
            '电子': '电子信息工程专业',
            '通信': '通信工程专业',
            '自动化': '自动化专业',
            '机械': '机械工程专业',
            '土木': '土木工程专业',
            '建筑': '建筑学专业',
            '化学': '化学工程与工艺专业',
            '材料': '材料科学与工程专业',
            '生物': '生物技术专业',
            '医学': '临床医学专业',
            '护理': '护理学专业',
            '药学': '药学专业',
            '经济': '经济学专业',
            '金融': '金融学专业',
            '会计': '会计学专业',
            '管理': '工商管理专业',
            '市场营销': '市场营销专业',
            '人力资源': '人力资源管理专业',
            '法学': '法学专业',
            '新闻': '新闻学专业',
            '广告': '广告学专业',
            '英语': '英语专业',
            '中文': '汉语言文学专业',
            '历史': '历史学专业',
            '哲学': '哲学专业',
            '心理': '心理学专业',
            '教育': '教育学专业',
            '体育': '体育教育专业',
            '艺术': '艺术设计专业',
            '音乐': '音乐学专业',
            '美术': '美术学专业',
            '旅游': '旅游管理专业',
            '酒店': '酒店管理专业',
            '物流': '物流管理专业',
            '电商': '电子商务专业',
            '数学': '数学与应用数学专业',
            '物理': '物理学专业',
            '化学': '化学专业',
            '地理': '地理科学专业',
            '环境': '环境科学专业'
        };
        
        this.init();
    }

    // 信息丰富化方法
    enrichUserInput(answer, questionKey) {
        let enrichedAnswer = answer;
        let additionalInfo = '';
        
        switch (questionKey) {
            case 'school':
                // 学校信息丰富化
                for (const [shortName, schoolInfo] of Object.entries(this.schoolMapping)) {
                    if (answer.includes(shortName) && !answer.includes(schoolInfo.fullName)) {
                        enrichedAnswer = answer.replace(shortName, schoolInfo.fullName);
                        additionalInfo = `（${schoolInfo.description}）`;
                        break;
                    }
                }
                break;
                
            case 'major':
                // 专业信息丰富化
                for (const [shortName, fullName] of Object.entries(this.majorMapping)) {
                    if (answer.includes(shortName) && !answer.includes('专业')) {
                        enrichedAnswer = fullName;
                        break;
                    }
                }
                break;
        }
        
        return {
            original: answer,
            enriched: enrichedAnswer + additionalInfo,
            hasEnrichment: enrichedAnswer !== answer || additionalInfo !== ''
        };
    }

    async generateWelcomeMessage(tagName) {
        try {
            const prompt = `你是一个亲切的副业推荐助手，用户刚选择了身份标签「${tagName}」。请生成一个有趣、个性化的欢迎消息（20-40字），要求：
1. 体现对这个身份的理解和共鸣
2. 语气轻松友好，像朋友聊天
3. 表达要开始了解用户具体情况
4. 可以适当使用emoji
5. 避免过于正式或商业化的表达

只返回欢迎消息内容，不要其他解释。`;
            
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk-29c306bada2f48b8bb34ef53d97081aa',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.8,
                    max_tokens: 100
                })
            });
            
            if (!response.ok) {
                throw new Error(`API调用失败: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('生成欢迎消息失败:', error);
            return `哈喽！看你选了「${tagName}」，我懂你的痛！现在来聊聊你的具体情况，我好给你量身定制副业推荐~`;
        }
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 标签选择事件
        document.querySelectorAll('.tag-card').forEach(card => {
            card.addEventListener('click', () => {
                const tag = card.dataset.tag;
                this.selectTag(tag);
            });
        });

        // 发送消息事件
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // 回车发送消息
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        // 下载报告按钮
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadReport();
        });
    }

    selectTag(tag) {
        this.userProfile.tag = tag;
        
        // 隐藏标签选择，显示信息收集
        document.getElementById('tag-selection').classList.remove('active');
        document.getElementById('info-collection').classList.add('active');
        
        // 开始对话
        this.startChat();
    }

    async startChat() {
        const chatMessages = document.getElementById('chat-messages');
        const tagNames = {
            'early-bird': '早八特困生',
            'commuter': '通勤沙丁鱼',
            'overtime': '加班燃烧弹',
            'club-king': '社团卷王',
            'slacker': '摸鱼特种兵',
            'hobby': '兴趣小透明'
        };
        
        // 生成AI欢迎消息
        const welcomeMessage = await this.generateWelcomeMessage(tagNames[this.userProfile.tag]);
        this.addMessage(welcomeMessage, 'bot');
        
        // 预设问题已准备好，无需生成
        
        // 立即显示第一个问题
        setTimeout(() => {
            this.askNextQuestion();
        }, 500);
    }

    askNextQuestion() {
        if (this.currentStep < this.questions.length) {
            const question = this.questions[this.currentStep].question;
            this.addMessage(question, 'bot');
        } else {
            this.generateRecommendation();
        }
    }

    validateAnswer(answer, questionKey) {
        // 基本验证：回答不能太短或只是数字/符号
        if (answer.length < 2) {
            return false;
        }
        
        // 检查是否只是无意义的回复
        const meaninglessReplies = ['不知道', '随便', '没有', '无', '？', '?', '。', '.', '嗯', '啊', '哦', '好的', 'ok', 'OK'];
        if (meaninglessReplies.includes(answer.trim())) {
            return false;
        }
        
        // 根据问题类型进行特定验证
        switch (questionKey) {
            case 'school':
                // 学校问题：应该包含学校相关词汇或常见学校名称
                const schoolKeywords = ['大学', '学院', '学校', '高中', '中学', '职校', '技校', '研究生', '本科', '专科', '博士', '硕士'];
                const commonSchools = ['复旦', '清华', '北大', '交大', '浙大', '南大', '中大', '华科', '西交', '哈工大', '同济', '华师大', '上财', '央财', '人大', '北师大', '中科大', '厦大', '武大', '华中', '东南', '天大', '大连理工', '西北大', '兰大', '川大', '重大', '电子科大', '西南', '暨大', '华南理工', '中南', '湖大', '东北', '吉大', '哈尔滨', '大工', '北航', '北理工', '农大', '林大', '地大', '矿大', '石大', '海大', '药大', '邮电', '外经贸', '政法', '师范', '财经', '理工', '工业', '科技', '医科', '农业', '林业', '海洋', '石油', '地质', '矿业', '邮电', '电力', '铁道', '航空', '航天'];
                return schoolKeywords.some(keyword => answer.includes(keyword)) || 
                       commonSchools.some(school => answer.includes(school));
                
            case 'gender':
                // 性别问题：应该是明确的性别回答
                const genderKeywords = ['男', '女', '男生', '女生', '男性', '女性', 'boy', 'girl', 'male', 'female'];
                return genderKeywords.some(keyword => answer.toLowerCase().includes(keyword.toLowerCase()));
                
            case 'major':
                // 专业问题：应该包含专业相关内容
                return answer.length >= 2 && !['不是学生', '没有专业', '工作了'].includes(answer);
                
            case 'mainJob':
                // 身份问题：应该描述身份或工作
                return answer.length > 2;
                
            case 'timeAvailable':
                // 时间问题：应该包含时间相关词汇
                const timeKeywords = ['小时', '时间', '分钟', '天', '周', '月', '早上', '下午', '晚上', '周末', '工作日', '空闲', '忙'];
                return timeKeywords.some(keyword => answer.includes(keyword)) || answer.length > 3;
                
            case 'interests':
                // 兴趣技能问题：应该描述具体的兴趣或技能
                return answer.length >= 2 && !['没有兴趣', '什么都不会'].includes(answer);
                
            case 'goal':
                // 目标问题：应该描述目标
                return answer.length > 3;
                
            default:
                return answer.length > 2;
        }
    }

    sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // 保存用户回答
        if (this.currentStep < this.questions.length) {
            const key = this.questions[this.currentStep].key;
            
            // 验证用户回答是否相关
            if (!this.validateAnswer(message, key)) {
                // 如果回答不相关，提示用户重新回答
                setTimeout(() => {
                    this.addMessage('请回答与问题相关的内容哦～让我重新问一遍：', 'bot');
                    setTimeout(() => {
                        this.askNextQuestion();
                    }, 1000);
                }, 500);
                return;
            }
            
            // 使用信息丰富化功能
            const enrichmentResult = this.enrichUserInput(message, key);
            
            // 保存丰富后的信息
            this.userProfile[key] = enrichmentResult.enriched;
            
            // 如果信息被丰富了，显示一个提示
            if (enrichmentResult.hasEnrichment) {
                console.log(`信息已丰富: ${enrichmentResult.original} -> ${enrichmentResult.enriched}`);
            }
            
            // 显示"正在输入..."提示
            this.addMessage('LaTata正在输入...', 'bot', true);
            
            // 使用API生成上下文相关的回复
            setTimeout(async () => {
                try {
                    const contextualResponse = await this.generateContextualResponse(message, key);
                    
                    // 移除"正在输入..."提示
                    this.removeTypingIndicator();
                    
                    setTimeout(() => {
                        this.addMessage(contextualResponse, 'bot');
                        
                        // 递增步骤
                        this.currentStep++;
                        
                        // 如果是最后一个问题，直接跳转到推荐生成
                        if (this.currentStep >= this.questions.length) {
                            setTimeout(() => {
                                this.generateRecommendation();
                            }, 1500);
                            return;
                        }
                        
                        setTimeout(() => {
                            this.askNextQuestion();
                        }, 1500);
                    }, 800);
                } catch (error) {
                    console.error('生成回复失败:', error);
                    // 移除"正在输入..."提示
                    this.removeTypingIndicator();
                    
                    // 递增步骤
                    this.currentStep++;
                    
                    // 如果API失败，直接进入下一个问题或推荐生成
                    if (this.currentStep >= this.questions.length) {
                        setTimeout(() => {
                            this.generateRecommendation();
                        }, 800);
                    } else {
                        setTimeout(() => {
                            this.askNextQuestion();
                        }, 800);
                    }
                }
            }, 1000);
        }
    }

    async generateContextualResponse(userInput, questionKey) {
        // 构建上下文提示
        const questionMap = {
            school: '学校信息',
            mainJob: '主要身份/工作',
            timeAvailable: '可用时间',
            interests: '兴趣技能',
            goal: '副业目标'
        };
        
        const currentQuestion = questionMap[questionKey] || '当前问题';
        const conversationContext = this.buildConversationContext();
        
        // 随机选择不同的回复风格
        const responseStyles = [
            '理解共鸣型',
            '幽默吐槽型', 
            '鼓励支持型',
            '好奇探索型'
        ];
        const randomStyle = responseStyles[Math.floor(Math.random() * responseStyles.length)];
        
        // 随机选择不同的语气词
        const toneWords = ['哈哈', '哇', '嗯嗯', '哎呀', '嘿', '噢', '唔'];
        const randomTone = toneWords[Math.floor(Math.random() * toneWords.length)];
        
        // 构建历史回复避免重复的提示
        const historyPrompt = this.responseHistory.length > 0 ? 
            `\n\n重要：避免使用以下已用过的回复模式和表达方式：\n${this.responseHistory.slice(-3).map((resp, i) => `${i+1}. ${resp}`).join('\n')}\n请确保这次的回复与以上完全不同。` : '';
        
        // 特殊处理性别问题
        if (questionKey === 'gender') {
            return '收到！';
        }
        
        let prompt = `你是一个亲切的聊天助手，正在与用户进行轻松的对话收集信息。

对话上下文：
${conversationContext}

当前问题类型：${currentQuestion}
用户刚才的回答："${userInput}"
回复风格：${randomStyle}
建议语气词：${randomTone}

请根据用户的具体回答和已有信息生成一个个性化、有趣的回复（15-30字），要求：
1. 基于用户已提供的信息（学校、专业、身份等）进行个性化回复
2. 每次回复都要有所不同，避免重复套路
3. 根据指定的回复风格调整语气，要生动有趣
4. 可以适当调侃、共鸣或鼓励，让对话更有趣
5. 避免提及具体的副业类型或方向
6. 语气轻松友好，像朋友聊天一样，要有个性
7. 可以结合用户的背景信息进行有趣的联想和评论

个性化回复示例：
- 对学校："哇，[学校名]的同学！听起来就很厉害呢～"
- 对专业："[专业]专业啊，感觉你们都很有想法！"
- 对时间："[时间描述]，这个时间安排我懂，现代人都这样！"
- 对兴趣："[兴趣技能]？这个技能很有意思啊！"`;

        // 针对学校信息的特殊处理
        if (questionKey === 'school') {
            prompt += `

特别注意：用户回答的是学校信息，请注意：
- 如果用户提到多个学校（如本科+研究生），要正确理解这是教育经历，不是"双学位"
- 要体现对用户教育背景的认可和理解
- 可以适当夸赞学校或教育经历，但要自然不做作
- 示例："哇，复旦本科杜克研究生，教育背景很棒呢！"`;
        }
        
        prompt += `${historyPrompt}

只返回回复内容，不要其他解释。`;
        
        try {
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk-29c306bada2f48b8bb34ef53d97081aa',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.9,  // 提高随机性
                    max_tokens: 50,
                    top_p: 0.95  // 增加多样性
                })
            });
            
            if (!response.ok) {
                throw new Error(`API调用失败: ${response.status}`);
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content.trim();
            
            // 记录回复历史，保持最近5条
            this.responseHistory.push(aiResponse);
            if (this.responseHistory.length > 5) {
                this.responseHistory.shift();
            }
            
            return aiResponse;
        } catch (error) {
            console.error('生成上下文回复失败:', error);
            // 返回简单的确认回复
            return '好的，我了解了！';
        }
    }
    
    buildConversationContext() {
        let context = '';
        const questionMap = {
            school: '学校',
            gender: '性别',
            major: '专业',
            mainJob: '身份',
            timeAvailable: '时间',
            interests: '技能',
            goal: '目标'
        };
        
        for (let i = 0; i < this.currentStep; i++) {
            const key = this.questions[i].key;
            const value = this.userProfile[key];
            if (value) {
                context += `${questionMap[key]}：${value}\n`;
            }
        }
        
        return context || '对话刚开始';
    }

    addMessage(message, sender, isTyping = false) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        if (isTyping) {
            messageDiv.className += ' typing-indicator';
            messageDiv.innerHTML = `<span class="typing-dots">${message}</span>`;
        } else {
            messageDiv.textContent = message;
        }
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async generateRecommendation() {
        this.addMessage('收到！让我来深度分析你的情况...', 'bot');
        
        // 短暂延迟后直接跳转到分析页面
        setTimeout(() => {
            // 隐藏聊天界面，显示推荐结果页面
            document.getElementById('info-collection').classList.remove('active');
            document.getElementById('recommendation').classList.add('active');
            
            // 开始分析流程
            this.startAnalysisProcess();
        }, 1000);
    }

    async startAnalysisProcess() {
        try {
            // 显示分析动画
            const processHeader = document.querySelector('.process-header h2');
            const processDesc = document.querySelector('.process-header p');
            const thinkingAnimation = document.querySelector('.thinking-animation');
            
            if (processHeader) processHeader.textContent = '正在深度分析';
            if (processDesc) processDesc.textContent = '基于你的信息进行个性化推荐';
            if (thinkingAnimation) thinkingAnimation.style.display = 'block';
            
            // 生成推荐
            const recommendation = await this.generatePersonalizedRecommendation();
            
            // 隐藏动画，显示结果
            if (processHeader) processHeader.textContent = '分析完成';
            if (processDesc) processDesc.textContent = '已为你完成深度分析';
            if (thinkingAnimation) thinkingAnimation.style.display = 'none';
            
            this.displayRecommendation(recommendation);
        } catch (error) {
            console.error('生成推荐失败:', error);
            // 错误处理：隐藏动画并显示错误信息
            const processHeader = document.querySelector('.process-header h2');
            const processDesc = document.querySelector('.process-header p');
            const thinkingAnimation = document.querySelector('.thinking-animation');
            
            if (processHeader) processHeader.textContent = '分析失败';
            if (processDesc) processDesc.textContent = '请重试或联系客服';
            if (thinkingAnimation) thinkingAnimation.style.display = 'none';
        }
    }

    async generatePersonalizedRecommendation() {
        try {
            const prompt = this.buildRecommendationPrompt();
            
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk-29c306bada2f48b8bb34ef53d97081aa',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.8,
                    max_tokens: 2000
                })
            });
            
            if (!response.ok) {
                throw new Error(`API调用失败: ${response.status}`);
            }
            
            const data = await response.json();
            const content = data.choices[0].message.content;
            
            // 尝试解析JSON格式的回复
            try {
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsedContent = JSON.parse(jsonMatch[0]);
                    return parsedContent;
                }
            } catch (parseError) {
                console.log('JSON解析失败，返回原始内容:', parseError);
            }
            
            // 如果解析失败，返回原始字符串
            return content;
        } catch (error) {
            console.error('AI生成推荐失败:', error);
            // 降级到本地推荐
            return this.getLocalRecommendation();
        }
    }

    buildRecommendationPrompt() {
        return `你是一个专业的副业推荐顾问，请基于以下用户信息生成个性化的副业推荐报告。

用户信息：
- 身份标签：${this.userProfile.tag}
- 学校：${this.userProfile.school}
- 性别：${this.userProfile.gender}
- 专业：${this.userProfile.major}
- 主要身份：${this.userProfile.mainJob}
- 可用时间：${this.userProfile.timeAvailable}
- 兴趣技能：${this.userProfile.interests}
- 副业目标：${this.userProfile.goal}

请生成一个详细的副业推荐报告，包含以下内容：

1. 个人情况分析（100-150字）
   - 基于用户的学校、专业、身份等背景进行分析
   - 指出用户的优势和特点
   - 分析时间安排和目标的合理性

2. 推荐副业方向（3-5个具体建议）
   每个建议包含：
   - 副业名称
   - 适合原因（结合用户背景）
   - 预期收入范围
   - 所需时间投入
   - 具体操作建议

3. 避坑Tips（3-5条实用建议）
   - 针对用户情况的具体注意事项
   - 常见陷阱和如何避免
   - 实用的执行建议

4. 行动计划
   - 第一步应该做什么
   - 如何循序渐进
   - 时间规划建议

请用轻松友好的语气，避免过于正式。要体现对用户具体情况的深度理解和个性化建议。

特别要求：
1. 必须结合用户的具体专业、学校、时间等信息
2. 推荐要切实可行，符合用户的实际情况
3. 语言要生动有趣，不要太死板
4. 要有具体的数字和操作指导
5. 避坑Tips要实用，不要泛泛而谈
6. 特殊情况处理：如果用户显得太忙（如加班燃烧弹、时间极少、工作压力大等传统认为比较忙的情况），必须优先关注用户健康，可以适当吐槽并强烈建议养身，比如"兄弟，与其搞副业不如先养身"、"都这么累了还想副业？先保重身体吧"等，但仍要给出轻松可行的副业建议。

请以自然的文本格式回复，不需要严格的JSON格式。`;
    }

    getLocalRecommendation() {
        // 本地备用推荐逻辑
        const recommendations = {
            'early-bird': {
                title: '早起鸟儿有虫吃',
                analysis: '作为早八特困生，你的痛苦我们都懂！但既然已经被迫早起了，不如把这个"劣势"变成优势。早起的时间其实是很宝贵的，可以做很多别人做不了的事情。',
                suggestions: [
                    '早餐摊代购服务 - 利用早起优势，帮同学代买早餐',
                    '晨练陪伴服务 - 组织或陪伴他人晨练',
                    '早起学习打卡群 - 建立付费学习社群'
                ]
            },
            'commuter': {
                title: '通勤路上也能赚钱',
                analysis: '每天通勤的时间看似浪费，但其实是很好的副业时间。在地铁、公交上的碎片时间，完全可以用来做一些轻松的副业。',
                suggestions: [
                    '线上客服兼职 - 利用通勤时间回复客户消息',
                    '内容创作 - 写小红书、知乎文章',
                    '语音转文字服务 - 在安静的通勤环境中进行'
                ]
            },
            'overtime': {
                title: '加班狗的生存指南',
                analysis: '兄弟，都已经这么累了还想搞副业？先保重身体吧！不过如果真的需要额外收入，建议选择一些不太耗精力的项目。',
                suggestions: [
                    '被动收入项目 - 如理财、基金定投',
                    '周末轻松兼职 - 如宠物寄养、家教',
                    '技能变现 - 把工作技能包装成付费咨询'
                ]
            },
            'club-king': {
                title: '社团经验就是财富',
                analysis: '社团卷王的组织能力和人脉资源是你最大的优势！这些软技能在副业中非常有价值，可以很好地变现。',
                suggestions: [
                    '活动策划服务 - 帮其他组织策划活动',
                    '社群运营 - 运营付费社群或知识星球',
                    '培训讲师 - 分享组织管理经验'
                ]
            },
            'slacker': {
                title: '摸鱼达人的赚钱秘籍',
                analysis: '摸鱼特种兵！你的时间管理能力其实很强，知道怎么在有限时间内完成任务。这种效率可以很好地用在副业上。',
                suggestions: [
                    '效率工具推广 - 分享你的摸鱼神器',
                    '时间管理咨询 - 教别人如何高效工作',
                    '轻松兼职 - 如游戏陪练、聊天陪伴'
                ]
            },
            'hobby': {
                title: '兴趣就是最好的老师',
                analysis: '兴趣小透明往往有很深的专业积累！不要小看自己的爱好，很多看似小众的兴趣都有变现的可能。',
                suggestions: [
                    '兴趣教学 - 开设相关技能课程',
                    '内容创作 - 分享专业知识和经验',
                    '定制服务 - 提供个性化的兴趣相关服务'
                ]
            }
        };

        return recommendations[this.userProfile.tag] || recommendations['hobby'];
    }

    getProfileAnalysis() {
        const profiles = {
            'early-bird': '早起虽然痛苦，但这给了你别人没有的时间优势',
            'commuter': '通勤时间长，但可以充分利用碎片时间',
            'overtime': '工作压力大，需要选择轻松的副业项目',
            'club-king': '组织能力强，人脉资源丰富',
            'slacker': '时间管理能力强，效率高',
            'hobby': '专业兴趣深厚，有独特的技能积累'
        };
        return profiles[this.userProfile.tag] || '你有独特的个人特质';
    }

    getTimeAnalysis() {
        const time = this.userProfile.timeAvailable.toLowerCase();
        if (time.includes('1') || time.includes('少')) {
            return '时间有限，建议选择灵活度高的项目';
        } else if (time.includes('周末') || time.includes('空闲')) {
            return '周末时间充裕，可以考虑需要集中时间的项目';
        } else {
            return '时间安排灵活，有很多选择空间';
        }
    }

    getSkillAnalysis() {
        const skills = this.userProfile.interests.toLowerCase();
        const skillMap = {
            '写作': '文字创作能力强，适合内容相关副业',
            '摄影': '视觉创作能力强，适合图片视频相关副业',
            '编程': '技术能力强，适合开发或技术服务类副业',
            '设计': '创意设计能力强，适合视觉设计类副业',
            '运动': '身体素质好，适合健身或运动相关副业',
            '音乐': '艺术天赋，适合音乐教学或表演类副业',
            '语言': '语言能力强，适合翻译或教学类副业'
        };
        
        for (const [skill, analysis] of Object.entries(skillMap)) {
            if (skills.includes(skill)) {
                return analysis;
            }
        }
        return '你的兴趣爱好都有变现的潜力';
    }

    getGoalAnalysis() {
        const goal = this.userProfile.goal.toLowerCase();
        if (goal.includes('钱') || goal.includes('收入')) {
            return '以收入为主要目标，建议选择变现较快的项目';
        } else if (goal.includes('发展') || goal.includes('成长')) {
            return '注重个人发展，建议选择能积累经验和技能的项目';
        } else if (goal.includes('兴趣') || goal.includes('爱好')) {
            return '兴趣导向，建议选择与个人爱好相关的项目';
        } else {
            return '目标明确，可以选择符合期望的项目类型';
        }
    }

    generateBasicRecommendation() {
        const analysis = this.getProfileAnalysis();
        const timeAnalysis = this.getTimeAnalysis();
        const skillAnalysis = this.getSkillAnalysis();
        const goalAnalysis = this.getGoalAnalysis();
        
        return {
            analysis: `${analysis}。${timeAnalysis}，${skillAnalysis}。${goalAnalysis}。`,
            suggestions: [
                {
                    name: '内容创作',
                    reason: '结合你的兴趣和专业背景',
                    income: '500-3000元/月',
                    time: '每天1-2小时',
                    action: '选择一个平台开始分享你的专业内容'
                },
                {
                    name: '技能服务',
                    reason: '利用你现有的技能和经验',
                    income: '1000-5000元/月',
                    time: '周末或空闲时间',
                    action: '在相关平台注册并完善个人资料'
                },
                {
                    name: '线上兼职',
                    reason: '时间灵活，适合你的时间安排',
                    income: '800-2000元/月',
                    time: '碎片时间',
                    action: '寻找可靠的兼职平台并投递简历'
                }
            ],
            tips: [
                '选择副业时要考虑与主业的平衡',
                '刚开始不要贪多，专注做好一个项目',
                '建立个人品牌，积累口碑和客户',
                '合理规划时间，避免影响主要工作学习',
                '保持学习心态，不断提升自己的技能'
            ]
        };
    }

    displayRecommendation(recommendation) {
        const container = document.getElementById('recommendation-content');
        
        // 如果是字符串格式，尝试解析或使用基础推荐
        if (typeof recommendation === 'string') {
            recommendation = this.generateBasicRecommendation();
        }
        
        // 如果是本地推荐格式，转换为标准格式
        if (recommendation.title) {
            recommendation = {
                analysis: recommendation.analysis,
                suggestions: recommendation.suggestions.map(s => ({
                    name: s,
                    reason: '基于你的个人情况推荐',
                    income: '具体收入因人而异',
                    time: '根据个人时间安排',
                    action: '了解相关信息并开始尝试'
                })),
                tips: [
                    '选择适合自己的项目',
                    '保持耐心和坚持',
                    '注意时间管理',
                    '建立个人品牌'
                ]
            };
        }
        
        container.innerHTML = `
            <div class="analysis-section">
                <h3>📊 个人情况分析</h3>
                <p>${recommendation.analysis || '基于你提供的信息，我们为你量身定制了以下建议。'}</p>
            </div>
            
            <div class="suggestions-section">
                <h3>💡 推荐副业方向</h3>
                ${(recommendation.suggestions || []).map((suggestion, index) => `
                    <div class="suggestion-card">
                        <h4>${index + 1}. ${suggestion.name || suggestion}</h4>
                        <p><strong>适合原因：</strong>${suggestion.reason || '符合你的个人情况'}</p>
                        <p><strong>预期收入：</strong>${suggestion.income || '因人而异'}</p>
                        <p><strong>时间投入：</strong>${suggestion.time || '灵活安排'}</p>
                        <p><strong>行动建议：</strong>${suggestion.action || '了解相关信息并开始尝试'}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="tips-section">
                <h3>⚠️ 避坑Tips</h3>
                <ul>
                    ${(recommendation.tips || []).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    displayAnalysisProcess(data) {
        const processContainer = document.querySelector('.analysis-process');
        if (!processContainer) return;
        
        processContainer.innerHTML = `
            <div class="process-step active">
                <div class="step-icon">📊</div>
                <div class="step-content">
                    <h4>个人背景分析</h4>
                    <p>分析你的学校、专业、时间等基础信息</p>
                </div>
            </div>
            <div class="process-step active">
                <div class="step-icon">🎯</div>
                <div class="step-content">
                    <h4>目标匹配度评估</h4>
                    <p>评估你的副业目标与个人情况的匹配度</p>
                </div>
            </div>
            <div class="process-step active">
                <div class="step-icon">💡</div>
                <div class="step-content">
                    <h4>个性化推荐生成</h4>
                    <p>基于分析结果生成专属副业推荐方案</p>
                </div>
            </div>
        `;
    }

    async animateAnalysisProcess(analysis, recommendation) {
        const steps = document.querySelectorAll('.process-step');
        
        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    steps[i].classList.add('completed');
                    resolve();
                }, 1000 * (i + 1));
            });
        }
        
        // 显示最终结果
        setTimeout(() => {
            this.displayRecommendation(recommendation);
        }, 500);
    }

    restart() {
        // 重置所有数据
        this.userProfile = {
            tag: '',
            school: '',
            gender: '',
            major: '',
            mainJob: '',
            timeAvailable: '',
            interests: '',
            goal: ''
        };
        this.currentStep = 0;
        this.responseHistory = [];
        
        // 清空聊天记录
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        // 重置界面状态
        document.getElementById('tag-selection').classList.add('active');
        document.getElementById('info-collection').classList.remove('active');
        document.getElementById('recommendation').classList.remove('active');
        
        // 清空输入框
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.value = '';
        }
    }

    downloadReport() {
        // 简单的下载功能，生成文本报告
        const content = document.getElementById('recommendation-content');
        if (!content) return;
        
        const text = content.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '副业推荐报告.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new SideHustleRecommender();
});