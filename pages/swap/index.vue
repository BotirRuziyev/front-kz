<template>
  <div class="swap-page">
    <div v-if="swap">
      <div class="swap-page-in">
        <block-nav-bar text="Swap" />
        <block-home-cards />
        <div class="swiper swiper-container swiper-first">
          <div class="swiper-wrapper">
            <div v-for="item in 3" :key="item" class="swiper-slide">
              <select-oracle
                class="form-select-first"
                amount="15"
                name="USDT"
                price="(≈ $15)"
              />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="swiper swiper-container">
          <div class="swiper-wrapper">
            <div v-for="item in 3" :key="item" class="swiper-slide">
              <select-oracle amount="0,015424" name="BTC" price="(≈ $1.455)" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="swap-form">
          <div class="form-control">
            <span v-if="false" class="error"
              >Amount exceeds your current balance</span
            >
            <div class="form-input">
              <input-oracle :v="maxsum" placeholder="1" />
              <div class="input-icon">
                <img :src="require('@/assets/svg/tether-usdt.svg')" alt="" />
              </div>
            </div>
            <div class="form-input">
              <input-oracle placeholder="0.00000010" />
              <div class="input-icon bitcoin-icon">
                <img :src="require('@/assets/svg/bitcoin-icon.svg')" alt="" />
              </div>
              <div class="input-icon" @click="sendMax">
                <img :src="require('@/assets/svg/money-send.svg')" alt="" />
              </div>
            </div>
          </div>
          <div class="equals-sign">
            <div class="equals-sign-item">
              <button class="equals-btn">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3.46034H0L0 0L9 0V3.46034ZM9 9H0L0 5.53966H9V9Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div class="equals-sign-item">
              <button class="equals-btn">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3.46034H0L0 0L9 0V3.46034ZM9 9H0L0 5.53966H9V9Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="form-control">
            <input-oracle class="form-input" v="$101,920" />
            <input-oracle class="form-input" v="$101,920" />
          </div>
        </div>
        <div class="validity-period">
          <div class="valid-img">
            <img :src="require('@/assets/svg/valid.svg')" alt="" />
          </div>
          <p class="valid-text">
            USDT/BTC Rate= 0.00000010 Swap Rate is valid for 10 seconds
          </p>
        </div>
      </div>
      <div class="swap-btn">
        <button-oracle
          text="SWAP"
          class="orange"
          @click=";(status = true), (swap = false)"
        />
        <button-oracle text="Swap history" />
      </div>
    </div>
    <div v-if="status && !swap" class="swap-status">
      <div class="swap-status-content">
        <h4 class="swap-status-title">The SWAP WENT WELL!</h4>
        <div class="swap-img">
          <img :src="require('@/assets/png/swap-success.png')" alt="" />
        </div>
        <div class="exchange">
          <div class="exchange-head">
            <p class="cripto-name">BTC</p>
            <div class="arrown-icon">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.21484 3.46484L10.2498 6.49984L7.21484 9.53484"
                  stroke="white"
                  stroke-opacity="0.4"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.75 6.5H10.165"
                  stroke="white"
                  stroke-opacity="0.4"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p class="cripto-name">USDT</p>
          </div>
          <div class="exchange-value">1.902 USDT</div>
          <div class="criptio-sum">
            <p class="sum-value">3.5 USDT</p>
            <div class="arrown-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.41797 3.45898L11.9588 6.99982L8.41797 10.5407"
                  stroke="white"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.04297 7H11.8605"
                  stroke="white"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p class="sum-value">4 USDT</p>
          </div>
        </div>
      </div>
      <button-oracle
        text="BACK"
        color="orange"
        @click=";(status = true), (swap = true)"
      />
    </div>
    <div v-else-if="!status && !swap" class="swap-status">
      <div class="swap-status-content">
        <h4 class="swap-status-title">Couldn't make the SWAP!</h4>
        <div class="swap-img">
          <img :src="require('@/assets/png/swap-error.png')" alt="" />
        </div>
      </div>
      <button-oracle
        text="BACK"
        color="orange"
        @click=";(status = true), (swap = true)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const Swiper = process.client ? require('swiper').default : null
require('swiper/swiper-bundle.css')

@Component
export default class SwapPage extends Vue {
  private swiper!: any
  swap = true
  status = true
  maxsum = ''
  layout() {
    return 'mobile'
  }

  mounted() {
    if (process.client && Swiper) {
      this.swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    }
  }

  sendMax() {
    this.maxsum = '101,920'
  }
}
</script>

<style lang="scss">
.swap-page {
  &-in {
    overflow: hidden;
  }
  .swiper {
    width: calc(100% - 1px);
    overflow: visible;
    position: relative;
    margin-left: 0.5px;
    .swiper-wrapper {
      position: relative;
      z-index: 2;
    }
    &.swiper-first {
      z-index: 2;
    }
    .swiper-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      left: 50%;
      bottom: 28px;
      transform: translateX(-50%);
      z-index: 1;
      &-bullet {
        width: 8px;
        height: 8px;
        background: #211e2e;
        margin: 0 3px;
      }
      &-bullet-active {
        width: 10px;
        height: 10px;
        background: #f64e2a;
      }
    }
  }
  .form-select {
    margin-bottom: 50px;
  }
  .swap-form {
    margin-bottom: 24px;
    .form-control {
      display: flex;
      align-items: stretch;
      gap: 12px;
      position: relative;
      .error {
        position: absolute;
        bottom: calc(100% + 4px);
        left: 0;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        color: #ff5906;
      }
      .form-input {
        position: relative;
      }
      .form-button {
        width: 100%;
        background: #121119;
        border-radius: 8px;
        padding: 16px 14px;
        font-family: var(--font-family);
        font-weight: 400;
        text-align: left;
        font-size: 16px;
        line-height: 11px;
        color: #fff;
      }
      input {
        height: 43px;
        padding-right: 74px;
        text-overflow: ellipsis;
      }
      .input-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        &.bitcoin-icon {
          right: 42px;
        }
      }
    }
    .equals-sign {
      display: flex;
      margin: 5px 0;
      &-item {
        flex: 1 1 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .equals-btn {
          width: 23px;
          height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f64e2a;
          border-radius: 4px;
        }
      }
    }
  }
  .validity-period {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #121119;
    border-radius: 8px;
    padding: 13px;
    margin-bottom: 25px;
    .valid-text {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      color: #fff;
    }
  }
  .swap-btn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .swap-status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 0;
    width: 100%;
    height: 100vh;
    background: #0a090f;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    &::before {
      background: #f64e2a;
      border-radius: 100%;
      content: '';
      filter: blur(125px);
      height: 100px;
      left: 50%;
      position: absolute;
      top: -50px;
      transform: translateX(-50%);
      width: 100px;
      z-index: 0;
    }
    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .swap-status-title {
      max-width: 200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 16px;
      line-height: 160%;
      text-transform: uppercase;
      text-align: center;
      color: #fff;
    }
    .swap-img {
      width: 270px;
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .exchange {
      margin-bottom: 25px;
      &-head {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        .cripto-name {
          font-family: var(--font3);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .exchange-value {
        margin-bottom: 12px;
        font-family: var(--font3);
        font-weight: 700;
        font-size: 30px;
        text-align: center;
        color: #1b961f;
      }
      .criptio-sum {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        .sum-value {
          font-family: var(--font3);
          font-weight: 400;
          font-size: 18px;
          color: #fff;
          &:nth-child(1) {
            text-decoration: line-through;
          }
        }
      }
    }
    .button-oracle {
      max-width: 287px;
      margin: 0 auto;
    }
  }
}
</style>
