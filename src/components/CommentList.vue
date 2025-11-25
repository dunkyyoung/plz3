<template>
  <div class="comments">
    <div class="add-comment">
      <input v-model="newText" placeholder="Новый комментарий" @keyup.enter="onAdd" />
      <button @click="onAdd">Добавить</button>
    </div>

    <ul>
      <li v-for="c in comments" :key="c.id" class="comment-item">
        <span>{{ c.text }}</span>
        <button @click="$emit('delete', c.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  comments: { type: Array, default: () => [] }
})
const emit = defineEmits(['add','delete'])
const newText = ref('')

function onAdd() {
  if (!newText.value.trim()) return
  emit('add', newText.value.trim())
  newText.value = ''
}
</script>
