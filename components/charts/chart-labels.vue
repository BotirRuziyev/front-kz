<template>
  <div class="chart-labels__wrapper">
    <h2 class="chart-labels__title">Expenses</h2>
    <ul ref="chartLabel" class="chart-label__list" :class="{ show: isVisible }">
      <li v-for="item in data" :key="item.id" class="chart-label">
        <span class="chart-label__type" :class="item.color"></span>
        <div class="chart-label__body">
          {{ item.name }} <br />
          {{ item.price }}
        </div>
        <div class="coin-amount">
          <div class="amount-item amount-btc">
            <span></span>
            1,814 BTC
          </div>
          <div class="amount-item amount-usdt">
            <span></span>
            100 USDT
          </div>
          <div class="amount-item amount-eth">
            <span></span>
            5 ETH
          </div>
          <div class="amount-item amount-ltc">
            <span></span>
            2 LTC
          </div>
        </div>
      </li>
    </ul>
    <button
      class="more-btn"
      :class="{ active: isVisible }"
      @click="isVisible = !isVisible"
    >
      <span v-if="!isVisible">Show more</span>
      <span v-else> Read more </span>
      <span class="arrow-icon">
        <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class ChartLabel extends Vue {
  @Prop({ default: () => [] }) data!: []

  $refs!: {
    chartLabel: HTMLDivElement
  }

  isVisible = false

  mounted() {
    this.updateChartHeight()
  }

  updateChartHeight() {
    this.$nextTick(() => {
      if (!this.$refs.chartLabel) return

      this.$refs.chartLabel.style.height = this.isVisible
        ? `${this.$refs.chartLabel.scrollHeight}px`
        : '220px'
    })
  }

  @Watch('isVisible')
  onVisibilityChange() {
    this.updateChartHeight()
  }
}
</script>

<style lang="scss">
.chart-labels__wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
  .chart-labels__title {
    margin-bottom: 14px;
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
  }
  .more-btn {
    max-width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #f64e2a;
    &.active {
      .arrow-icon {
        transform: rotate(-270deg);
      }
    }
    .arrow-icon {
      display: block;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-90deg);
      transition: 0.3s;
      img {
        height: 12px;
      }
    }
  }
  .chart-label__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 220px;
    overflow: hidden;
    transition: 0.3s;
    .chart-label {
      width: 100%;
      display: flex;
      align-items: start;
      gap: 8px;
      background: #121119;
      border-radius: 8px;
      padding: 11px 10px;
      &:hover {
        .coin-amount {
          right: -4px;
          opacity: 1;
          visibility: visible;
        }
      }
      &__type {
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        &.color-escrow {
          background: #f6c32a;
        }

        &.color-p2p {
          background: #f64e2a;
        }
        &.color-swap {
          background: #902af6;
        }
        &.color-transfers {
          background: #2af653;
        }
        &.color-prepaid {
          background: #2a67f6;
        }
        &.color-bills {
          background: #2af6f6;
        }
        &.color-fees {
          background: #f69e2a;
        }
        &.color-fees {
          background: #f69e2a;
        }
        &.color-mixing {
          background: #f62a2a;
        }
        &.color-shops {
          background: #aff62a;
        }
        &.color-oracle-pay {
          background: #f62ad4;
        }
        &.color-checks {
          background: #10f;
        }
      }
      &__body {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        color: #fff;
      }
      .coin-amount {
        width: 136px;
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22136%22%20height%3D%22116%22%20viewBox%3D%220%200%20136%20116%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M10%208C10%203.58172%2013.5817%200%2018%200H128C132.418%200%20136%203.58172%20136%208V108C136%20112.418%20132.418%20116%20128%20116H18C13.5817%20116%2010%20112.418%2010%20108V70.5629C10%2068.295%209.03743%2066.1337%207.35172%2064.6165L0%2058L7.35172%2051.3835C9.03743%2049.8663%2010%2047.705%2010%2045.4371V8Z%22%20fill%3D%22%23262431%22%20/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        visibility: hidden;
        opacity: 0;
        transition: 0.3s;
        .amount-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #fff;
          &.amount-btc {
            span {
              background: #f6c32a;
            }
          }
          &.amount-usdt {
            span {
              background: #f64e2a;
            }
          }
          &.amount-eth {
            span {
              background: #2af653;
            }
          }
          &.amount-ltc {
            span {
              background: #902af6;
            }
          }
          span {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
