import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // 编辑状态 - 记录实际文字内容
  const targetText = ref('赢')
  const endingText = ref('输了')

  // 通关状态
  const hasCompleted = ref(false)
  const backgroundLevel = ref(0)

  // 解锁状态 - 追踪解锁了多少种通关方式（0, 1, 2）
  const endingsUnlocked = ref(0)

  // 故事选择记录
  const storyChoices = ref({})

  // 通关成功提示
  const showSuccessMessage = ref(false)

  // 检查是否修改为目标"输"
  const checkTargetModified = (text) => {
    return text === '输'
  }

  // 检查是否修改为结局"赢"
  const checkEndingModified = (text) => {
    return text === '赢' || text === '赢了'
  }

  // 计算已解锁的通关方式数量
  const calculateUnlockedCount = () => {
    let count = 0
    const targetIsLose = targetText.value === '输'
    const endingIsWin = endingText.value === '赢' || endingText.value === '赢了'

    // 方式一：目标页改为"输"
    if (targetIsLose) {
      count++
    }

    // 方式二：结局页改为"赢"
    if (endingIsWin) {
      count++
    }

    return count
  }

  // 计算背景等级
  const calculateBackground = () => {
    // 未通关，始终为哭脸背景
    if (!hasCompleted.value) {
      return 0
    }

    // 已通关，根据两个位置的文字决定背景
    const targetIsLose = targetText.value === '输'
    const endingIsWin = endingText.value === '赢' || endingText.value === '赢了'

    // 两个都是"赢" → 笑脸背景
    if (!targetIsLose && endingIsWin) {
      return 1
    }

    // 两个都是"输" → 哭脸背景
    if (targetIsLose && !endingIsWin) {
      return 0
    }

    // 一个赢一个输 → 混合背景
    return 2
  }

  // 检查通关条件
  const checkWinCondition = () => {
    const targetIsLose = targetText.value === '输'
    const endingIsWin = endingText.value === '赢' || endingText.value === '赢了'

    // 只要有一个被修改就认为通关了
    const justCompleted = (targetIsLose || endingIsWin) && !hasCompleted.value

    if (justCompleted) {
      hasCompleted.value = true
    }

    // 更新解锁计数（只增不减）
    const newUnlockedCount = calculateUnlockedCount()
    if (newUnlockedCount > endingsUnlocked.value) {
      endingsUnlocked.value = newUnlockedCount
    }

    // 更新背景
    const newBackgroundLevel = calculateBackground()
    if (newBackgroundLevel !== backgroundLevel.value) {
      backgroundLevel.value = newBackgroundLevel
      saveToStorage()
      if (hasCompleted.value) {
        showSuccessMessage.value = true
      }
      return true // 背景有变化
    }

    return hasCompleted.value
  }

  // 更新背景
  const updateBackground = () => {
    backgroundLevel.value = calculateBackground()
  }

  // 保存到本地存储
  const saveToStorage = () => {
    const data = {
      hasCompleted: hasCompleted.value,
      backgroundLevel: backgroundLevel.value,
      endingsUnlocked: endingsUnlocked.value,
      targetText: targetText.value,
      endingText: endingText.value,
      storyChoices: storyChoices.value
    }
    localStorage.setItem('oneDayGameState', JSON.stringify(data))
  }

  // 从本地存储加载
  const loadFromStorage = () => {
    const saved = localStorage.getItem('oneDayGameState')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        hasCompleted.value = data.hasCompleted || false
        backgroundLevel.value = data.backgroundLevel || 0
        endingsUnlocked.value = data.endingsUnlocked || 0
        targetText.value = data.targetText || '赢'
        endingText.value = data.endingText || '输了'
        storyChoices.value = data.storyChoices || {}
      } catch (e) {
        console.error('加载游戏状态失败:', e)
      }
    }
  }

  // 重置游戏选项（返回主页时调用）
  const resetOptions = () => {
    storyChoices.value = {}
    // 不重置通关状态和文字编辑状态
    saveToStorage()
  }

  // 完全重置游戏
  const resetGame = () => {
    targetText.value = '赢'
    endingText.value = '输了'
    hasCompleted.value = false
    backgroundLevel.value = 0
    endingsUnlocked.value = 0
    storyChoices.value = {}
    showSuccessMessage.value = false
    localStorage.removeItem('oneDayGameState')
  }

  // 保存故事选择
  const saveStoryChoice = (storyId, choice) => {
    // 如果已经选过，不允许修改
    if (storyChoices.value[storyId]) {
      return
    }
    storyChoices.value[storyId] = choice
    saveToStorage()
  }

  // 获取故事选择
  const getStoryChoice = (storyId) => {
    return storyChoices.value[storyId]
  }

  // 检查故事选项是否已选择
  const hasStoryChoice = (storyId) => {
    return !!storyChoices.value[storyId]
  }

  return {
    // 状态
    targetText,
    endingText,
    hasCompleted,
    backgroundLevel,
    endingsUnlocked,
    storyChoices,
    showSuccessMessage,

    // 方法
    checkTargetModified,
    checkEndingModified,
    checkWinCondition,
    updateBackground,
    saveToStorage,
    loadFromStorage,
    resetGame,
    resetOptions,
    saveStoryChoice,
    getStoryChoice,
    hasStoryChoice
  }
})
