<template>
  <div class="content-wrapper">
    <div class="content-overlay">
      <h2>目标</h2>

      <p class="target-text">
        改变你的一天，你要
        <EditableText
          id="target-word"
          :text="gameStore.targetText"
          type="win"
          @update="handleTextUpdate"
        />
        ！
      </p>

      <button class="btn btn-primary btn-large" @click="startStory" style="margin-top: 40px;">
        开始这一天
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
  gameStore.targetText = text
  gameStore.saveToStorage()
}

const startStory = () => {
  router.push('/story/1')
}
</script>

<style scoped>
.target-text {
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
}
</style>
