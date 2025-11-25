import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDiaryStore = defineStore('diary', () => {
  const posts = ref([
    {
      id: 1,
      title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        { id: 1, text: "Самый яркий комментарий в этом посте" },
        { id: 2, text: "Один из бессмысленный комментарий в этом посте" }
      ]
    },
    {
      id: 2,
      title: "Краткосрочное вымышленное преломление может выполнять особую роль в   пространстве главной роли игрока ",
      comments: [
        { id: 1, text: "Очень научно и непонятно" }
      ]
    }
  ])

  let nextPostId = 3

  function addPost(title) {
    posts.value.unshift({
      id: nextPostId++,
      title,
      comments: []
    })
  }

  function deletePost(id) {
    posts.value = posts.value.filter(p => p.id !== id)
  }

  function updatePost(id, title) {
    const p = posts.value.find(x => x.id === id)
    if (p) p.title = title
  }

  function addComment(postId, text) {
    const p = posts.value.find(x => x.id === postId)
    if (!p) return
    const nextId = p.comments.length ? Math.max(...p.comments.map(c => c.id)) + 1 : 1
    p.comments.push({ id: nextId, text })
  }

  function deleteComment(postId, commentId) {
    const p = posts.value.find(x => x.id === postId)
    if (!p) return
    p.comments = p.comments.filter(c => c.id !== commentId)
  }

  return { posts, addPost, deletePost, updatePost, addComment, deleteComment }
})
