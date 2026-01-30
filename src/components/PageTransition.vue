<template>
  <transition name="page-fade">
    <slot />
  </transition>
</template>

<script setup>
</script>

<style>
/* 页面切换动画 - 渐黑渐亮 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

.page-fade-enter-to,
.page-fade-leave-from {
  opacity: 1;
}
</style>
