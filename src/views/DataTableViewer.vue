<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router';
import {onMounted, ref, watch} from 'vue';
import usePostsApi from '@/composables/usePostsApi';
import BaseModal from "@/components/BaseModal.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseDataTable from "@/components/BaseDataTable.vue";

interface Settings {
  itemsPerPage: number;
  maxVisiblePages: number;
}

const router = useRouter();
const route = useRoute()

const {
  currentPage,
  visiblePages,
  totalPages,
  displayedItems,
  itemsPerPage,
  maxVisiblePages,
  getDataUsers,
  updateVisiblePages,
} = usePostsApi();

const showModal = ref<boolean>(false);

const handleSaveSettings = (settings: Settings): void => {
  itemsPerPage.value = settings.itemsPerPage;
  maxVisiblePages.value = settings.maxVisiblePages;
};

const goToPage = (page: number): void => {
  currentPage.value = page;
  updateVisiblePages();
  router.push({query: {page}});
};

watch(maxVisiblePages, () => {
  updateVisiblePages();
});

watch(
    () => route.query.page,
    (newPage) => {
      if (typeof newPage === "string") {
        const page = parseInt(newPage, 10);
        if (page < 1 || page > totalPages.value) {
          router.replace('/')
        } else {
          currentPage.value = page
        }
      }
    }
);

onMounted(() => {
  getDataUsers()
})
</script>

<template>
  <div class="base-data">
    <button class="base-data__modal-btn" @click="showModal = !showModal">настройки</button>

    <BaseModal v-model="showModal"
               @save-settings="handleSaveSettings"
               :itemsPerPage="itemsPerPage"
               :maxVisiblePages="maxVisiblePages"
    />

    <BaseDataTable :displayed-items="displayedItems"/>

    <BasePagination v-model="currentPage"
                    @go-to-page="goToPage"
                    :visible-pages="visiblePages"
                    :total-pages="totalPages"
    />
  </div>
</template>

<style scoped lang="scss">
.base-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__modal-btn {
    position: absolute;
    right: 50px;
    top: 30px;

    display: flex;
    color: #666B85;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    border: none;
  }

  @media screen and (max-width: 1380px) {
    &__modal-btn {
      display: none;
    }
  }
}

</style>

