<script setup lang="ts">
import SearchComponent from '@/components/SearchComponent.vue';

interface ISearchProps {
  imageUrl: string;
}

defineProps<ISearchProps>()

</script>

<template>
  <section class="search">
    <div class="search__container" :style="{ backgroundImage: `url(${imageUrl})`}">
      <div class="search__wrap">
        <h2 class="search__title">Find</h2>
        <SearchComponent />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .search {
    &__container {
      max-width: 1366px;
      width: 100%;
      min-height: 577px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background-size: cover;
      padding-bottom: 83px;
      margin: 0 auto;
    }
    &__title {
      text-transform: uppercase;
      color: var(--title-color);
      font: 700 40px/49px Montserrat;
      margin-bottom: 25px;
      padding-left: 30px;
    }
    &__wrap {
      max-width: 794px;
      margin: 0 auto;
      width: calc(100% - 30px);
    }
  }
</style>