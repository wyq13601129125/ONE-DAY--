<template>
  <div class="content-wrapper">
    <div class="content-overlay">
      <!-- 成就按钮 -->
      <button class="achievement-btn" @click="showAchievement = true">
        🏆 成就
      </button>

      <!-- 标题 -->
      <h1>ONE DAY</h1>

      <!-- 开始按钮 -->
      <button class="btn btn-primary btn-large" @click="startGame">
        开始游戏
      </button>

      <!-- 通关成功提示 -->
      <div v-if="gameStore.showSuccessMessage && gameStore.hasCompleted" class="success-message">
        成功通关，好欸！请再仔细读一遍全文文本吧，如果能启发您的思考，那是我的荣幸。
      </div>
    </div>

    <!-- 成就弹窗 -->
    <AchievementModal v-if="showAchievement" @close="showAchievement = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import AchievementModal from '@/components/AchievementModal.vue'

const router = useRouter()
const gameStore = useGameStore()
const showAchievement = ref(false)

const startGame = () => {
  router.push('/target')
}

onMounted(() => {
  // 首页加载时确保状态同步
  gameStore.loadFromStorage()
})
</script>

<style scoped>
.content-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-overlay {
  position: relative;
}

.achievement-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.achievement-btn:hover {
  background: white;
  transform: scale(1.05);
}

h1 {
  margin-top: 60px;
  margin-bottom: 40px;
}

.btn-large {
  display: block;
  margin: 0 auto;
}
</style>
