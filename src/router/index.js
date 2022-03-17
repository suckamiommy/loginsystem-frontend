import { createRouter, createWebHistory } from 'vue-router'
import Middleware from '../middlewares/index.js'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      middleware: [Middleware.guest]
    }
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/authorize/github/callback',
        name: 'loginGithub',
        component: () => import('../views/auth/LoginGithubView.vue'),
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/RegisterView.vue'),
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: () => import('../views/auth/ForgotPasswordView.vue'),
        meta: {
          middleware: [Middleware.guest]
        }
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: () => import('../views/auth/ResetPasswordView.vue'),
        meta: {
          middleware: [Middleware.resetPassword]
        }
      },
      {
        path: '/verify-email',
        name: 'verifyEmail',
        component: () => import('../views/auth/VerifyEmailView.vue'),
        meta: {
          middleware: [Middleware.guest]
        }
      }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/pages/DashBoardView.vue'),
        meta: {
          middleware: [Middleware.auth],
          permissions: ['view-asd-dashboard']
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/pages/ProfileView.vue'),
        meta: {
          middleware: [Middleware.auth]
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function nextCheck(context, middleware, index){
  const nextMiddleware = middleware[index];

  if(!nextMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMidd = nextCheck(context, middleware, index+1);

    nextMiddleware({...context, next: nextMidd}); 
  }
}

router.beforeEach((to, from, next) => {
  if(to.meta.middleware){
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const ctx = {
      from,
      next,
      router,
      to
    }

    const nextMiddleware = nextCheck(ctx, middleware, 1);

    return middleware[0]({...ctx, next: nextMiddleware});
  }

  return next();
});

export default router
