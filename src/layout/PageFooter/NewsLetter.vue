<script setup lang="ts">
import SvgIcon from '@/components/UI/SvgIcon.vue'
import ModalWindow from '@/components/UI/ModalWindow.vue'
import { EMAIL_REGEXP } from '@/constants'
import { ref } from 'vue'

const inputValue = ref('')
const modalRef = ref<InstanceType<typeof ModalWindow> | null>(null)
const errorMessage = 'Email must be like **@**.**'
const isError = ref(false)
const submitForm = async () => {
  const re = EMAIL_REGEXP
  if (!re.test(inputValue.value)) {
    isError.value = true
    return
  }
  modalRef.value?.openPopup()
}
</script>

<template>
  <section class="newsletter">
    <div class="newsletter__container">
      <div class="newsletter__content">
        <h4 class="newsletter__title">Newsletter</h4>
        <p class="newsletter__subtitle">Stay Upto Date</p>
      </div>
      <form novalidate @submit.prevent="submitForm" action="#" class="newsletter__form">
        <div class="newsletter__form-body">
          <input
            class="newsletter__input"
            type="email"
            v-model="inputValue"
            placeholder="Your Email..."
          />
          <button class="newsletter__btn" type="submit">
            <SvgIcon className="newsletter__icon" id="send" />
          </button>
        </div>
      </form>
    </div>
    <div class="order-form-error-msg" v-if="isError">{{ errorMessage }}</div>
  </section>
  <ModalWindow ref="modalRef" />
</template>

<style scoped lang="scss">
.newsletter {
  font: 500 14px/20px Montserrat;
  background-color: var(--newsletter-bg);
  color: var(--title-color);
  &__container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 80px;
    max-width: 1000px;
    width: calc(100% - 30px);
    margin: 0 auto;
    padding: 29px 0;
    @media screen and (max-width: 420px) {
      justify-content: center;
      gap: 30px;
    }
  }
  &__title {
    font: 700 18px/20px Montserrat;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
  &__content {
    padding-top: 10px;
  }
  &__form {
    padding-top: 8px;
    display: flex;
    flex-grow: 1;
  }
  &__form-body {
    display: flex;
    flex-grow: 1;
    position: relative;
  }
  &__input {
    flex-grow: 1;
    font: inherit;
    color: var(--input-color);
    border-radius: 26px;
    padding: 16px 16px 16px 23px;
    &:focus {
      outline: 1px solid var(--input-outline);
    }
  }
  &__btn {
    position: absolute;
    right: 0;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: var(--btn-bg);
    cursor: pointer;
  }
  &__icon {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 28px;
    height: 28px;
    transition: fill 0.3s ease-in;
    &:hover {
      fill: red;
    }
  }
}
.order-form-error-msg {
  text-align: center;
  color: red;
  font: 700 12px/15px Montserrat;
}
</style>
