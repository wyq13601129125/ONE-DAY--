<template>
  <div class="content-wrapper">
    <div
      class="content-overlay"
      :class="{ 'fade-out': isTransitioning && transitionPhase === 'out', 'fade-in': isTransitioning && transitionPhase === 'in' }"
    >
      <h2>故事页1</h2>

      <p>
        早晨起来，你感觉怪怪的，你决定迈
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('a')"
        >a.左</button>
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('b')"
        >b.右</button>
        <span v-if="hasChoice">{{ footText }}</span>
        脚出卧室门
      </p>

      <div v-if="hasChoice && showResult" class="story-result">
        <p>出了卧室后，你看到孩子说：yes我赢了，我就猜你{{ footText }}脚先出门。</p>
        <p>你无奈笑了笑，心想，这种<span class="lose-text">输</span><span class="win-text">赢</span>根本就没有意义。虽然但是，你得赶紧挤着早高峰的地铁去上班了。</p>
      </div>

      <button v-if="hasChoice && showResult" class="btn btn-primary" @click="nextPage" style="margin-top: 20px;">
        下一幕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const gameStore = useGameStore()

const selectedOption = ref(null)
const showResult = ref(false)
const isTransitioning = ref(false)
const transitionPhase = ref('out')

const hasChoice = computed(() => {
  return !!selectedOption.value
})

const footText = computed(() => {
  return selectedOption.value === 'a' ? '左' : '右'
})

const selectOption = (option) => {
  selectedOption.value = option
  gameStore.saveStoryChoice('story-1', option)

  // 开始转场动画 - 淡出
  isTransitioning.value = true
  transitionPhase.value = 'out'

  // 0.8秒后（淡出完成后），显示结果并淡入
  setTimeout(() => {
    showResult.value = true
    transitionPhase.value = 'in'

    // 再过0.8秒后（淡入完成后），移除转场状态
    setTimeout(() => {
      isTransitioning.value = false
    }, 800)
  }, 800)
}

const nextPage = () => {
  router.push('/story/2')
}

onMounted(() => {
  // 加载保存的选择
  const saved = gameStore.getStoryChoice('story-1')
  if (saved) {
    selectedOption.value = saved
    showResult.value = true
  }
})
</script>
