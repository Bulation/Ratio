<script setup lang="ts">
import API from '@/services/api'
import { ref, reactive, onMounted, onActivated, onDeactivated } from 'vue'
import type { IOrderFormError } from '@/interfaces/IOrderFormError'
import type { IOrderFormRules } from '@/interfaces/IOrderFormRules'
import type { IOrderForm } from '@/interfaces/IOrderForm'
import type { ICountry } from '@/interfaces/ICountry'
import OrderInput from '@/components/UI/OrderInput.vue'
import OrderButton from '@/components/UI/OrderButton.vue'
import ModalWindow from '@/components/UI/ModalWindow.vue'
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent.vue'
import useForm from '@/hooks/useForm'
import yandexMetrica from '@/services/yandexMetrika'
import { EMAIL_REGEXP, PHONE_REGEXP } from '@/constants/constants'

const countries = ref<ICountry[]>([])
const modalRef = ref<InstanceType<typeof ModalWindow> | null>(null)
const isError = ref(false)
const getCountries = async () => {
  countries.value = await API.getCountries()
}

onMounted(async () => {
  await getCountries()
})

const rules: IOrderFormRules = {
  first_name: (name: string) => !name || name.length < 2,
  last_name: (name: string) => !name || name.length < 2,
  info_1: (name: string) => !name || name.length < 2,
  info_2: (name: string) => !name || name.length < 2,
  country: (value: string) => !value,
  email: (email: string) => {
    const re = EMAIL_REGEXP
    return !re.test(email)
  },
  phone: (value: string) => {
    const re = PHONE_REGEXP
    return !re.test(value)
  },
  comment: (value: string) => !value
}

const errors: IOrderFormError = reactive({
  first_name: false,
  last_name: false,
  info_1: false,
  info_2: false,
  country: false,
  email: false,
  phone: false,
  comment: false
})

const initialFormState = JSON.parse(localStorage.getItem('orderFormState')) || {
  first_name: '',
  last_name: '',
  info_1: '',
  info_2: '',
  country: '',
  email: '',
  phone: '',
  comment: ''
}
const formState: IOrderForm = reactive(initialFormState)

const { isSubmitDisabled, clearError, updateFormState, validateForm } = useForm(
  formState,
  errors,
  rules
)

const submitForm = async () => {
  validateForm()
  if (isSubmitDisabled.value) {
    return
  }
  try {
    await API.postOrder(formState)
  } catch (e) {
    yandexMetrica.setGoal('orderError')
    isError.value = true
    return
  }
  isError.value = false
  modalRef.value?.openPopup()
}

onActivated(() => {
  window.onbeforeunload = () => {
    localStorage.setItem('orderFormState', JSON.stringify(formState))
  }
})

onDeactivated(() => {
  window.onbeforeunload = null
})
</script>

<template>
  <template v-if="isError">
    <ErrorComponent />
  </template>
  <form novalidate @submit.prevent="submitForm" class="order-form" action="#">
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.first_name"
      placeholder="First name *"
      :isRequired="true"
      inputKey="first_name"
      :isError="errors.first_name"
      errorMessage="Name must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.last_name"
      placeholder="Last name *"
      :isRequired="true"
      inputKey="last_name"
      :isError="errors.last_name"
      errorMessage="Lastname must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.info_1"
      placeholder="Info-1 *"
      :isRequired="true"
      inputKey="info_1"
      :isError="errors.info_1"
      errorMessage="Info must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.info_2"
      placeholder="Info-2 *"
      :isRequired="true"
      inputKey="info_2"
      :isError="errors.info_2"
      errorMessage="Info must contain at least 2 symbols"
    />
    <div class="order-form-select-wrap">
      <select
        class="order-form-select"
        @change="clearError('country')"
        v-model="formState.country"
        name="countries"
        id=""
      >
        <option disabled value="">Country *</option>
        <option v-for="country in countries" v-bind:value="country.name" v-bind:key="country.name">
          {{ country.name }}
        </option>
      </select>
      <span class="order-form-error-msg" v-if="errors.country">Country is required</span>
    </div>
    <OrderInput
      type="email"
      @input="updateFormState"
      :inputValue="formState.email"
      placeholder="Email address *"
      :isRequired="true"
      inputKey="email"
      :isError="errors.email"
      errorMessage="Email must be like **@**.**"
    />
    <OrderInput
      :style="{ width: '100%' }"
      type="tel"
      @input="updateFormState"
      :inputValue="formState.phone"
      placeholder="Phone number"
      :isRequired="false"
      inputKey="phone"
      :isError="errors.phone"
      errorMessage="phone should not be empty and must be like +79999999999"
    />
    <div :style="'width: 100%;'">
      <textarea
        class="order-form-textarea"
        @input="(e) => updateFormState((e.target as HTMLTextAreaElement).value, 'comment')"
        name="Comment"
        v-model="formState.comment"
        placeholder="Comment"
      ></textarea>
      <span class="order-form-error-msg" v-if="errors.comment">Comment should not be empty</span>
    </div>
    <OrderButton class="order-form__btn" :isDisabled="isSubmitDisabled">Reserve Now</OrderButton>
  </form>
  <ModalWindow ref="modalRef" />
</template>

<style lang="scss">
.order-form {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  max-width: 671px;
  column-gap: 12px;
  row-gap: 10px;
  &__btn {
    position: relative;
    left: 10px;
    top: 8px;
  }
}
.order-form-select-wrap {
  width: calc(50% - 7px);
  position: relative;
  &::after {
    content: '';
    background-color: var(--select-arrow-color);
    position: absolute;
    right: 19px;
    top: 21px;
    width: 1px;
    height: 7px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  &::before {
    content: '';
    background-color: var(--select-arrow-color);
    position: absolute;
    z-index: 1;
    right: 23px;
    top: 21px;
    width: 1px;
    height: 7px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
.order-form-select {
  width: 100%;
  color: var(--order-input-color);
  font: 500 14px/20px Montserrat;
  padding: 15px;
  border-bottom: 1px solid var(--dark-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.order-form-textarea {
  width: 100%;
  color: var(--order-input-color);
  font: 500 14px/20px Montserrat;
  height: 49px;
  padding-left: 15px;
  padding-top: 15px;
  border-bottom: 1px solid var(--dark-color);
  resize: none;
}
</style>
