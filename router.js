import { createRouter, createWebHistory } from 'vue-router';
import Landing from './src/pages/Landing.vue';
import Register from './src/pages/Register.vue';
import Login from './src/pages/Login.vue';
import Home from './src/pages/Home.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/workouts', name: 'Home', component: Home, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;