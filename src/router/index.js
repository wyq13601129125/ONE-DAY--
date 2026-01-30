import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/target',
    name: 'target',
    component: () => import('@/views/Target.vue')
  },
  {
    path: '/story/1',
    name: 'story-1',
    component: () => import('@/views/Story1.vue')
  },
  {
    path: '/story/2',
    name: 'story-2',
    component: () => import('@/views/Story2.vue')
  },
  {
    path: '/story/3',
    name: 'story-3',
    component: () => import('@/views/Story3.vue')
  },
  {
    path: '/story/4',
    name: 'story-4',
    component: () => import('@/views/Story4.vue')
  },
  {
    path: '/story/5',
    name: 'story-5',
    component: () => import('@/views/Story5.vue')
  },
  {
    path: '/ending',
    name: 'ending',
    component: () => import('@/views/Ending.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
