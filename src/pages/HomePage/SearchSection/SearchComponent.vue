<script setup lang="ts">
import { onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import SvgIcon from '@/components/UI/SvgIcon.vue'
import type { ICountry } from '@/interfaces/ICountry'
import API from '@/services/api' 
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import useForm from '@/hooks/useForm'
import { useSearchedState } from '@/store'
import { useRouter } from 'vue-router'

const countries = ref<ICountry[]>([])
const searchStore = useSearchedState();
const router = useRouter();

const getCountries = async () => {
  try {
    countries.value = await API.getCountries()
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getCountries()
})

const initialFormState = JSON.parse(localStorage.getItem('formState')) || {
  location: '',
  checkIn: '',
  checkOut: '',
  guest: null
};
const formState = reactive(initialFormState);

const rules = {
  location: (value: string) => {
    return typeof value !== 'string' || value.length === 0
  },
  checkIn: (value: string) => {
    return value.length === 0 || isNaN(Date.parse(value))
  },
  checkOut: (value: string) => {
    return value.length === 0 || isNaN(Date.parse(value))
  },
  guest: (value: string) => {
    return isNaN(Number(value)) || !value;
  }
}

const errors = reactive({
  location: false,
  checkIn: false,
  checkOut: false,
  guest: false
})

const { isSubmitDisabled, updateFormState, validateForm } = useForm(formState, errors, rules)

const submitForm = async () => {
  validateForm()
  if (isSubmitDisabled.value) {
    return;
  }
  formState.checkIn = new Date(formState.checkIn).toISOString()
  formState.checkOut = new Date(formState.checkOut).toISOString()
  searchStore.setSearchedState(formState);
  router.push('/search');
}

onActivated(() => {
  window.onbeforeunload = () => {
    localStorage.setItem('formState', JSON.stringify(formState));
  }
})

onDeactivated(() => {
  window.onbeforeunload = null;
})
</script>

<template>
  <form novalidate @submit.prevent="submitForm" class="search-form" action="#">
    <div class="search-form__inputs-wrap">
      <div class="search-form__select">
        <h3 class="search-form__title">Location</h3>
        <select
          @change="(e) => updateFormState((e.target as HTMLInputElement).value, 'location')"
          class="search-select"
          :value="formState.location"
          name="countries"
          id=""
        >
          <option disabled value="">Which city do you prefer?</option>
          <option
            v-for="country in countries"
            v-bind:value="country.name"
            v-bind:key="country.name"
          >
            {{ country.name }}
          </option>
        </select>
        <span class="search-form-error-msg" v-if="errors.location">Country should be checked</span>
      </div>
      <div class="search-form__item search-form__date-picker">
        <h3 class="search-form__title">Check In</h3>
        <DatePicker
          type="datetime"
          format="YYYY/MM/DD HH:mm"
          input-class="dp-input"
          :style="'width: 143px'"
          :value="new Date(formState.checkIn)"
          @update:value="(value) => updateFormState(value, 'checkIn')"
          placeholder="Add Dates"
        />
        <span class="search-form-error-msg" v-if="errors.checkIn">Date should be chosen</span>
      </div>
      <div class="search-form__item search-form__date-picker_out">
        <h3 class="search-form__title">Check Out</h3>
        <DatePicker
          type="datetime"
          format="YYYY/MM/DD HH:mm"
          input-class="dp-input"
          :style="'width: 143px'"
          :value="new Date(formState.checkOut)"
          @update:value="(value) => updateFormState(value, 'checkOut')"
          placeholder="Add Dates"
        />
        <span class="search-form-error-msg" v-if="errors.checkOut">Date should be chosen</span>
      </div>
      <div class="search-form__item search-form__guests">
        <h3 class="search-form__title">Guests</h3>
        <input
          @input="(e) => updateFormState((e.target as HTMLInputElement).value, 'guest')"
          class="search-form-input"
          type="number"
          placeholder="Add Guests"
          min="0"
          step="1"
          :value="formState.guest"
        />
        <span class="search-form-error-msg" v-if="errors.guest"
          >Guests number should be chosen</span
        >
      </div>
      <button :disabled="isSubmitDisabled" class="search-form__button" type="submit">
        <SvgIcon className="search-form__button-svg" id="search" />
      </button>
    </div>
  </form>
</template>

<style lang="scss">
.search-form {
  padding: 15px 8px 15px 30px;
  border-radius: 35px;
  background-color: #ffffff;
  &__inputs-wrap {
    display: flex;
    align-items: center;
    position: relative;
    @media screen and (max-width: 768px) {
      display: block;
      column-count: 2;
    }
    @media screen and (max-width: 576px) {
      column-count: 1;
    }
  }
  &__select {
    margin-right: 5px;
  }
  &__item {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      height: 30px;
      width: 1px;
      background-color: var(--separator-color);
      top: 0;
      left: -10px;
    }
    @media screen and (max-width: 420px) {
      &:before {
        display: none;
      }
    }
  }
  &__title {
    color: var(--title-color);
    font: 600 12px/15px Montserrat;
    margin-bottom: 3px;
  }
  &__date-picker_out {
    width: 202px;
  }
  &__guests {
    width: 222px;
  }
  &__button {
    position: absolute;
    right: 0;
    bottom: 50%;
    top: 50%;
    transform: translate(0, -50%);
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: var(--button-color);
    cursor: pointer;
    &-svg {
      width: 24px;
      height: 24px;
    }
    &:disabled {
      background-color: grey;
    }
  }
  @media screen and (max-width: 420px) {
    padding-left: 12px;
  }
}

.search-form-input {
  color: var(--placeholder-color);
  font: 600 14px/17px Montserrat;
  outline: none;
  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    opacity: 0.5;
  }
  &::-moz-placeholder {
    opacity: 1;
  }
}
.search-form-error-msg {
  display: block;
  width: 140px;
  color: red;
  font: 700 12px/15px Montserrat;
}
.dp-input {
  @extend .search-form-input;
  border: none;
  padding: 0;
}
.mx-icon-calendar {
  display: none;
}
.search-select {
  max-width: 260px;
  appearance: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  cursor: pointer;
  color: var(--placeholder-color);
  font: 600 14px/17px Montserrat;
}
</style>
