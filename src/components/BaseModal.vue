<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  itemsPerPage: number;
  maxVisiblePages: number;
  modelValue: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['save-settings','update:modelValue']);

const itemsPerPage = ref<number>(props.itemsPerPage);
const maxVisiblePages = ref<number>(props.maxVisiblePages);

const close = ():void => {
  emit('update:modelValue', false)
}

const save = ():void => {
  emit('save-settings', { itemsPerPage: itemsPerPage.value, maxVisiblePages: maxVisiblePages.value });
  emit('update:modelValue', false);
};
</script>

<template>
  <div class="modal" v-if="modelValue" @click.stop>
    <div class="modal__content" @click.stop >
      <h2 class="modal__title">Настройки</h2>
      <div class="modal__body">
        <div class="modal__input-group">
          <label for="itemsPerPage">Кол-во элементов на странице:</label>
          <input
              type="number"
              id="itemsPerPage"
              v-model.number="itemsPerPage"
              min="1"
              @keyup.enter="save"
          />
        </div>
        <div class="modal__input-group">
          <label for="maxVisiblePages">Кол-во видимых страниц:</label>
          <input
              type="number"
              id="maxVisiblePages"
              v-model.number="maxVisiblePages"
              min="3"
              @keyup.enter="save"
          />
        </div>
      </div>
      <div class="modal__footer">
        <button @click="close">Отмена</button>
        <button @click="save" >Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
  &__content {
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &__title {
    font-size: 1.5rem;
    margin-bottom: 25px;
    text-align: center;
  }
  
  &__body {
    margin-bottom: 15px;
  }
  
  &__input-group {
    margin-bottom: 10px;
    
    label {
      display: block;
      margin-bottom: 5px;
    }
    
    input {
      width: 100%;
      padding: 5px 10px 5px 10px;
      border-radius: 10px;
      outline: none;
      border: 1px solid #ccc;
    }
  }
  
  &__footer {
    display: flex;
    justify-content: center;
    margin-top: 35px;
    
    button {
      margin-left: 10px;
      padding: 8px 15px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      
      &:first-child {
        color: #666B85;
        background: #F0F0F0;
      }
      
      &:last-child {
        background: #4caf50;
        color: #fff;
      }
    }
  }
}
</style>