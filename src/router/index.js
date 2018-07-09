import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Friends from '@/components/Friends'
import NewDrawing from '@/components/NewDrawing'
import Drawing from '@/components/Drawing'
import {auth} from '@/lib/fire'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-drawing',
      name: 'NewDrawing',
      component: NewDrawing,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/drawing/',
      name: 'Drawing',
      props: true,
      component: Drawing,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('dashboard')
  else next()
})

export default router
