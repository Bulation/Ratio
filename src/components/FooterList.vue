<script setup lang="ts">

interface ILink {
  value: string;
  path: string;
}

interface IFooterListProps {
  list: ILink[]
  title: string
}
defineProps<IFooterListProps>()
</script>

<template>
  <div class="footer-list-container">
    <h3 class="footer-list-container__title">{{ title }}</h3>
    <ul class="footer-list">
      <li class="footer-list__item" v-for="item in list" :key="item.path">
        <a class="footer-list__link" :href="item.path">{{ item.value }}</a>
      </li>   
    </ul>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .footer-list-container {
    padding-top: 15px;
    &__title {
      color: var(--title-color);
      font: 700 18px/20px Montserrat;
      margin-bottom: 28px;
      text-transform: uppercase;
    }
  }
  .footer-list {
    &__link {
      color: var(--link-color);
      font: 500 15px/20px Montserrat;
      transition: color 0.3s ease-in;
      &:hover {
        color: #000000;
      }
    }
    &__item:not(:last-child) {
      margin-bottom: 13px;
    }
  }
</style>