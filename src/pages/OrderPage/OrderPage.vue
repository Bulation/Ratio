<script setup lang="ts">
import OrderForm from '@/components/OrderForm.vue'
import OrderHotel from '@/components/OrderHotel.vue'
import PageFooter from '@/layout/PageFooter.vue'
import { useHead } from 'unhead'
useHead({
  title: "Order",
  meta: [
    { name: 'description', content: "Make order and preserve hotel" },
    { name: 'keywords', content: "hotel, hotel list, order, preserve hotel" },
    { property: 'og:title', content: "Order"},
    { property: 'og:description', content: "Make order and preserve hotel"},
  ]
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
  width: calc(100% - 30px);
  margin: 0 auto;
  max-width: 1216px;
  padding: 88px 0 75px;
}
</style>
