<template>
  <button class="details-expand-button" type="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.details-expand-button {
  font: 600 15px/18px Montserrat;
  color: var(--main-text-color);
  padding: 20px 35px;
  border: 1px solid var(--main-text-color);
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
}
</style>
