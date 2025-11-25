<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h3>Редактирование поста</h3>
      <textarea v-model="text"></textarea>
      <div class="modal-actions">
        <button @click="close">Закрыть</button>
        <button @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  initial: { type: String, default: '' }
})
const emit = defineEmits(['close','save'])

const text = ref(props.initial)

function close() {
  emit('close')
}

function save() {
  emit('save', text.value)
}
</script>
