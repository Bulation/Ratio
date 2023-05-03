<script setup lang="ts">
import OrderForm from '@/components/OrderForm.vue';
import OrderHotel from '@/components/OrderHotel.vue';
import PageFooter from '@/layout/PageFooter.vue';
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