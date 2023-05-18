<script setup lang="ts">
import { ref } from 'vue';
import OrderButton from './OrderButton.vue';
const isPopupOpen = ref(false);
const openPopup = () => isPopupOpen.value = true;
defineExpose({openPopup});
</script>

<template>
<Teleport to="body">
    <Transition name="popup">
      <div v-if="isPopupOpen" class="popup-wrapper">
        <div class="popup" v-click-outside="() => isPopupOpen = false">
          <h2>Form is successfully submitted!</h2>
          <OrderButton :style="'margin-top: 14px'" :isDisabled="false" @click="isPopupOpen = false">Ok</OrderButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  padding: 20px;
  top: 50%;
  flex-wrap: wrap;
  background-color: #ffffff;
  text-align: center;
  color: #000;
  width: calc(100% - 20px);
  margin: 0 auto;
  max-width: 400px;
  max-height: 100%;
  height: auto;
  transition: all 0.2s ease 0.1s;
  overflow-y: auto;
}

.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #29292999;
  transition: all 0.2s ease 0.1s;
}

.popup-enter-active {
  animation: appearPopup 0.5s;
}
.popup-leave-active {
  animation: appearPopup 0.5s reverse;
}
</style>