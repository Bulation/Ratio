<script setup lang="ts">
import API from '@/services/api';
import type { ICountry } from '@/interfaces/ICountry';
import { ref, reactive, onMounted } from 'vue';
import OrderButton from './UI/OrderButton.vue';
import IFormError from '@/interfaces/IFormError';
import IFormRules from '@/interfaces/IFormRules';
import IForm from '@/interfaces/IForm';
import OrderInput from './UI/OrderInput.vue';

const countries = ref<ICountry[]>([])
const getCountries = async () => {
  try {
    countries.value = await API.getCountries();
  } catch (e) {
    //render Error Component
  }
}

onMounted(() => {
  getCountries();
})

const rules: IFormRules = {
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
    return !value;
  },
  email: (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !re.test(email);
  }
}

const errors: IFormError = reactive({
  firstName: false,
  lastName: false,
  info1: false,
  info2: false,
  country: false,
  email: false,
});

const isSubmitDisabled = ref(false);

const formState: IForm = reactive({
  firstName: "",
  lastName: "",
  info1: "",
  info2: "",
  country: "",
  email: "",
  phone: "",
  comment: ""
})

const submitForm = async () => {
  Object.keys(errors).forEach((key) => {
    const isError = rules[key](formState[key])
    errors[key] = isError;
    if (!isSubmitDisabled.value && isError) {
      isSubmitDisabled.value = true;
    }
  });
  if (isSubmitDisabled.value) {
    return;
  }
  await API.postOrder(formState);
}

const clearError = (errorKey: string) => {
  isSubmitDisabled.value = false;
  if (errors[errorKey] !== undefined) {
    errors[errorKey] = false;
  }
}

const updateFormState = (value: string, name: string) => {
  formState[name] = value;
  clearError(name);
}

</script>

<template>
  <form novalidate @submit.prevent="submitForm" class="order-form" action="#">
    <OrderInput type="text" @input="updateFormState" :inputValue="formState.firstName" placeholder="First name *" isRequired="true" inputKey="firstName" :isError="errors.firstName" errorMessage="Name must contain at least 2 symbols"  />
    <OrderInput type="text" @input="updateFormState" :inputValue="formState.lastName" placeholder="Last name *" isRequired="true" inputKey="lastName" :isError="errors.lastName" errorMessage="Lastname must contain at least 2 symbols"  />
    <OrderInput type="text" @input="updateFormState" :inputValue="formState.info1" placeholder="Info-1 *" isRequired="true" inputKey="info1" :isError="errors.info1" errorMessage="Info must contain at least 2 symbols"  />
    <OrderInput type="text" @input="updateFormState" :inputValue="formState.info2" placeholder="Info-2 *" isRequired="true" inputKey="info2" :isError="errors.info2" errorMessage="Info must contain at least 2 symbols"  />
    <div class="order-form-select-wrap">
      <select class="order-form-select" @change="clearError('country')" v-model="formState.country" name="countries" id="">
        <option disabled value="">Country *</option>
        <option v-for="country in countries" v-bind:value="country.name" v-bind:key="country.name">
          {{ country.name }}
        </option>
      </select>
      <span class="order-form-error-msg" v-if="errors.country">Country is required</span>
    </div>
    <OrderInput type="email" @input="updateFormState" :inputValue="formState.email" placeholder="Email address *" isRequired="true" inputKey="email" :isError="errors.email" errorMessage="Email must be like **@**.**"  />
    <OrderInput :style="'width: 100%'" type="tel" @input="updateFormState" :inputValue="formState.phone" placeholder="Phone number" isRequired="false" inputKey="phone" />
    <textarea class="order-form-textarea" name="Comment" v-model="formState.comment" placeholder="Comment"></textarea>
    <OrderButton :style="'margin-top: 14px'" :isDisabled="isSubmitDisabled">Reserve Now</OrderButton>
  </form>
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
      background-color: #CDCDCD;
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
      background-color: #CDCDCD;
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
</style>