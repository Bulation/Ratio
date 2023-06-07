<script setup lang="ts">
import { MENU_LINKS_OBJECT } from '@/constants/constants'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMobileNavShow = ref(false)
const isMobileNavHidden = ref(false)

const toggleBurger = () => {
  isMobileNavShow.value = !isMobileNavShow.value
  if (!isMobileNavShow.value) {
    isMobileNavHidden.value = true
    document.body.classList.remove('body_overlay')
  } else {
    isMobileNavHidden.value = false
    document.body.classList.add('body_overlay')
  }
}
</script>

<template>
  <header class="header" v-click-outside="() => (isMobileNavShow ? toggleBurger() : null)">
    <div class="header__container">
      <div class="header__wrap">
        <h1 class="title header__title">
          <RouterLink class="title__link" to="/">Logo</RouterLink>
        </h1>
        <nav
          class="navigation"
          :class="{ navigation_show: isMobileNavShow, navigation_hidden: isMobileNavHidden }"
        >
          <ul class="navigation__list">
            <li class="navigation__item" v-for="link in MENU_LINKS_OBJECT" :key="link.content">
              <a
                class="navigation__link"
                :href="link.url"
                @click="isMobileNavShow ? toggleBurger() : null"
                >{{ link.content }}</a
              >
            </li>
          </ul>
        </nav>
        <div
          class="burger header__burger"
          :class="{ burger_active: isMobileNavShow }"
          @click="toggleBurger"
        >
          <span v-for="n in 3" :key="n" class="burger__item"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--header-bg-color);
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 51px;
    max-width: 876px;
    width: 100%;
    @include tablet {
      justify-content: space-between;
    }
  }
  &__container {
    max-width: 1210px;
    width: calc(100% - 50px);
    margin: 0 auto;
    padding: 19px 0;
  }
}

.title {
  text-transform: uppercase;
  font: 800 35px/43px Montserrat;
  cursor: pointer;
  &__link {
    color: var(--link-color);
    transition: color 0.3s ease-in;
    &:hover {
      color: var(--second-text-color);
    }
  }
}
.navigation {
  &__list {
    display: flex;
    gap: 34px;
    @include tablet {
      flex-direction: column;
      align-items: center;
      width: 320px;
      padding-top: 70px;
    }
  }
  &__link {
    color: var(--link-color);
    font: 600 16px/20px Montserrat;
    transition: color 0.3s ease-in;
    &_active {
      color: var(--second-text-color);
    }
    &:hover {
      color: var(--second-text-color);
    }
  }
  @include tablet {
    background-color: #ffffff;
    transform: translateX(100%);
    position: fixed;
    z-index: 4;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &_show {
    animation: navFromRight 0.3s ease-in;
    transform: translate(0);
  }
  &_hidden {
    animation: navToRight 0.3s ease-in;
  }
}

.burger {
  display: none;
  cursor: pointer;
  width: 36px;
  height: 24px;
  position: relative;
  z-index: 5;
  transition: transform 0.3s ease-in;
  &__item {
    display: block;
    height: 4px;
    background: var(--burger-color);
    margin-bottom: 6px;
  }
  &_active {
    transform: rotate(90deg);
  }
  @include tablet {
    display: block;
  }
}
</style>
