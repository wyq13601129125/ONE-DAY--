<template>
  <span
    ref="editableRef"
    class="editable-text"
    :class="textClass"
    contenteditable="true"
    @blur="handleBlur"
    @input="handleInput"
    @compositionend="handleCompositionEnd"
  >{{ displayText }}</span>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/game'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: '',
    validator: (value) => ['', 'win', 'lose'].includes(value)
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update'])

const gameStore = useGameStore()
const editableRef = ref(null)
const displayText = ref(props.text)
const isComposing = ref(false)

const textClass = computed(() => {
  const text = displayText.value.trim()
  if (text === '输' || text === '输了') {
    return 'lose-text'
  }
  if (text === '赢' || text === '赢了') {
    return 'win-text'
  }
  return props.type === 'win' ? 'win-text' : props.type === 'lose' ? 'lose-text' : ''
})

// 从 LocalStorage 加载保存的值
const loadSavedValue = () => {
  const saved = localStorage.getItem(`editable_${props.id}`)
  if (saved) {
    displayText.value = saved
    emit('update', saved)
  }
}

const handleInput = (e) => {
  if (!isComposing.value) {
    displayText.value = e.target.innerText
  }
}

const handleCompositionEnd = (e) => {
  isComposing.value = false
  displayText.value = e.target.innerText.trim()
}

const handleBlur = () => {
  const text = displayText.value.trim()
  // 清理可能的拼音残留，只保留中文字符
  const cleanText = text.replace(/[a-zA-Z]+/g, '').trim()
  if (cleanText) {
    displayText.value = cleanText
    // 保存到 LocalStorage
    localStorage.setItem(`editable_${props.id}`, cleanText)
    emit('update', cleanText)
  }
}

// 初始化时加载保存的值
loadSavedValue()

// 监听外部 text 变化（如果需要重置）
watch(() => props.text, (newText) => {
  const saved = localStorage.getItem(`editable_${props.id}`)
  if (!saved) {
    displayText.value = newText
  }
})
</script>

<style scoped>
.editable-text {
  cursor: text;
}

.lose-text {
  color: #0c2d6b;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
}

.win-text {
  color: #d97706;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
}
</style>
