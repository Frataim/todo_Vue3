<template>
  <div>
    <div class="post">
      <div>
      <div>{{post.id}} likes = {{$store.state.likes}}</div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
      </div>
      <div class post_buttons>
        <my-button
        @click="$router.push(`/posts/${post.id}`)"
        >
        Open
        </my-button>
        <my-button
        @click="$emit('remove', post)"
        >
        Delete
        </my-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue'
  export default {
    components: { MyButton },
    props: {
      post: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>
.post {
  padding: 15px;
  margin-top: 15px;
  border: 3px solid teal;
  display:flex;
  align-items: center;
  justify-content: space-between;
}

.post_buttons {
  display: flex;
}
</style>
