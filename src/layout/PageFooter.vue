<script setup lang="ts">
import NewsLetter from '@/components/NewsLetter.vue';
import MarketBlock from '@/components/UI/MarketBlock.vue';
import FooterList from '@/components/FooterList.vue';
import { HELP_LIST, COMPANY_LIST, CONTACT_LIST, SOCIALS_LIST } from '@/constants';
import SvgIcon from '@/components/UI/SvgIcon.vue';
</script>

<template>
  <footer class="footer">
    <NewsLetter />
    <div class="footer__container">
      <div class="footer__about">
        <div class="footer__title">Logo</div>
        <p class="footer__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
        <div class="footer__markets">
          <MarketBlock path="https://play.google.com/" iconClass="market__icon" iconId="google" marketName="PlayStore" />
          <MarketBlock path="https://apple.com" iconClass="market__icon" iconId="apple" marketName="AppleStore" />
        </div>
      </div>
      <div class="footer-lists">
        <FooterList :list="COMPANY_LIST" title="Company" />
        <FooterList :list="HELP_LIST" title="Help center" />
        <FooterList :list="CONTACT_LIST" title="Contact info">
          <ul class="socials-list footer__socials-list">
            <li class="socials-list__item" v-for="social in SOCIALS_LIST" :key="social.iconId">
              <a class="socials-list__link" :href="social.path">
                <SvgIcon className="socials-list__icon" :id="social.iconId" />
              </a>
            </li>
          </ul>
        </FooterList>
      </div>
    </div>
    <div class="footer__rights">
      <div class="footer__rights-container">
        <span class="footer__copyright">© 2022 thecreation.design | All rights raserved</span>
        <span class="footer__company-info">Created with love by <strong>thecreation.design</strong></span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    &__container {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      max-width: 1206px;
      width: calc(100% - 30px);
      margin: 0 auto;
      justify-content: space-between;
      padding: 72px 0 200px;
    }
    &__about {
      max-width: 382px;
      margin: 0 auto;
    }
    &__title {
      color: var(--title-color);
      margin-bottom: 31px;
      font: 800 50px/61px Montserrat;
      text-transform: uppercase;
    }
    &__description {
      color: var(--second-text-color);
      margin-bottom: 40px;
      font: 400 15px/20px Montserrat;
    }
    &__markets {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    &__socials-list {
      margin-top: 35px;
    }
    &__rights {
      border-top: 1px solid var(--rights-border);
    }
    &__rights-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 1206px;
      width: calc(100% - 30px);
      margin: 0 auto;
      padding: 41px 0;
      color: var(--main-text-color);
      font: 600 16px/20px Montserrat;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    }
  }
  .footer-lists {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 72px;
  }
  .socials-list {
    display: flex;
    gap: 24px;
    &__icon {
      width: 24px;
      height: 24px;
    }
  }
</style>