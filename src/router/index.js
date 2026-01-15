import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '../views/Cagnottes.vue'
import CagnottesNew from '../views/CagnottesNew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cagnottes',
      component: Cagnottes
    },
    {
      path: '/cagnottes/new',
      name: 'cagnottes-new',
      component: CagnottesNew
    },
    {
      path: '/cagnottes/:id',
      name: 'cagnotte-detail',
      component: () => import('../views/CagnotteDetail.vue')
    }
  ]
})

export default router
