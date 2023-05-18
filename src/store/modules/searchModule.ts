import type { IFilter } from '@/interfaces/IFilter'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSearchedState = defineStore(
  'hotels',
  () => {
    const searchedState = ref<IFilter | null>(null)
    const getSearchedState = computed(() => searchedState.value)
    const setSearchedState = (filterState: IFilter) => {
      searchedState.value = filterState
    }
    return { searchedState, getSearchedState, setSearchedState }
  },
  {
    persist: true
  }
)
