<template>
  <div class="content-wrapper">
    <div
      class="content-overlay"
      :class="{ 'fade-out': isTransitioning && transitionPhase === 'out', 'fade-in': isTransitioning && transitionPhase === 'in' }"
    >
      <h2>故事页2</h2>

      <p>
        哦天哪，终于熬过了上午的工作，你的肚子已经咕咕叫了，于是你来到了公司食堂，开始排队盛饭。你看到旁边那队排的更快，你决定
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('a')"
        >排更快的那队</button>
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('b')"
        >在原队不动</button>
        <span v-if="hasChoice">{{ selectedOption === 'a' ? '排更快的那队' : '在原队不动' }}</span>
      </p>

      <div v-if="hasChoice && showResult" class="story-result">
        <p>最后你比同时来的同事晚了10分钟盛上饭。</p>
        <p v-if="selectedOption === 'a'">算了，我早就意料到我排哪队哪队慢。</p>
        <p v-else>果然当初应该换队的。</p>
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

const selectOption = (option) => {
  selectedOption.value = option
  gameStore.saveStoryChoice('story-2', option)

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
  router.push('/story/3')
}

onMounted(() => {
  // 加载保存的选择
  const saved = gameStore.getStoryChoice('story-2')
  if (saved) {
    selectedOption.value = saved
    showResult.value = true
  }
})
</script>
