<template>
  <div class="content-wrapper">
    <div
      class="content-overlay"
      :class="{ 'fade-out': isTransitioning && transitionPhase === 'out', 'fade-in': isTransitioning && transitionPhase === 'in' }"
    >
      <h2>故事页3</h2>

      <p>
        下午，一年到了末尾，又开始了一年一度的公司年会，在年会上的游戏环节，你和顶头上司分到了一个组，要决出胜负，可你看着老板笨拙的身影，心想，老板真的没什么游戏天赋，于是你决定
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('a')"
        >让老板赢</button>
        <button
          v-if="!hasChoice"
          class="option-btn"
          @click="selectOption('b')"
        >让老板输</button>
        <span v-if="hasChoice">{{ selectedOption === 'a' ? '让老板赢' : '让老板输' }}</span>
      </p>

      <div v-if="hasChoice && showResult" class="story-result">
        <p v-if="selectedOption === 'a'">
          老板很高兴。<br>
          你心想，或许我本来就要追求<span class="lose-text">输</span>呢。你得到了你所追求的结局，那不是一种<span class="win-text">赢</span>吗？
        </p>
        <p v-else>
          老板暗暗看了你一眼。<br>
          你心想，Oh no，孩子们，你真<span class="win-text">赢</span>了吗？
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
  gameStore.saveStoryChoice('story-3', option)

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
  router.push('/story/4')
}

onMounted(() => {
  // 加载保存的选择
  const saved = gameStore.getStoryChoice('story-3')
  if (saved) {
    selectedOption.value = saved
    showResult.value = true
  }
})
</script>
