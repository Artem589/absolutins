import {ref, computed, onMounted} from 'vue';
import type {User} from '@/interfaces/User'
import axios from 'axios';

export default function usePostsApi() {
    const users = ref<User[]>([]);
    const currentPage = ref<number>(1);
    const maxVisiblePages = ref<number>(3);
    const itemsPerPage = ref<number>(10);
    const visiblePages = ref<number[]>([]);

    const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage.value));


    const updateVisiblePages = () => {
        visiblePages.value = [];

        let startPage = currentPage.value - Math.floor(maxVisiblePages.value / 2);
        let endPage = currentPage.value + Math.floor(maxVisiblePages.value / 2);

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(maxVisiblePages.value, totalPages.value);
        }
        if (endPage > totalPages.value) {
            endPage = totalPages.value;
            startPage = Math.max(1, endPage - maxVisiblePages.value + 1);
        }

        if (endPage - startPage + 1 > maxVisiblePages.value) {
            endPage = startPage + maxVisiblePages.value - 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.value.push(i);
        }
    };


    const displayedItems = computed(() => {
        const startIndex = (currentPage.value - 1) * itemsPerPage.value;
        const endIndex = startIndex + itemsPerPage.value;

        return users.value.slice(startIndex, endIndex);
    });


    const goToPage = (page: number) => {
        currentPage.value = page;
        updateVisiblePages();
    };


    onMounted(async () => {
        try {
            const limit = 100
            const response = await axios.get(`http://dummyjson.com/users?limit=${limit}`)
            users.value = response.data.users;
     
            updateVisiblePages();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    });

    return {
        users,
        currentPage,
        itemsPerPage,
        visiblePages,
        totalPages,
        displayedItems,
        maxVisiblePages,
        goToPage,
        updateVisiblePages
    };
}