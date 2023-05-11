<script setup lang="ts">
import API from '@/services/api'
import { ref, reactive, onMounted, onActivated, onDeactivated } from 'vue'
import type { IOrderFormError } from '@/interfaces/IOrderFormError'
import type { IOrderFormRules } from '@/interfaces/IOrderFormRules'
import type { IOrderForm } from '@/interfaces/IOrderForm'
import type { ICountry } from '@/interfaces/ICountry'
import OrderInput from '@/components/UI/OrderInput.vue'
import OrderButton from '@/components/UI/OrderButton.vue'
import useForm from '@/hooks/useForm'

const countries = ref<ICountry[]>([])
const isError = ref(false);
const isPopupOpen = ref(false);
const getCountries = async () => {
  try {
    countries.value = await API.getCountries()
  } catch (e) {
    isError.value = true;
  }
}

onMounted(() => {
  getCountries()
})

const rules: IOrderFormRules = {
  firstName: (name: string) => {
    return !name || name.length < 2
  },
  lastName: (name: string) => {
    return !name || name.length < 2
  },
  info1: (name: string) => {
    return !name || name.length < 2
  },
  info2: (name: string) => {
    return !name || name.length < 2
  },
  country: (value: string) => {
    return !value
  },
  email: (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !re.test(email)
  }
}

const errors: IOrderFormError = reactive({
  firstName: false,
  lastName: false,
  info1: false,
  info2: false,
  country: false,
  email: false
});

const initialFormState = JSON.parse(localStorage.getItem('orderFormState')) || {
  firstName: '',
  lastName: '',
  info1: '',
  info2: '',
  country: '',
  email: '',
  phone: '',
  comment: ''
}
const formState: IOrderForm = reactive(initialFormState);

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
  isPopupOpen.value = true;
  await API.postOrder(formState)
}

onActivated(() => {
  window.onbeforeunload = () => {
    localStorage.setItem('orderFormState', JSON.stringify(formState));
  }
})

onDeactivated(() => {
  window.onbeforeunload = null;
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
      :inputValue="formState.firstName"
      placeholder="First name *"
      :isRequired="true"
      inputKey="firstName"
      :isError="errors.firstName"
      errorMessage="Name must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.lastName"
      placeholder="Last name *"
      :isRequired="true"
      inputKey="lastName"
      :isError="errors.lastName"
      errorMessage="Lastname must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.info1"
      placeholder="Info-1 *"
      :isRequired="true"
      inputKey="info1"
      :isError="errors.info1"
      errorMessage="Info must contain at least 2 symbols"
    />
    <OrderInput
      type="text"
      @input="updateFormState"
      :inputValue="formState.info2"
      placeholder="Info-2 *"
      :isRequired="true"
      inputKey="info2"
      :isError="errors.info2"
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
    />
    <textarea
      class="order-form-textarea"
      name="Comment"
      v-model="formState.comment"
      placeholder="Comment"
    ></textarea>
    <OrderButton :style="'margin-top: 14px'" :isDisabled="isSubmitDisabled"
      >Reserve Now</OrderButton
    >
  </form>
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

<style lang="scss">
.order-form {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  max-width: 671px;
  column-gap: 12px;
  row-gap: 10px;
}
.order-form-select-wrap {
  width: calc(50% - 7px);
  position: relative;
  &::after {
    content: '';
    background-color: #cdcdcd;
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
    background-color: #cdcdcd;
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
  border-bottom: 1px solid #000000;
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
  border-bottom: 1px solid #000000;
  resize: none;
}

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

@keyframes appearPopup {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
