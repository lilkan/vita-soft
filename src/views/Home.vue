<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <div class="row">
        <div v-for="(post, idx) in posts" class="col s3 m12">
          <div class="card blue-grey darken-1">
            <div class="card-image">
              <img alt="img" src="https://loremflickr.com/640/360">
              <router-link tag="span" class="card-title pointer" :to="{name: 'post', params: { id: post.id }}">{{post.title}}</router-link>
            </div>
            <div class="card-content white-text">
              <span class="card-title">{{post.description}}</span>
            </div>
            <div class="card-action">
              <router-link tag="a" :to="{name: 'post', params: { id: post.id }}">Колличество комментариев {{post.commentary.length}}</router-link>
              <a @click.prevent="deletePost(post.id, idx)" class="waves-effect waves-light btn">Удалить пост</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data(){
    return{
      posts: []
    }
  },
  methods: {
    deletePost(id, idx){
      localStorage.removeItem(id);
      this.posts.splice(idx, 1)
    }
  },
  mounted() {
    for(let key in localStorage){
      if (!localStorage.hasOwnProperty(key)){
        continue;
      }
      try {
      this.posts.push(JSON.parse(localStorage.getItem(key)))}
      catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" >
  .card .card-title.pointer{
    cursor: pointer;
    width: 100%;
    background-color: #0303039c;
    margin: 0;
    font-size: 40px;
  }

</style>
