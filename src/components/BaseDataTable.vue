<script setup lang="ts">
import type {User} from '@/interfaces/User'
import {formatDateShort} from "@/utils/formatDate";

interface Props {
  displayedItems: User[]
}

const props = withDefaults(defineProps<Props>(), {
  displayedItems: () => []
});
</script>

<template>
  <div class="data-table">
    <table class="data-table__table-fill">
      <thead>
      <tr>
        <th class="id">Id</th>
        <th class="data-table__title">Имя</th>
        <th class="data-table__title">Компания</th>
        <th class="data-table__title">Должность</th>
        <th class="data-table__title">Телефон</th>
        <th class="data-table__title">Дата рождения</th>
        <th class="data-table__title">Возраст</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in displayedItems" :key="index">
        <td data-title="Id" class="data-table__table-hover">{{ item.id }}</td>
        <td data-title="Имя" class="data-table__table-hover">{{ item.firstName + ' ' + item.lastName }}</td>
        <td data-title="Компания" class="data-table__table-hover">{{ item.company.name }}</td>
        <td data-title="Должность" class="data-table__table-hover">{{ item.company.title }}</td>
        <td data-title="Телефон" class="data-table__table-hover">{{ item.phone }}</td>
        <td data-title="Дата рождения" class="data-table__table-hover">{{ formatDateShort(item.birthDate) }}</td>
        <td data-title="Возраст" class="data-table__table-hover">{{ item.age }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.data-table {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__table-fill {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 15px 0 0;
    padding: 10px;
  }

  & thead {
    tr {
      background: #15a88a;
      color: #fff;
      text-align: left;
      font-weight: bold;
    }
  }

  &__table-hover:not(:first-child) {
    border-left: 1px solid #15a88a;
  }

  & th, & td {
    padding: 12px 15px;
  }

  &__title {
    border-left: 1px solid #60d394;
  }

  & tbody,
  & tr {
    border: 1px solid #dddddd;
  }

  & td:last-child {
    text-align: center;
  }


  & tbody tr:nth-child(even) {
    background: #f3f3f3;
  }

  & tbody tr:last-child {
    border-bottom: 1px solid #15a88a;
  }

  @media screen and (max-width: 1024px) {
    .data-table {
      width: 90%;
    }

  }

  @media screen and (max-width: 768px) {
    .data-table {
      width: 100%;

      &__table-fill {
        border: 3px solid #15a88a;
        overflow: visible;
        width: 80vw;
      }

    }
    & thead {
      tr {
        display: none;
      }
    }
    & tr {
      display: block;

      &:not(:first-child) {
        border-top: 1px solid #15a88a;
      }
    }

    & td {
      display: flex;
      justify-content: space-between;
    }
    & td::before {
      content: attr(data-title) ": ";
      font-weight: 700;
    }

    &__table-hover:not(:first-child) {
      border-left: none;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
}
</style>