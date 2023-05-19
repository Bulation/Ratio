<script setup lang="ts">
import { onActivated } from 'vue'
import OrderForm from './OrderForm.vue'
import OrderHotel from './OrderHotel.vue'
import PageFooter from '@/layout/PageFooter/PageFooter.vue'
import { useHead } from '@vueuse/head'
onActivated(() => {
  useHead({
    title: 'Order',
    meta: [
      { name: 'description', content: 'Make order and preserve hotel' },
      { name: 'keywords', content: 'hotel, hotel list, order, preserve hotel' },
      { property: 'og:title', content: 'Order' },
      { property: 'og:description', content: 'Make order and preserve hotel' }
    ]
  })
})
</script>

<template>
  <section class="order">
    <div class="order__container">
      <OrderForm />
      <OrderHotel />
    </div>
  </section>
  <PageFooter />
</template>

<style>
.order__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
  width: calc(100% - 30px);
  margin: 0 auto;
  max-width: 1230px;
  padding: 83px 14px 80px 0;
}
</style>
