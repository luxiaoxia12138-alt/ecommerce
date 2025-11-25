import Mock from "mockjs";

const Random = Mock.Random;

// 每个分类对应真实的商品名字池
const namesByCategory = {
  手机: [
    "苹果 iPhone 14",
    "华为 Mate 50",
    "小米 13",
    "荣耀 Magic4",
    "三星 Galaxy S23",
    "OPPO Find X5",
    "vivo X90",
  ],
  电脑: [
    "MacBook Air M2",
    "联想拯救者 Y9000P",
    "华硕天选4",
    "戴尔 XPS 13",
    "惠普光影精灵",
    "宏碁暗影骑士",
    "雷神 911",
  ],
  家电: [
    "美的空调 1.5 匹",
    "海尔冰箱 450L",
    "海信电视 65 寸",
    "格力挂机空调",
    "小米扫地机器人",
    "科沃斯 T10",
    "美的洗衣机 10kg",
  ],
  服饰: [
    "耐克 AirT 恤",
    "阿迪达斯运动外套",
    "优衣库羽绒服",
    "H&M 连衣裙",
    "李宁跑步鞋",
    "安踏运动服",
  ],
  美妆: [
    "兰蔻粉底液",
    "雅诗兰黛小棕瓶",
    "迪奥香水",
    "完美日记散粉",
    "香奈儿口红",
    "YSL 哑光口红",
  ],
};

// 不同分类的基础价格区间（元）
const priceRangeByCategory = {
  手机: [3000, 9000],
  电脑: [4000, 15000],
  家电: [500, 8000],
  服饰: [50, 800],
  美妆: [50, 1500],
};

// 不同分类的规格选项
const specsByCategory = {
  手机: [
    {
      name: "颜色",
      options: ["黑色", "白色", "蓝色", "金色", "紫色"],
    },
    {
      name: "存储",
      options: ["128GB", "256GB", "512GB"],
    },
  ],
  电脑: [
    {
      name: "内存",
      options: ["16GB", "32GB", "64GB"],
    },
    {
      name: "硬盘",
      options: ["512GB SSD", "1TB SSD", "2TB SSD"],
    },
    {
      name: "显卡",
      options: ["集显", "RTX 4060", "RTX 4070"],
    },
  ],
  服饰: [
    {
      name: "尺寸",
      options: ["S", "M", "L", "XL"],
    },
    {
      name: "颜色",
      options: ["黑色", "白色", "蓝色", "红色", "卡其色"],
    },
  ],
  美妆: [
    {
      name: "容量",
      options: ["15ml", "30ml", "50ml", "100ml"],
    },
  ],
  家电: [
    {
      name: "颜色",
      options: ["白色", "银色", "灰色", "黑色"],
    },
    {
      name: "容量",
      options: ["1.5 匹", "2 匹", "3 匹", "8kg", "10kg"],
    },
  ],
};

// 不同规格的价格加成规则
const priceAddRules = {
  // 手机
  手机: {
    存储: {
      "128GB": 0,
      "256GB": 400,
      "512GB": 1000,
    },
    颜色: {
      黑色: 0,
      白色: 0,
      蓝色: 100,
      金色: 200,
      紫色: 200,
    },
  },

  // 电脑
  电脑: {
    内存: {
      "16GB": 0,
      "32GB": 400,
      "64GB": 800,
    },
    硬盘: {
      "512GB SSD": 0,
      "1TB SSD": 300,
      "2TB SSD": 600,
    },
    显卡: {
      集显: 0,
      "RTX 4060": 1500,
      "RTX 4070": 2500,
    },
  },

  // 服饰（规格不影响价格，这里都设为 0）
  服饰: {
    尺寸: { S: 0, M: 0, L: 0, XL: 0 },
    颜色: {
      黑色: 0,
      白色: 0,
      红色: 0,
      蓝色: 0,
      卡其色: 0,
    },
  },

  // 美妆（容量越大加价越多）
  美妆: {
    容量: {
      "15ml": 0,
      "30ml": 30,
      "50ml": 60,
      "100ml": 120,
    },
  },

  // 家电（容量和颜色略微影响价格）
  家电: {
    容量: {
      "1.5 匹": 0,
      "2 匹": 300,
      "3 匹": 800,
      "8kg": 0,
      "10kg": 300,
    },
    颜色: {
      白色: 0,
      银色: 0,
      灰色: 0,
      黑色: 100,
    },
  },
};

const productList = Mock.mock({
  "data|100": [
    {
      "id|+1": 1,

      category() {
        const keys = Object.keys(namesByCategory);
        return Random.pick(keys);
      },

      name() {
        const pool = namesByCategory[this.category] || ["通用商品"];
        return Random.pick(pool);
      },

      basePrice() {
        const [min, max] = priceRangeByCategory[this.category] || [50, 999];
        return Random.integer(min, max);
      },

      price() {
        const rules = priceAddRules[this.category];
        let minExtra = 0;

        if (rules) {
          Object.keys(rules).forEach((specName) => {
            const adds = Object.values(rules[specName]);
            if (adds.length > 0) {
              const min = Math.min(...adds);
              minExtra += min;
            }
          });
        }

        return this.basePrice + minExtra;
      },

      // ⭐ 评分：1~5 之间，保留 1 位小数
      rating: () => Number((Math.random() * 2 + 3).toFixed(1)),

      sales: () => Random.integer(0, 50000),

      // 缩略图（列表用）
      thumbnail: () => Random.image("200x200", Random.color(), "#fff", "商品"),

      // ⭐ 多张图片（详情页轮播用）
      images() {
        const color = Random.color();
        return [
          Random.image("400x400", color, "#fff", "商品1"),
          Random.image("400x400", Random.color(), "#fff", "商品2"),
          Random.image("400x400", Random.color(), "#fff", "商品3"),
        ];
      },

      description() {
        const descMap = {
          手机: [
            "高清大屏，强劲性能，支持全天候续航，让你畅享流畅体验。",
            "旗舰级影像系统，捕捉每一个精彩瞬间，拍照更清晰。",
            "轻薄机身搭配大容量电池，性能与便携兼顾。",
          ],
          电脑: [
            "高性能处理器和大容量内存，轻松应对游戏与办公需求。",
            "轻薄便携，续航持久，适合商务与学习使用。",
            "专业级散热系统，长时间运行依然稳定流畅。",
          ],
          家电: [
            "节能省电设计，运行稳定，适合家庭日常使用。",
            "智能化操作体验，提升生活便利性。",
            "高效性能，低噪音运行，为你创造舒适生活环境。",
          ],
          服饰: [
            "精选面料，舒适透气，适合日常穿着。",
            "简约时尚设计，百搭潮流单品。",
            "做工精细，穿着舒适，打造优雅风格。",
          ],
          美妆: [
            "轻盈质地易吸收，持久保湿，为肌肤提供细致呵护。",
            "高显色度，持久不脱妆，展现自然好气色。",
            "质地柔滑，气味清新，适合多种肤质使用。",
          ],
        };

        const pool = descMap[this.category] || ["优质商品，值得拥有。"];
        return Random.pick(pool);
      },
      specs() {
        return specsByCategory[this.category] || [];
      },

      priceRules() {
        return priceAddRules[this.category] || {};
      },
    },
  ],
});

// 模拟接口调用，返回 Promise
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productList.data);
    }, 300); // 模拟网络延迟
  });
}

export function fetchProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productList.data.find((item) => item.id === Number(id));
      resolve(product);
    }, 300);
  });
}
