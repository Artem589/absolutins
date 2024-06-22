import { createRouter, createWebHistory } from 'vue-router'
import DataTableViewer from "@/views/DataTableViewer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pagination',
      component: DataTableViewer,
    }
  ]
})

export default router
