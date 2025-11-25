<template>
  <div class="post">
    <div class="post-main">
      <div class="post-title">{{ post.title }}</div>
      <div class="buttons">
        <button @click="openEdit">Изменить</button>
        <button @click="emitDelete">Удалить</button>
        <button @click="toggleComments">{{ isShow ? 'Скрыть комментарии' : 'Показать комментарии' }}</button>
      </div>
    </div>

    <CommentList v-if="isShow" :comments="post.comments" @add="addComment" @delete="deleteComment" />

    <EditModal v-if="showModal" :initial="post.title" @close="onClose" @save="onSave" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentList from './CommentList.vue'
import EditModal from './EditModal.vue'
import { useDiaryStore } from '../stores/useDiary'

const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['delete','update'])

const showModal = ref(false)
const isShow = ref(false)

const store = useDiaryStore()

function openEdit() {
  showModal.value = true
}

function onClose() {
  showModal.value = false
}

function onSave(newText) {
  emit('update', { id: props.post.id, title: newText })
  showModal.value = false
}

function emitDelete() {
  emit('delete', props.post.id)
}

function toggleComments() {
  isShow.value = !isShow.value
}

function addComment(text) {
  store.addComment(props.post.id, text)
}

function deleteComment(commentId) {
  store.deleteComment(props.post.id, commentId)
}
</script>
