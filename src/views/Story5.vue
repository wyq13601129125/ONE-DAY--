<template>
  <div class="content-wrapper">
    <div class="content-overlay">
      <h2>故事页5</h2>

      <p>
        你想了想，又跟他讲了许多道理，他似懂非懂，将小黑板上的<span class="lose-text">输</span>字改为<span class="win-text">赢</span>字，又将<span class="win-text">赢</span>字改为<span class="lose-text">输</span>字……算了，如果能从游戏中获得启发，这又何尝不算一种<span class="win-text">赢</span>呢？你怀着怪异的心情入睡。
      </p>

      <button class="btn btn-primary" @click="nextPage" style="margin-top: 20px;">
        下一幕
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const nextPage = () => {
  router.push('/ending')
}
</script>
