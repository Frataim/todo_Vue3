<template>
  <div class="container">
    <h1>Страница с постами</h1>
    <!-- <my-button @click="fetchPosts">Получить посты</my-button> -->
    <my-button @click="showDialog">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
    <post-form @create="createPost" />
    </my-dialog>
    <post-list
    :posts="posts" 
    @remove="removePost"
    />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import MyButton from './components/UI/MyButton.vue'
import MyDialog from './components/UI/MyDialog.vue'
import axios from 'axios'

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog () {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        setTimeout( async() => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
          this.posts = response.data
        }, 1000)
      } catch (error) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  padding: 20px;
}
</style>
