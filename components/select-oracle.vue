<template>
  <div ref="select" class="form-select select-oracle">
    <button class="select-btn" :class="{ active: show }" @click="show = !show">
      <div class="left-block">
        <div class="coin-img">
          <img :src="require('@/assets/png/usdt.png')" alt="" />
        </div>
        <div class="coin-info">
          <div class="coin-info-head">
            <h3 class="coin-name">{{ amount }} {{ name }}</h3>
            <p class="coin-price">{{ price }}</p>
          </div>
          <div class="coin-account-info">{{ name }} Account: ***2235</div>
        </div>
      </div>
      <div class="arrown-icon">
        <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
      </div>
    </button>
    <div class="select-menu" :class="{ show: show }">
      <div
        v-for="(item, index) of 3"
        :key="index"
        class="menu-item"
        @click="show = !show"
      >
        <div class="coin-img">
          <img :src="require('@/assets/png/usdt.png')" alt="" />
        </div>
        <div class="coin-info">
          <div class="coin-info-head">
            <h3 class="coin-name">{{ amount }} {{ name }}</h3>
            <p class="coin-price">{{ price }}</p>
          </div>
          <div class="coin-account-info">{{ name }} Account: ***2235</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SelectOracle extends Vue {
  @Prop({ default: '' }) readonly img!: string
  @Prop({ default: '' }) readonly name!: string
  @Prop({ default: '' }) readonly price!: string
  @Prop({ default: '' }) readonly amount!: string

  show = false

  mounted() {
    document.addEventListener('click', this.ClickOutside)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)
  }

  ClickOutside(event: Event) {
    const select = this.$refs.select as HTMLElement
    if (select && !select.contains(event.target as Node)) {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.select-oracle {
  position: relative;
  z-index: 2;
  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #1d1c24;
    border: 1px solid #1d1c24;
    border-radius: 12px;
    padding: 10px 19px;
    cursor: pointer;
    transition: 0.2s;
    &.active {
      border-color: #f64e2a;
      .arrown-icon {
        img {
          transform: rotate(-270deg);
        }
      }
    }
    .left-block {
      display: flex;
      align-items: center;
      gap: 15px;
      .coin-img {
        width: 55px;
        height: 53px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .coin-info {
        &-head {
          display: flex;
          gap: 5px;
          margin-bottom: 2px;
          .coin-name {
            font-family: var(--second-family);
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            color: #fff;
          }
          .coin-price {
            font-family: var(--font3);
            font-weight: 400;
            font-size: 14px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .coin-account-info {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          line-height: 160%;
          text-align: left;
          color: #fff;
        }
      }
    }
    .arrown-icon {
      img {
        transform: rotate(-90deg);
        transition: 0.3s;
      }
    }
  }
  .select-menu {
    width: 100%;
    background: #1d1c24;
    padding: 0 10px;
    border: 1px solid #f64e2a;
    border-radius: 12px;
    position: absolute;
    top: calc(100% + 30px);
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
    &.show {
      top: calc(100% + 8px);
      visibility: visible;
      opacity: 1;
    }
    .menu-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px 9px;
      border-bottom: 1px solid #f64e2a;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      .coin-img {
        width: 43px;
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 50px;
        }
      }
      .coin-info {
        &-head {
          display: flex;
          gap: 5px;
          margin-bottom: 2px;
          .coin-name {
            font-family: var(--second-family);
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            color: #fff;
          }
          .coin-price {
            font-family: var(--font3);
            font-weight: 400;
            font-size: 12px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .coin-account-info {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          line-height: 160%;
          color: #fff;
        }
      }
    }
  }
}
</style>
