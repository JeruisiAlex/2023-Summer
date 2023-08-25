import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LoginAndRegister',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginAndRegister.vue')
  },
  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResetPassword.vue')
  },
  {
    path: '/PersonalInfomation',
    name: 'PersonalInfomation',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalInfomation.vue')
  },
  {
    path: '/Chatroom',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Chatroom.vue')
  },
  {
    path: '/:uid/GroupPage',
    name: 'GroupPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupPage.vue')
  },
  {
    path: '/MyProject',
    name: 'MyProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyProject.vue')
  },
  {
    path: '/DesignPage',
    name: 'DesignPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesignPage.vue')
  },
  {
    path: '/DecomentPage',
    name: 'DecomentPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/DecomentPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
