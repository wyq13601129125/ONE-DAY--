<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>🏆 成就</h2>

      <div
        v-for="(bg, index) in backgrounds"
        :key="index"
        class="achievement-item"
      >
        <div
          class="achievement-thumbnail"
          :class="{ locked: isLocked(index) }"
          :style="!isLocked(index) ? { backgroundImage: `url(${bg.image})` } : {}"
        >
          <span v-if="isLocked(index)">?</span>
        </div>

        <div class="achievement-info">
          <div class="achievement-name">{{ bg.name }}</div>
          <div class="achievement-progress">通关方式：{{ bg.progress }}</div>
        </div>
      </div>

      <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" @click="$emit('close')">
        关闭
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const backgrounds = [
  {
    name: '哭脸背景',
    image: '/picture/蓝底水彩哭脸.jpg',
    progress: '0/2'
  },
  {
    name: '笑脸背景',
    image: '/picture/水彩笑脸改色.jpg',
    progress: '1/2'
  },
  {
    name: '混合背景',
    image: '/picture/哭笑拼接脸.jpg',
    progress: '2/2'
  }
]

// 判断成就是否锁定
// index 0（哭脸）：始终不锁定
// index 1（笑脸）：通关过1次就解锁
// index 2（混合）：通关过2次就解锁
const isLocked = (index) => {
  if (index === 0) return false // 哭脸始终解锁
  if (index === 1) return gameStore.endingsUnlocked < 1 // 需要至少通关1次
  if (index === 2) return gameStore.endingsUnlocked < 2 // 需要至少通关2次
  return true
}
</script>

<style scoped>
.modal-content h2 {
  text-align: center;
  margin-bottom: 24px;
}

.achievement-info {
  flex: 1;
}

.achievement-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.achievement-progress {
  font-size: 14px;
  color: #666;
}
</style>
