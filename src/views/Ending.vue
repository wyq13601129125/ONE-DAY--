<template>
  <div class="content-wrapper">
    <div class="content-overlay">
      <h2>故事页6</h2>

      <p class="ending-text">
        你
        <EditableText
          id="ending-word"
          :text="gameStore.endingText"
          type="lose"
          @update="handleTextUpdate"
        />
        。恭喜你"改变"了这一天。
      </p>

      <button class="btn btn-primary btn-large" @click="goHome" style="margin-top: 40px;">
        返回主页
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import EditableText from '@/components/EditableText.vue'

const router = useRouter()
const gameStore = useGameStore()

const handleTextUpdate = (text) => {
  // 保存修改的文字
  gameStore.endingText = text
  gameStore.saveToStorage()
}

const goHome = () => {
  // 检查通关条件并更新背景
  gameStore.checkWinCondition()

  // 重置故事选项，允许重新游玩
  gameStore.resetOptions()

  // 跳转回主页
  router.push('/')
}
</script>

<style scoped>
.ending-text {
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
}
</style>
