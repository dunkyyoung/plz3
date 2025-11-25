<template>
  <div class="post-list">
    <form @submit.prevent="addPost" class="add-form">
      <textarea v-model="newTitle" placeholder="Текст поста" required></textarea>
      <div class="row">
        <button type="submit">Добавить пост</button>
      </div>
    </form>

    <div v-if="posts.length === 0" class="empty">Постов пока нет</div>

    <div class="posts">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @delete="removePost"
        @update="updatePost"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDiaryStore } from '../stores/useDiary'
import PostItem from './PostItem.vue'

const store = useDiaryStore()
const newTitle = ref('')

const posts = computed(() => store.posts)

function addPost() {
  if (!newTitle.value.trim()) return
  store.addPost(newTitle.value.trim())
  newTitle.value = ''
}

function removePost(id) {
  store.deletePost(id)
}

function updatePost(payload) {
  store.updatePost(payload.id, payload.title)
}
</script>
