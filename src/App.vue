<template>
  <div id="app" :class="['app-container', backgroundClass]">
    <router-view v-slot="{ Component }">
      <transition name="page-transition" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useGameStore } from './stores/game'

const gameStore = useGameStore()

// 加载保存的游戏状态
gameStore.loadFromStorage()

const backgroundClass = computed(() => {
  return `background-level-${gameStore.backgroundLevel}`
})

// 监听路由变化，保存状态
watch(() => gameStore.backgroundLevel, () => {
  gameStore.saveToStorage()
})
</script>

<style>
@import './assets/styles/main.css';

/* 页面切换动画 - 渐黑渐亮 */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 1.5s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

.page-transition-enter-to,
.page-transition-leave-from {
  opacity: 1;
}
</style>
