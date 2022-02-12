<template>
  <div class="container">
    <h1>Страница с постами</h1>
    <my-input
    v-model="searchQuery"
    placeholder="Search...."
    />
    <div class="container__btns">
    <my-button @click="showDialog">Создать пост</my-button>
    <my-select 
    v-model="selectedSort"
    :options="sortOptions"
    />
    </div>
    <my-dialog v-model:show="dialogVisible">
    <post-form @create="createPost" />
    </my-dialog>
    <post-list
    :posts="sortedAndSearchedPosts" 
    @remove="removePost"
    v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка ...</div>
  </div>
</template>

<script>
import axios from 'axios'
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import MyButton from './components/UI/MyButton.vue'
import MyDialog from './components/UI/MyDialog.vue'
import MySelect from './components/UI/MySelect.vue'
import MyInput from './components/UI/MyInput.vue'

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ]
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
        this.isPostsLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
          this.posts = response.data
      } catch (error) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => post.title.includes(this.searchQuery))
    }
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
.container__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
