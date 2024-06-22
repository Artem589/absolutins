<script setup lang="ts">
interface Props {
  visiblePages: number[];
  totalPages: number;
  // goToPage: Function;
  modelValue: number;
}

const props = defineProps<Props>();

const emit = defineEmits(['go-to-page'])
const goToPage = (params:number) => {
  emit('go-to-page', params)
}
</script>

<template>
  <div class="pagination">
    <div class="pagination__buttons">
        <button class="pagination__item" @click="goToPage(1)">Первая</button>
        <button
            v-for="(page,i) in visiblePages"
            :key="i"
            class="pagination__item"
            :class="{ 'pagination__item--active': modelValue === page }"
            @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button class="pagination__item" @click="goToPage(totalPages)">Последняя</button>
      </div>
  </div>
</template>

<style scoped lang="scss">

.pagination {
  display: inline-block;
  
  &__buttons {
    background: #fff;
    margin: 0px;
    padding: 10px;
    display: flex;
    gap: 5px;

    align-items: center;
    border: none;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    align-content: center;
    border-radius: 14px;
  }
  
  &__item {
    display: flex;
    color: #666B85;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    border: none;

    &:hover {
      color: #333333;
      background-color: #e9e9e9;
      border: none;
    }
  }

  &__item--active {
    background-color: #60d394 !important;
    color: white !important;
    &:hover {
      border: none;
    }
  }
  
  @media screen and (max-width: 768px) {
    width: 100%;
    .pagination__buttons {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    .pagination__item {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      padding: 10px;
    }
  }
}
</style>