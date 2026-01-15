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
      component: () => import('../views/CagnotteDetail.vue'),
      redirect: to => `/cagnottes/${to.params.id}/infos`,
      children: [
        {
          path: 'infos',
          name: 'cagnotte-infos',
          component: () => import('../views/CagnotteInfos.vue')
        },
        {
          path: 'donations',
          name: 'cagnotte-donations',
          component: () => import('../views/Donations.vue')
        }
      ]
    },
    {
      path: '/cagnottes/:id/edit',
      name: 'cagnotte-edit',
      component: () => import('../views/CagnotteEdit.vue')
    }
  ]
})

export default router
