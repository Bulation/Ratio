<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import SvgIcon from './UI/SvgIcon.vue';
import type { ICountry } from '@/interfaces/ICountry';
import API from '@/services/api';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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


const formState = reactive({
  country: '',
  checkIn: '',
  checkOut: '',
  guest: ''
})

const sendForm = () => console.log(1);
</script>

<template>
  <form class="search-form">
    <div class="search-form__inputs-wrap">
      <div class="search-form__select">
        <h3 class="search-form__title">Location</h3>
        <select class="search-select" v-model="formState.country" name="countries" id="">
          <option disabled value="">Which city do you prefer?</option>
          <option v-for="country in countries" v-bind:value="country.name" v-bind:key="country.name">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="search-form__item search-form__date-picker">
        <h3 class="search-form__title">Check In</h3>
        <VueDatePicker v-model="formState.checkIn" placeholder="Add Dates" />
      </div>
      <div class="search-form__item search-form__date-picker_out">
        <h3 class="search-form__title">Check Out</h3>
        <VueDatePicker v-model="formState.checkOut" placeholder="Add Dates" />
      </div>
      <div class="search-form__item search-form__guests">
        <h3 class="search-form__title">Guests</h3>
        <input class="search-form-input" type="number" placeholder="Add Guests" min="0" step="1" v-model="formState.guest">
      </div>
      <button class="search-form__button" @click="sendForm">
        <SvgIcon className="search-form__button-svg" id="search" />
      </button>
    </div>
  </form>
</template>

<style lang="scss">
  .search-form {
    padding: 15px 8px 15px 30px;
    border-radius: 35px;
    background-color: #FFFFFF;
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
  .dp {
    &__input {
      @extend .search-form-input;
      border: none;
      padding: 0;
      &_icons {
        display: none;
      }
    }
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