import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requireAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {redirectIfAuth: true}
    },
    {
      path: '/admin/usuario',
      name: 'Usuario',
      component: () => import('../views/admin/Usuario.vue'),
      meta: {requireAuth: true}
    }
  ]
})

// Guards
router.beforeEach((to, from, next) => {
  // console.log("TO: ", to);
  // console.log("FROM: ", from);
  let token = localStorage.getItem("access_token");

  if(to.meta.requireAuth){
    if(!token){
      return next({name: 'Login'})
    }
    return next();
  }

  if(to.meta.redirectIfAuth && token){
    return next({name: 'about'})
  }

  return next();
});

export default router
