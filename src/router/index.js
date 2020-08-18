import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/addpost',
    name: 'AddPost',
    component: () => import('@/views/AddPost.vue')
  },
    {
    path: '/post/:id',
    name: 'post',
    component: () => import('@/views/post.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
