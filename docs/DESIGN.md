# ONE DAY - 详细设计文档

## 目录
1. [游戏概念](#游戏概念)
2. [核心机制](#核心机制)
3. [页面结构](#页面结构)
4. [视觉设计](#视觉设计)
5. [技术实现](#技术实现)
6. [数据结构](#数据结构)

---

## 游戏概念

### 主题思想
探讨生活中"输"与"赢"的相对性，通过一天的故事选择和文字修改，让玩家思考：什么是真正的输赢？胜利和失败的意义是什么？

### 目标玩家
- 喜欢思考的文字游戏玩家
- 对哲学思考感兴趣的玩家
- 寻找独特游戏体验的玩家

---

## 核心机制

### 1. 可编辑文字系统

**机制说明**：
- 特定文字（"输"、"赢"）可以点击编辑
- 编辑后文字在游戏剧情中生效
- 不提供明显提示，需要玩家自行发现

**可编辑位置**：
1. **目标页**：目标描述中的"你要赢" → 可改为"你要输"
2. **结局页**：结尾的"你输了" → 可改为"你赢了"（注意："改变"一词中的"输"不可编辑）

**实现要点**：
- 字体、字号与周围文字完全一致
- 鼠标悬停时不显示特殊光标
- 点击触发编辑模式（contenteditable）
- 编辑后保存到状态中

### 2. 通关判定系统

**方式一**：
```
目标页修改 "赢" → "输" → 完成所有选择 → 返回主页 → 触发通关
```

**方式二**：
```
正常游玩 → 结局页修改 "输了" → "赢了" → 返回主页 → 触发通关
```

**状态追踪**：
```javascript
{
  targetModified: boolean,    // 目标页是否修改
  endingModified: boolean,    // 结局页是否修改
  endingsUnlocked: number     // 已解锁的通关方式数量
}
```

### 3. 背景解锁系统

| 背景等级 | 解锁条件 | 图片文件 |
|---------|---------|---------|
| 初始背景 | 游戏开始 | `picture/蓝底水彩哭脸.jpg` |
| 第二背景 | 1种通关方式 | `picture/水彩笑脸改色.jpg` |
| 第三背景 | 2种通关方式 | `picture/哭笑拼接脸.jpg` |

---

## 页面结构

### 页面1: 首页

**布局**：
```
┌─────────────────────────────────────┐
│                                     │
│           ONE DAY                   │
│                                     │
│         [开始游戏]                  │
│                                     │
│     成功通关，好欸！请再仔细读一遍   │  ← 通关后显示
│     全文文本吧，如果能启发您的思考， │
│     那是我的荣幸。                   │
│                                     │
│                          [🏆 成就]   │  ← 右上角按钮
└─────────────────────────────────────┘
```

**元素**：
- 标题："ONE DAY"
- 开始按钮：跳转到目标页
- 成功提示：通关后显示
- 成就按钮：右上角固定位置

### 页面2: 目标页

**内容**：
```
目标：改变你的一天，你要[赢]！  ← [赢]可编辑

[开始这一天]
```

**交互**：
- "赢"字可点击编辑
- 点击按钮进入故事页1

### 页面3-7: 故事页

**页面3：故事页1**
```
故事页1.（早晨起来，你感觉怪怪的，你决定迈（a.左/b.右）脚出卧室门

[选择a] 出了卧室后，你看到孩子说yes我赢了，我就猜你a.左/b.右脚先出门。
[选择b] ...

[下一幕]
```

**特点**：
- 初始只显示选项（a/b）
- 选择后展开对应内容
- 下一幕按钮跳转到下一页

**页面4：故事页2** - 食堂排队
**页面5：故事页3** - 和老板做游戏
**页面6：故事页4** - 跟孩子做游戏
**页面7：故事页5** - 讲道理

### 页面8: 结局页

```
故事页6.你[输]了。恭喜你"改变"了这一天。  ← [输]可编辑

[返回主页]
```

**交互**：
- "输"字可点击编辑（两处）
- 返回按钮：
  - 检查通关条件
  - 触发通关动画/提示
  - 跳转回首页
  - 解锁新背景

### 成就弹窗

```
┌──────────────────────────────┐
│         成就                  │
├──────────────────────────────┤
│                              │
│  [背景1缩略图] ✓              │
│  通关方式：0/2                │
│                              │
│  [?]  ← 未解锁                │
│  通关方式：--                 │
│                              │
│  [?]  ← 未解锁                │
│  通关方式：--                 │
│                              │
│           [关闭]              │
└──────────────────────────────┘
```

---

## 视觉设计

### 配色方案

| 颜色用途 | 色值 | 说明 |
|---------|------|------|
| 输字颜色 | #1E40AF | 深蓝色 |
| 赢字颜色 | #F59E0B | 黄色/金色 |
| 初始背景 | #1E3A8A | 蓝色 |
| 第二背景 | #FEF3C7 | 黄色 |
| 第三背景 | #1E3A8A + #FEF3C7 | 格纹 |

### 字体设计

**"输"字样式**：
```css
.lose-text {
  color: #1E40AF;
  font-weight: bold;
}
```

**"赢"字样式**：
```css
.win-text {
  color: #F59E0B;
  font-weight: bold;
}
```

**可编辑文字**：
```css
.editable-text {
  cursor: text;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.editable-text:hover {
  border-bottom: 1px solid rgba(255,255,255,0.3);
}

.editable-text:focus {
  outline: none;
  border-bottom: 1px solid rgba(255,255,255,0.5);
}
```

### 水彩简笔画风格

**实现方式**：
- SVG 矢量图形
- 透明度控制（0.3-0.5）
- 手绘风格线条
- 随机分布表情

**简笔��类型**：
1. **哭脸**：😢 简笔画（曲线向下）
2. **笑脸**：😊 简笔画（曲线向上）
3. **混合脸**：半哭半笑

---

## 技术实现

### 技术栈

**已选择：Vue.js 3**
- 构建工具：Vite
- 状态管理：Pinia
- 路由：Vue Router

**选择理由**：
- 响应式数据绑定，适合可编辑文字功能
- 组件化开发，代码结构清晰
- 易于状态管理和 LocalStorage 集成
- 轻量级，适合单页面游戏

### 核心功能实现

#### 1. 可编辑文字组件

```javascript
// Vue.js 示例
<template>
  <span
    ref="editableRef"
    class="editable-text"
    :class="textType"
    contenteditable="true"
    @input="handleEdit"
    @blur="handleBlur"
  >
    {{ currentText }}
  </span>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['text', 'textType', 'id'])
const emit = defineEmits(['update'])

const currentText = ref(props.text)
const editableRef = ref(null)

const handleEdit = (e) => {
  currentText.value = e.target.innerText
  emit('update', { id: props.id, text: currentText.value })
}

const handleBlur = () => {
  // 失去焦点时保存
  editableRef.value?.blur()
}
</script>
```

#### 2. 通关判定逻辑

```javascript
// 通关状态管理
const gameState = {
  // 页面2：目标页修改状态
  targetModified: false,

  // 页面8：结局页修改状态
  endingModified: false,

  // 已解锁的通关方式
  endingsUnlocked: 0,

  // 当前背景等级
  backgroundLevel: 0,

  // 故事选择记录
  storyChoices: [],

  // 检查通关
  checkWinCondition() {
    let newUnlock = 0

    // 方式一：目标页改为"输"
    if (this.targetModified) {
      newUnlock++
    }

    // 方式二：结局页改为"赢"
    if (this.endingModified) {
      newUnlock++
    }

    // 更新解锁状态
    if (newUnlock > this.endingsUnlocked) {
      this.endingsUnlocked = newUnlock
      this.updateBackground()
      return true // 新解锁
    }

    return newUnlock > 0 // 已通关
  },

  // 更新背景
  updateBackground() {
    this.backgroundLevel = Math.min(this.endingsUnlocked, 2)
    this.saveToStorage()
  },

  // 保存到本地存储
  saveToStorage() {
    localStorage.setItem('oneDayGameState', JSON.stringify({
      endingsUnlocked: this.endingsUnlocked,
      backgroundLevel: this.backgroundLevel
    }))
  },

  // 从本地存储加载
  loadFromStorage() {
    const saved = localStorage.getItem('oneDayGameState')
    if (saved) {
      const data = JSON.parse(saved)
      this.endingsUnlocked = data.endingsUnlocked || 0
      this.backgroundLevel = data.backgroundLevel || 0
    }
  }
}
```

#### 3. 故事页面组件

```javascript
// 故事数据结构
const stories = [
  {
    id: 1,
    title: "故事页1",
    content: "早晨起来，你感觉怪怪的，你决定迈",
    options: [
      {
        key: "a",
        text: "左",
        result: "出了卧室后，你看到孩子说yes我赢了，我就猜你左脚先出门。"
      },
      {
        key: "b",
        text: "右",
        result: "出了卧室后..."
      }
    ]
  },
  // ... 其他故事
]

// 故事页面组件
<template>
  <div class="story-page">
    <h2>{{ story.title }}</h2>
    <p class="story-content">
      {{ story.content }}（
      <button
        v-for="opt in story.options"
        :key="opt.key"
        @click="selectOption(opt)"
        :class="{ selected: selectedOption === opt.key }"
      >
        {{ opt.key }}.{{ opt.text }}
      </button>
      ）
    </p>

    <div v-if="showResult" class="story-result">
      {{ selectedResult }}
    </div>

    <button
      v-if="showResult"
      @click="nextPage"
      class="next-button"
    >
      下一幕
    </button>
  </div>
</template>
```

#### 4. 成就弹窗组件

```javascript
<template>
  <div class="achievement-modal" v-if="isOpen">
    <div class="modal-content">
      <h2>成就</h2>

      <div class="achievement-item" v-for="(bg, index) in backgrounds" :key="index">
        <div class="thumbnail" :class="{ unlocked: index <= backgroundLevel }">
          <span v-if="index <= backgroundLevel">{{ bg.icon }}</span>
          <span v-else>?</span>
        </div>

        <div class="achievement-info">
          <div class="achievement-name">{{ bg.name }}</div>
          <div class="achievement-progress">
            通关方式：{{ index === 0 ? '0/2' : index === 1 ? '1/2' : '2/2' }}
          </div>
        </div>
      </div>

      <button @click="close" class="close-button">关闭</button>
    </div>
  </div>
</template>
```

---

## 数据结构

### 故事数据完整定义

```javascript
const storyData = {
  page2: { // 目标页
    id: "target",
    content: "目标：改变你的一天，你要",
    editableWord: {
      id: "target-word",
      text: "赢",
      type: "win"
    },
    buttonText: "开始这一天"
  },

  page3: { // 故事页1：早晨出门
    id: "story-1",
    title: "故事页1",
    content: "早晨起来，你感觉怪怪的，你决定迈",
    options: [
      {
        key: "a",
        text: "左",
        displayText: "左脚",
        result: "出了卧室后，你看到孩子说：yes我赢了，我就猜你左脚先出门。\n你无奈笑了笑，心想，这种输赢根本就没有意义。虽然但是，你得赶紧挤着早高峰的地铁去上班了。"
      },
      {
        key: "b",
        text: "右",
        displayText: "右脚",
        result: "出了卧室后，你看到孩子说：yes我赢了，我就猜你右脚先出门。\n你无奈笑了笑，心想，这种输赢根本就没有意义。虽然但是，你得赶紧挤着早高峰的地铁去上班了。"
      }
    ],
    buttonText: "下一幕",
    nextPage: "story-2"
  },

  page4: { // 故事页2：食堂排队
    id: "story-2",
    title: "故事页2",
    content: "哦天哪，终于熬过了上午的工作，你的肚子已经咕咕叫了，于是你来到了公司食堂，开始排队盛饭。你看到旁边那队排的更快，你决定",
    options: [
      {
        key: "a",
        text: "排更快的那队",
        result: "最后你比同时来的同事晚了10分钟盛上饭。\n算了，我早就意料到我排哪队哪队慢。"
      },
      {
        key: "b",
        text: "在原队不动",
        result: "最后你比同时来的同事晚了10分钟盛上饭。\n果然当初应该换队的。"
      }
    ],
    buttonText: "下一幕",
    nextPage: "story-3"
  },

  page5: { // 故事页3：年会游戏
    id: "story-3",
    title: "故事页3",
    content: "下午，一年到了末尾，又开始了一年一度的公司年会，在年会上的游戏环节，你和顶头上司分到了一个组，要决出胜负，可你看着老板笨拙的身影，心想，老板真的没什么游戏天赋，于是你决定",
    options: [
      {
        key: "a",
        text: "让老板赢",
        result: "老板很高兴。\n你心想，或许我本来就要追求输呢。你得到了你所追求的结局，那不是一种赢吗？"
      },
      {
        key: "b",
        text: "让老板输",
        result: "老板暗暗看了你一眼。\n你心想，Oh no，孩子们，你真赢了吗？"
      }
    ],
    buttonText: "下一幕",
    nextPage: "story-4"
  },

  page6: { // 故事页4：与孩子游戏
    id: "story-4",
    title: "故事页4",
    content: "晚上，终于，你拖着疲惫的身躯回到了家，孩子拉着你要跟你玩，在幼儿园学到的新游戏，游戏是一共有21颗糖，每人每次能拿一到三颗，轮流拿，谁拿到最后一个谁就输了，5局3胜，你已经连赢了两局，第3局，孩子眼见要输了，已经露出了委屈的小脸",
    options: [
      {
        key: "a",
        text: "不能惯着他，让他输",
        result: "你的孩子在积分的小黑板上把输字改成赢字，他说他赢了，可他却不想继续玩了。"
      },
      {
        key: "b",
        text: "算了吧，让他赢",
        result: "看着孩子喜笑颜开，但你感觉这好像是你教育的上的输。"
      }
    ],
    buttonText: "下一幕",
    nextPage: "story-5"
  },

  page7: { // 故事页5：讲道理
    id: "story-5",
    title: "故事页5",
    content: "你想了想，又跟他讲了许多道理，他似懂非懂，将小黑板上的输字改为赢字，又将赢字改为输字……算了，如果能从游戏中获得启发，这又何尝不算一种赢呢？你怀着怪异的心情入睡。",
    options: [],
    buttonText: "下一幕",
    nextPage: "ending"
  },

  page8: { // 结局页
    id: "ending",
    title: "故事页6",
    content: "你",
    editableWord: {
      id: "ending-word",
      text: "输了",
      type: "lose"
    },
    endingText: "。恭喜你\"改变\"了这一天。",
    buttonText: "返回主页"
  }
}
```

### 游戏状态管理

```javascript
interface GameState {
  // 页面导航
  currentPage: number

  // 编辑状态
  edits: {
    [key: string]: string  // id: editedText
  }

  // 故事选择
  choices: {
    [storyId: string]: string  // storyId: selectedOption
  }

  // 通关状态
  endingsUnlocked: number  // 0, 1, 2
  backgroundLevel: number  // 0, 1, 2

  // 成就状态
  achievements: {
    unlocked: boolean[]
  }
}
```

### 背景配置

```javascript
const backgrounds = [
  {
    level: 0,
    name: "初始背景",
    color: "#1E3A8A", // 蓝色
    drawColor: "rgba(30, 64, 175, 0.3)", // 深蓝色半透明
    faceType: "sad", // 哭脸
    unlocked: true
  },
  {
    level: 1,
    name: "笑脸背景",
    color: "#FEF3C7", // 黄色
    drawColor: "rgba(245, 158, 11, 0.3)", // 橙色半透明
    faceType: "happy", // 笑脸
    unlocked: false
  },
  {
    level: 2,
    name: "混合背景",
    color: "checkered", // 黄蓝格子
    drawColor: "mixed",
    faceType: "mixed", // 混合表情
    unlocked: false
  }
]
```

---

## 路由设计

```javascript
const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/target', component: TargetPage, name: 'target' },
  { path: '/story/1', component: StoryPage1, name: 'story-1' },
  { path: '/story/2', component: StoryPage2, name: 'story-2' },
  { path: '/story/3', component: StoryPage3, name: 'story-3' },
  { path: '/story/4', component: StoryPage4, name: 'story-4' },
  { path: '/story/5', component: StoryPage5, name: 'story-5' },
  { path: '/ending', component: EndingPage, name: 'ending' }
]
```

---

## 交互流程图

```
开始
 ↓
[首页] → [成就弹窗]
 ↓
[目标页] → 编辑"赢"字?
 ↓
[故事1] → 选择a/b → 展开结果 → [下一幕]
 ↓
[故事2] → 选择 → 展开结果 → [下一幕]
 ↓
[故事3] → 选择 → 展开结果 → [下一幕]
 ↓
[故事4] → 选择 → 展开结果 → [下一幕]
 ↓
[故事5] → 无选择 → [下一幕]
 ↓
[结局页] → 编辑"输"字?
 ↓
[返回主页] → 检查通关条件
 ↓
    ├─ 首次通关 → 解锁背景2 → 显示通关提示
    ├─ 二次通关 → 解锁背景3 → 显示通关提示
    └─ 未通关 → 返回首页
```

---

## 性能优化

1. **图片资源**：
   - 使用 SVG 而非位图
   - 懒加载背景图案
   - CSS 绘制简单图形

2. **状态管理**：
   - 使用 LocalStorage 缓存进度
   - 避免不必要的重渲染

3. **响应式设计**：
   - 移动端适配
   - 平板/桌面端优化

---

## 测试要点

- [ ] 可编辑文字功能正常
- [ ] 两种通关方式都能触发
- [ ] 背景正确解锁和切换
- [ ] 成就弹窗显示正确
- [ ] LocalStorage 正确保存/读取
- [ ] 各浏览器兼容性测试
- [ ] 移动端触摸操作测试

---

## 开发计划

### 阶段1：基础框架（1-2天）
- [ ] 项目初始化
- [ ] 路由设置
- [ ] 基础页面布局

### 阶段2：核心功能（2-3天）
- [ ] 可编辑文字组件
- [ ] 故事页面组件
- [ ] 通关判定逻辑

### 阶段3：视觉设计（2-3天）
- [ ] 背景图案设计
- [ ] 水彩简笔画制作
- [ ] 配色方案实现

### 阶段4：测试优化（1-2天）
- [ ] 功能测试
- [ ] 性能优化
- [ ] 跨浏览器测试

### 阶段5：发布（1天）
- [ ] 构建部署
- [ ] 文档完善
- [ ] 发布上线

**预计总时间**：7-11 天

---

## 附录

### 可编辑文字位置汇总

| 页面 | 位置 | 原文 | 可改为 |
|-----|------|------|--------|
| 目标页 | 目标描述 | "你要赢" | "你要输" |
| 结局页 | 结局描述 | "你输了" | "你赢了" |

### 故事文本完整版本

（已在数据结构章节中完整列出）

---

**文档版本**：v1.0
**最后更新**：2026-01-30
**作者**：[待填写]
