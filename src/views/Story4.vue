<template>
  <div class="content-wrapper">
    <div
      class="content-overlay"
      :class="{ 'fade-out': isTransitioning && transitionPhase === 'out', 'fade-in': isTransitioning && transitionPhase === 'in' }"
    >
      <h2>故事页4</h2>

      <p>
        晚上，终于，你拖着疲惫的身躯回到了家，孩子拉着你要跟你玩，在幼儿园学到的新游戏，游戏是一共有21颗糖，每人每次能拿一到三颗，轮流拿，谁拿到最后一个谁就<span class="lose-text">输</span>了，5局3<span class="win-text">赢</span>，你已经连<span class="win-text">赢</span>了两局，第3局，孩子眼见要<span class="lose-text">输</span>了，已经露出了委屈的小脸
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('a')"
        >不能惯着他，让他输</button>
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('b')"
        >算了吧，让他赢</button>
        <span v-if="hasChoice">{{ selectedOption === 'a' ? '不能惯着他，让他输' : '算了吧，让他赢' }}</span>
      </p>

      <div v-if="hasChoice && showResult" class="story-result">
        <p v-if="selectedOption === 'a'">
          你的孩子在积分的小黑板上把<span class="lose-text">输</span>字改成<span class="win-text">赢</span>字，他说他<span class="win-text">赢</span>了，可他却不想继续玩了。
        </p>
        <p v-else>
          看着孩子喜笑颜开，但你感觉这好像是你教育的上的<span class="lose-text">输</span>。
        </p>
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
  gameStore.saveStoryChoice('story-4', option)

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
  router.push('/story/5')
}

onMounted(() => {
  // 加载保存的选择
  const saved = gameStore.getStoryChoice('story-4')
  if (saved) {
    selectedOption.value = saved
    showResult.value = true
  }
})
</script>
