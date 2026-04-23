class DataManager {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000;
        this.data = {};
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            this.data = this.getDefaultData();
            this.isInitialized = true;
        } catch (error) {
            console.error('数据初始化失败:', error);
            throw error;
        }
    }

    getDefaultData() {
        return {
            site: {
                title: '中国广绣',
                subtitle: '国家级非物质文化遗产',
                description: '广绣是中国四大名绣之一，以其精湛的技艺和独特的艺术风格闻名于世。',
                keywords: ['广绣', '粤绣', '四大名绣', '非物质文化遗产', '传统技艺']
            },
            
            history: [
                {
                    id: 'h1',
                    year: '唐代',
                    title: '起源时期',
                    description: '广绣的历史可以追溯到唐代，当时广州地区的刺绣技艺已经相当发达。唐代是广绣发展的萌芽期，刺绣主要用于宗教服饰和宫廷用品。',
                    image: '',
                    period: '古代'
                },
                {
                    id: 'h2',
                    year: '宋代',
                    title: '发展时期',
                    description: '宋代是广绣技艺的重要发展期。广州作为海上丝绸之路的重要港口，刺绣品开始大量出口，促进了技艺的交流与提高。',
                    image: '',
                    period: '古代'
                },
                {
                    id: 'h3',
                    year: '明代',
                    title: '繁荣时期',
                    description: '明代广绣达到了前所未有的繁荣。技艺更加精湛，品种更加丰富，形成了独特的艺术风格。广绣开始成为贡品，深受宫廷喜爱。',
                    image: '',
                    period: '古代'
                },
                {
                    id: 'h4',
                    year: '清代',
                    title: '鼎盛时期',
                    description: '清代是广绣的鼎盛时期。广州成为全国刺绣中心，广绣远销海外，被誉为"中国给西方的礼物"。技艺达到顶峰，形成了完整的针法体系。',
                    image: '',
                    period: '近代'
                },
                {
                    id: 'h5',
                    year: '近现代',
                    title: '传承与创新',
                    description: '近现代以来，广绣经历了起伏，但始终保持着生命力。新中国成立后，广绣得到了重视和发展，被列入国家级非物质文化遗产名录。',
                    image: '',
                    period: '现代'
                }
            ],
            
            techniques: [
                {
                    id: 't1',
                    name: '直针绣',
                    description: '直针绣是广绣最基本的针法之一，线条排列整齐，适用于表现大面积的色块和平滑的过渡。',
                    category: '基础针法',
                    difficulty: '初级',
                    steps: [
                        '确定绣线颜色和粗细',
                        '从布面下方出针',
                        '按照预定方向直刺',
                        '保持针距均匀一致',
                        '重复以上步骤完成绣面'
                    ],
                    demo: true
                },
                {
                    id: 't2',
                    name: '续针绣',
                    description: '续针绣是将线条分段刺绣，前一针的尾与后一针的头相连，形成连贯的线条效果。',
                    category: '基础针法',
                    difficulty: '初级',
                    steps: [
                        '按照图案轮廓分段',
                        '第一段从起点开始',
                        '第二段与第一段尾部衔接',
                        '保持衔接处平滑自然',
                        '完成整个轮廓的刺绣'
                    ],
                    demo: true
                },
                {
                    id: 't3',
                    name: '捆针绣',
                    description: '捆针绣是用多根绣线捆扎成一束进行刺绣，适用于表现粗壮的线条和纹理。',
                    category: '基础针法',
                    difficulty: '初级',
                    steps: [
                        '选择合适数量的绣线',
                        '将绣线整齐排列',
                        '从图案一端开始刺绣',
                        '保持捆线的一致性',
                        '完成图案的填充'
                    ],
                    demo: true
                },
                {
                    id: 't4',
                    name: '施针',
                    description: '施针是广绣的特色针法之一，通过长短交错的针脚表现明暗层次，使绣品具有立体感。',
                    category: '特色针法',
                    difficulty: '中级',
                    steps: [
                        '分析图案的明暗关系',
                        '从暗部开始施针',
                        '针脚长短交错排列',
                        '逐渐过渡到亮部',
                        '调整针脚密度表现层次'
                    ],
                    demo: true
                },
                {
                    id: 't5',
                    name: '辅助针',
                    description: '辅助针是一种过渡针法，用于连接不同颜色或不同区域，使过渡更加自然流畅。',
                    category: '特色针法',
                    difficulty: '中级',
                    steps: [
                        '确定需要过渡的区域',
                        '选择中间色绣线',
                        '以短针脚交错排列',
                        '与相邻区域自然衔接',
                        '调整密度实现平滑过渡'
                    ],
                    demo: false
                },
                {
                    id: 't6',
                    name: '编绣',
                    description: '编绣是通过编织的方式刺绣，可以表现出丰富的纹理效果，如编织物、席纹等。',
                    category: '特色针法',
                    difficulty: '高级',
                    steps: [
                        '设计编织图案',
                        '先绣出纵向线条',
                        '再绣横向线条进行编织',
                        '保持编织的规律性',
                        '调整松紧度表现质感'
                    ],
                    demo: false
                },
                {
                    id: 't7',
                    name: '绕绣',
                    description: '绕绣是将绣线缠绕在针上，然后拉出形成线圈，适用于表现蓬松的质感。',
                    category: '特色针法',
                    difficulty: '高级',
                    steps: [
                        '选择合适粗细的绣线',
                        '将绣线在针上绕数圈',
                        '保持线圈的一致性',
                        '拉出针并固定线圈',
                        '重复操作形成图案'
                    ],
                    demo: false
                },
                {
                    id: 't8',
                    name: '织锦绣',
                    description: '织锦绣是广绣的高级针法，结合了编织和刺绣的特点，表现出华丽的锦缎效果。',
                    category: '高级针法',
                    difficulty: '高级',
                    steps: [
                        '设计锦缎图案',
                        '先绣出基础网格',
                        '按照图案进行编织',
                        '加入装饰性细节',
                        '调整整体效果'
                    ],
                    demo: false
                }
            ],
            
            techniqueCategories: [
                { id: 'basic', name: '基础针法', description: '广绣最基本的刺绣技法，是学习其他针法的基础。' },
                { id: 'feature', name: '特色针法', description: '广绣独有的特色技法，展现广绣的独特艺术风格。' },
                { id: 'advanced', name: '高级针法', description: '难度较高的技法，用于表现复杂精美的图案。' }
            ],
            
            works: [
                {
                    id: 'w1',
                    title: '百鸟朝凤',
                    artist: '陈少芳',
                    year: '1998',
                    description: '《百鸟朝凤》是广绣的经典代表作，以凤凰为中心，百鸟环绕，展现了广绣精湛的技艺和丰富的色彩表现力。作品采用了多种针法，色彩绚丽，层次分明。',
                    category: '经典作品',
                    dimensions: '180cm × 120cm',
                    techniques: ['施针', '辅助针', '续针绣'],
                    image: '',
                    featured: true
                },
                {
                    id: 'w2',
                    title: '荔枝红了',
                    artist: '梁桂开',
                    year: '2005',
                    description: '《荔枝红了》以岭南特色水果荔枝为主题，表现了丰收的喜悦。作品色彩鲜艳，针法细腻，荔枝的质感表现得淋漓尽致。',
                    category: '现代作品',
                    dimensions: '80cm × 80cm',
                    techniques: ['施针', '直针绣'],
                    image: '',
                    featured: true
                },
                {
                    id: 'w3',
                    title: '岭南春色',
                    artist: '许炽光',
                    year: '2010',
                    description: '《岭南春色》展现了岭南地区春天的美丽景色，木棉花盛开，生机盎然。作品采用了丰富的色彩层次和细腻的针法。',
                    category: '现代作品',
                    dimensions: '120cm × 90cm',
                    techniques: ['施针', '辅助针', '捆针绣'],
                    image: '',
                    featured: false
                },
                {
                    id: 'w4',
                    title: '九龙图',
                    artist: '传统工艺',
                    year: '清代',
                    description: '《九龙图》是清代广绣的传世名作，以九条龙为主题，气势磅礴，针法精湛。现收藏于故宫博物院。',
                    category: '传世珍品',
                    dimensions: '200cm × 150cm',
                    techniques: ['织锦绣', '施针'],
                    image: '',
                    featured: true
                },
                {
                    id: 'w5',
                    title: '孔雀开屏',
                    artist: '黄妹',
                    year: '2015',
                    description: '《孔雀开屏》以孔雀为主题，表现了孔雀开屏时的华丽景象。作品色彩丰富，针法细腻，孔雀羽毛的质感表现得栩栩如生。',
                    category: '现代作品',
                    dimensions: '150cm × 100cm',
                    techniques: ['施针', '辅助针', '绕绣'],
                    image: '',
                    featured: false
                },
                {
                    id: 'w6',
                    title: '松鹤延年',
                    artist: '林智成',
                    year: '2008',
                    description: '《松鹤延年》是传统吉祥题材，松树象征长寿，仙鹤象征吉祥。作品采用了传统针法，意境深远。',
                    category: '传统题材',
                    dimensions: '100cm × 80cm',
                    techniques: ['施针', '续针绣'],
                    image: '',
                    featured: false
                }
            ],
            
            workCategories: [
                { id: 'classic', name: '经典作品', description: '广绣历史上的经典代表作品。' },
                { id: 'modern', name: '现代作品', description: '当代艺术家创作的广绣作品。' },
                { id: 'treasure', name: '传世珍品', description: '具有历史价值的传世广绣作品。' },
                { id: 'traditional', name: '传统题材', description: '以传统吉祥图案为主题的作品。' }
            ],
            
            innovations: [
                {
                    id: 'i1',
                    title: '现代服饰应用',
                    category: '时尚设计',
                    description: '广绣技艺被广泛应用于高级时装设计，许多国际知名设计师将广绣元素融入服装设计中，展现东方美学。',
                    examples: [
                        { name: '高级定制礼服', description: '巴黎时装周上的广绣元素礼服' },
                        { name: '中式婚礼服', description: '融合广绣技艺的现代婚纱' },
                        { name: '高级成衣', description: '日常服饰中的广绣装饰' }
                    ],
                    image: ''
                },
                {
                    id: 'i2',
                    title: '家居装饰创新',
                    category: '空间设计',
                    description: '广绣不再局限于传统挂屏，而是与现代家居设计相结合，如沙发抱枕、墙面装饰、台灯灯罩等。',
                    examples: [
                        { name: '装饰挂屏', description: '现代风格的广绣装饰画' },
                        { name: '布艺软装', description: '沙发靠垫、窗帘等广绣装饰' },
                        { name: '灯具设计', description: '融合广绣元素的现代灯具' }
                    ],
                    image: ''
                },
                {
                    id: 'i3',
                    title: '文创产品开发',
                    category: '文创设计',
                    description: '广绣元素被应用于各类文创产品，如笔记本、手机壳、首饰等，让传统文化走进现代生活。',
                    examples: [
                        { name: '文具系列', description: '广绣图案的笔记本、书签' },
                        { name: '数码配件', description: '广绣元素的手机壳、电脑包' },
                        { name: '首饰设计', description: '融入广绣纹样的珠宝首饰' }
                    ],
                    image: ''
                },
                {
                    id: 'i4',
                    title: '数字艺术融合',
                    category: '数字艺术',
                    description: '广绣图案与数字艺术相结合，通过计算机技术进行再设计，创造出全新的视觉效果。',
                    examples: [
                        { name: '数字刺绣', description: '数字化设计的广绣图案' },
                        { name: '动画应用', description: '广绣元素的动画作品' },
                        { name: '交互体验', description: '广绣主题的交互式展览' }
                    ],
                    image: ''
                },
                {
                    id: 'i5',
                    title: '材料创新探索',
                    category: '材料研究',
                    description: '传统广绣主要使用丝线，现代广绣开始尝试使用各种新材料，如金属线、珠片、发光纤维等。',
                    examples: [
                        { name: '金属线绣', description: '使用金银线的现代广绣' },
                        { name: '珠片装饰', description: '融合珠片绣的广绣作品' },
                        { name: '发光绣品', description: '使用发光纤维的创新作品' }
                    ],
                    image: ''
                },
                {
                    id: 'i6',
                    title: '主题内容拓展',
                    category: '内容创新',
                    description: '传统广绣多以花鸟、龙凤为主题，现代广绣开始关注现实生活、城市景观、抽象艺术等新主题。',
                    examples: [
                        { name: '城市风光', description: '以现代城市为主题的广绣' },
                        { name: '抽象艺术', description: '抽象风格的广绣作品' },
                        { name: '当代生活', description: '表现现代生活的广绣创作' }
                    ],
                    image: ''
                }
            ],
            
            analysis: {
                strengths: [
                    {
                        title: '技艺精湛',
                        description: '广绣拥有数十种针法，技艺精湛，表现力强，可以表现从写实到写意的各种风格。',
                        icon: 'needle'
                    },
                    {
                        title: '色彩丰富',
                        description: '广绣配色华丽鲜艳，善于运用对比色和过渡色，视觉效果强烈。',
                        icon: 'palette'
                    },
                    {
                        title: '历史悠久',
                        description: '广绣有上千年的历史，文化底蕴深厚，是国家级非物质文化遗产。',
                        icon: 'history'
                    },
                    {
                        title: '题材广泛',
                        description: '广绣题材从传统花鸟到现代主题，表现内容极其丰富。',
                        icon: 'theme'
                    }
                ],
                challenges: [
                    {
                        title: '学习周期长',
                        description: '掌握广绣技艺需要多年的刻苦练习，年轻人往往缺乏耐心。',
                        icon: 'time'
                    },
                    {
                        title: '传承人才匮乏',
                        description: '随着老艺人的离去，广绣传承面临断代危机。',
                        icon: 'people'
                    },
                    {
                        title: '市场认知度低',
                        description: '普通消费者对广绣的了解有限，市场推广难度大。',
                        icon: 'market'
                    },
                    {
                        title: '生产成本高',
                        description: '手工刺绣耗时费力，价格较高，难以大众化。',
                        icon: 'cost'
                    }
                ],
                opportunities: [
                    {
                        title: '国潮兴起',
                        description: '中国传统文化复兴，年轻人对传统技艺的兴趣日益浓厚。',
                        icon: 'trend'
                    },
                    {
                        title: '政策支持',
                        description: '国家对非物质文化遗产的保护和传承给予大力支持。',
                        icon: 'policy'
                    },
                    {
                        title: '文旅融合',
                        description: '文化旅游产业发展，广绣可以作为文化IP进行开发。',
                        icon: 'tour'
                    },
                    {
                        title: '数字赋能',
                        description: '数字化技术为广绣的设计、生产和传播提供新途径。',
                        icon: 'digital'
                    }
                ],
                threats: [
                    {
                        title: '机器刺绣冲击',
                        description: '机器刺绣成本低、效率高，对手工刺绣市场造成冲击。',
                        icon: 'machine'
                    },
                    {
                        title: '消费习惯改变',
                        description: '现代生活节奏快，消费者更倾向于快消品。',
                        icon: 'consumer'
                    },
                    {
                        title: '仿冒品泛滥',
                        description: '市场上充斥着低价仿冒品，损害广绣品牌形象。',
                        icon: 'fake'
                    },
                    {
                        title: '原材料稀缺',
                        description: '优质蚕丝等传统原材料日益稀缺，成本上升。',
                        icon: 'material'
                    }
                ]
            },
            
            artists: [
                {
                    id: 'a1',
                    name: '陈少芳',
                    birthYear: '1937',
                    description: '中国工艺美术大师，广绣国家级传承人。她致力于广绣的创新与发展，创作了《百鸟朝凤》等经典作品。',
                    achievements: ['中国工艺美术大师', '国家级非物质文化遗产传承人', '广东省工艺美术大师'],
                    works: ['百鸟朝凤', '岭南春早'],
                    image: ''
                },
                {
                    id: 'a2',
                    name: '梁桂开',
                    birthYear: '1945',
                    description: '广东省工艺美术大师，广绣省级传承人。擅长花鸟题材，作品色彩鲜艳，针法细腻。',
                    achievements: ['广东省工艺美术大师', '省级非物质文化遗产传承人'],
                    works: ['荔枝红了', '春满岭南'],
                    image: ''
                },
                {
                    id: 'a3',
                    name: '许炽光',
                    birthYear: '1948',
                    description: '中国工艺美术大师，广绣国家级传承人。传承家族技艺，作品兼具传统与现代风格。',
                    achievements: ['中国工艺美术大师', '国家级非物质文化遗产传承人'],
                    works: ['岭南春色', '松鹤延年'],
                    image: ''
                },
                {
                    id: 'a4',
                    name: '黄妹',
                    birthYear: '1952',
                    description: '广东省工艺美术大师，广绣省级传承人。擅长大型作品创作，作品多次获得国家级奖项。',
                    achievements: ['广东省工艺美术大师', '省级非物质文化遗产传承人'],
                    works: ['孔雀开屏', '百花齐放'],
                    image: ''
                },
                {
                    id: 'a5',
                    name: '林智成',
                    birthYear: '1955',
                    description: '广绣技艺传承人，专注于传统题材的传承与创新，作品以传统吉祥图案见长。',
                    achievements: ['广州市工艺美术大师'],
                    works: ['松鹤延年', '龙凤呈祥'],
                    image: ''
                }
            ],
            
            culturalSignificance: {
                overview: '广绣是中国四大名绣之一，是岭南文化的重要组成部分，具有极高的艺术价值和文化意义。',
                values: [
                    {
                        title: '艺术价值',
                        description: '广绣以其精湛的技艺和独特的艺术风格，在中国刺绣史上占有重要地位。',
                        details: [
                            '丰富的针法体系',
                            '独特的配色技巧',
                            '细腻的表现力',
                            '鲜明的地域特色'
                        ]
                    },
                    {
                        title: '历史价值',
                        description: '广绣承载着岭南地区千年的历史文化，是研究岭南社会发展的重要实物资料。',
                        details: [
                            '海上丝绸之路的见证',
                            '中外文化交流的载体',
                            '社会风俗的记录',
                            '工艺技术的传承'
                        ]
                    },
                    {
                        title: '经济价值',
                        description: '广绣曾是广州重要的出口商品，为岭南经济发展做出过重要贡献。',
                        details: [
                            '海上丝绸之路重要商品',
                            '带动相关产业发展',
                            '创造就业机会',
                            '促进文化旅游'
                        ]
                    },
                    {
                        title: '社会价值',
                        description: '广绣是岭南地区重要的文化符号，凝聚着岭南人民的智慧和情感。',
                        details: [
                            '文化认同的载体',
                            '情感表达的方式',
                            '技艺传承的纽带',
                            '社区凝聚的力量'
                        ]
                    }
                ]
            },
            
            navigation: [
                { path: '/', title: '首页', icon: 'home' },
                { path: '/history', title: '历史传承', icon: 'history' },
                { path: '/techniques', title: '核心技艺', icon: 'needle' },
                { path: '/works', title: '代表性作品', icon: 'art' },
                { path: '/innovation', title: '创新应用', icon: 'innovation' },
                { path: '/analysis', title: '技艺分析', icon: 'analysis' }
            ]
        };
    }

    async loadJSON(filePath) {
        const cacheKey = `json_${filePath}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
        }

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`无法加载数据文件: ${filePath}`);
            }
            const data = await response.json();
            
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.warn(`加载JSON失败: ${error.message}`);
            return null;
        }
    }

    get(key, defaultValue = null) {
        if (key.includes('.')) {
            return this.getNestedValue(this.data, key, defaultValue);
        }
        return this.data[key] !== undefined ? this.data[key] : defaultValue;
    }

    getNestedValue(obj, path, defaultValue) {
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current === null || current === undefined) {
                return defaultValue;
            }
            current = current[key];
        }

        return current !== undefined ? current : defaultValue;
    }

    set(key, value) {
        if (key.includes('.')) {
            this.setNestedValue(this.data, key, value);
        } else {
            this.data[key] = value;
        }
    }

    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (current[key] === undefined) {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    }

    async fetchData(url, options = {}) {
        const cacheKey = `fetch_${url}`;
        
        if (options.cache !== false && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status}`);
            }

            const data = await response.json();
            
            if (options.cache !== false) {
                this.cache.set(cacheKey, {
                    data,
                    timestamp: Date.now()
                });
            }

            return data;
        } catch (error) {
            console.error(`数据获取失败: ${error.message}`);
            throw error;
        }
    }

    clearCache() {
        this.cache.clear();
    }

    getCacheSize() {
        return this.cache.size;
    }

    findById(collection, id) {
        const items = this.get(collection, []);
        return items.find(item => item.id === id);
    }

    findByCategory(collection, category) {
        const items = this.get(collection, []);
        return items.filter(item => item.category === category);
    }

    filter(collection, predicate) {
        const items = this.get(collection, []);
        return items.filter(predicate);
    }

    getAll() {
        return { ...this.data };
    }
}

export default DataManager;