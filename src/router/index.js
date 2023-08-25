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
    path: '/:uid/PersonalInfomation',
    name: 'PersonalInfomation',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalInfomation.vue')
  },
  {
    path: '/:uid/Chatroom',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Chatroom.vue')
  },
  {
    path: '/:uid/GroupPage',
    name: 'GroupPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupPage.vue')
  },
  {
    path: '/:uid/MyProject',
    name: 'MyProject',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyProject.vue')
  },
  {
    path: '/:groupid/:projectid/DesignPage',
    name: 'DesignPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesignPage.vue')
  },
  {
    path: '/:groupid/:projectid/DecomentPage',
    name: 'DecomentPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/DecomentPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
