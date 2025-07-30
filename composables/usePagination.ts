// composables/usePagination.ts
import { ref, computed } from 'vue'

const currentPage = ref(1)
const itemsPerPage = ref(5)

function setPage(page: number) {
  currentPage.value = page
}

export function usePagination() {
  return {
    currentPage,
    itemsPerPage,
    setPage,
  }
}
