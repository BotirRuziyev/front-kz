<template>
  <div class="history-page general-history">
    <div v-if="!search">
      <block-nav-bar
        to="#"
        :text="pageTitle"
        :search="searchIcon"
        @openSearch="search = true"
      />
      <div class="history-content">
        <div v-if="expensis && !deposit" class="expensis-chart">
          <button
            class="coin-selected__btn"
            @click=";(filterModal = true), $nuxt.$emit('open-modal')"
          >
            <span v-if="selectedItems.length == 0">All crypto</span>
            <span v-else class="selected-coin">
              <span v-for="(item, i) in selectedItems" :key="i"
                >{{ item }},</span
              >
            </span>
            <span class="arrow-icon">
              <ArrowIcon />
            </span>
          </button>
          <h2 class="history-title">{{ expensisTitle }}</h2>
          <div class="swiper historySwiper">
            <div class="swiper-wrapper">
              <div v-for="item in 5" :key="item" class="swiper-slide">
                <ExpensisDoughnutChart
                  :data="expensesText"
                  :active-expensis-type="activeExpensesType"
                  :step="step"
                  :chart-data="chartData"
                />
              </div>
            </div>
            <div class="swiper-pagination" style="display: none"></div>
          </div>
          <div class="history-chart__filter">
            <div class="chart-pagination">
              <div
                v-for="(month, i) in months"
                :key="month"
                class="pagination-double"
                :class="{
                  active: selectedMonth === i + 1,
                  active_center:
                    selectedMonth === i ||
                    selectedMonth === i - 1 ||
                    selectedMonth === i + 2 ||
                    selectedMonth === i + 3,
                  active_small:
                    selectedMonth === i + 4 || selectedMonth === i - 2,
                }"
                @click="monthSelected(i + 1)"
              ></div>
            </div>
            <h3 v-for="(month, i) in months" :key="i" class="month-name">
              <span v-if="selectedMonth === i + 1">{{ month }}</span>
            </h3>
            <CalendarOracle ref="calendar" />
          </div>
        </div>
        <div v-if="deposit && !expensis" class="deposits-chart">
          <button
            class="coin-selected__btn"
            @click=";(filterModal = true), $nuxt.$emit('open-modal')"
          >
            <span v-if="selectedItems.length == 0">All crypto</span>
            <span v-else class="selected-coin">
              <span v-for="(item, i) in selectedItems" :key="i"
                >{{ item }},</span
              >
            </span>
            <span class="arrow-icon">
              <ArrowIcon />
            </span>
          </button>
          <h2 class="history-title">{{ depositTitle }}</h2>
          <div class="swiper historySwiper">
            <div class="swiper-wrapper">
              <div v-for="item in 5" :key="item" class="swiper-slide">
                <DepositDoughnutChart
                  :data="depositText"
                  :active-deposit-type="activeDepositType"
                  :step-deposit="stepDeposit"
                  :chart-data="chartData"
                />
              </div>
            </div>
            <div class="swiper-pagination" style="display: none"></div>
          </div>
          <div class="history-chart__filter">
            <div class="chart-pagination">
              <div
                v-for="(month, i) in months"
                :key="i"
                class="pagination-double"
                :class="{
                  active: selectedMonth === i + 1,
                  active_center:
                    selectedMonth === i ||
                    selectedMonth === i - 1 ||
                    selectedMonth === i + 2 ||
                    selectedMonth === i + 3,
                  active_small:
                    selectedMonth === i + 4 || selectedMonth === i - 2,
                }"
                @click="monthSelected(i + 1)"
              ></div>
            </div>
            <h3 v-for="(month, i) in months" :key="i" class="month-name">
              <span v-if="selectedMonth === i + 1">{{ month }}</span>
            </h3>
            <CalendarOracle ref="calendar" />
          </div>
        </div>
        <div class="history-tab">
          <div class="tab-head">
            <div class="tab-button">
              <button
                class="deposits-btn tab-btn"
                :class="{ active: deposit }"
                @click="
                  expensis = false
                  deposit = true
                  expensisChart = false
                  depositChart = true
                  selectedMonth = 1
                "
              >
                deposits
              </button>
              <button
                class="expenses-btn tab-btn"
                :class="{ active: expensis }"
                @click="
                  expensis = true
                  deposit = false
                  expensisChart = true
                  depositChart = false
                  selectedMonth = 1
                "
              >
                Expenses
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="isDeLabSelected && deposit && !expensis"
          class="chart-labels"
        >
          <ChartLabel
            :step="stepDeposit"
            :data="depositData"
            title="deposits"
            @item-selected="depositSelect"
          />
        </div>
        <div
          v-if="isExLabSelected && expensis && !deposit"
          class="chart-labels"
        >
          <ChartLabel
            :step="step"
            :data="expensisData"
            :title="expensisTitle"
            @item-selected="expensisSelect"
          />
        </div>
        <h2 class="transaction-title">Transaction</h2>
        <transfer-history-item
          v-if="deposit && !expensis"
          :data="historyData"
          color="color-brown"
        />
        <transfer-history-item
          v-if="expensis && !deposit"
          :data="historyData"
          color="color-green"
        />
      </div>
    </div>
    <div v-else class="history-search">
      <div class="search-head">
        <input-oracle :search="true" placeholder="Search..." />
        <button class="close-search" @click="search = false">отменить</button>
      </div>
      <transfer-history-item
        v-if="deposit && !expensis"
        :data="historyData"
        color="color-white"
        @openModal=";(depositModal = true), $nuxt.$emit('open-modal')"
      />
      <transfer-history-item
        v-if="expensis && !deposit"
        :data="historyData"
        color="color-white"
        @openModal=";(expensesModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <draggable-modal
      class="filter-modal"
      :is-open="filterModal"
      @close="filterModal = false"
    >
      <h3 class="modal-title">Filter</h3>
      <button class="select-all" @click="toggleAllCheck">
        <checkbox-oracle :checked="allCheck" />
        <span>Select all coin </span>
      </button>
      <ul class="cripto-list">
        <li v-for="cripto of data" :key="cripto.id" class="list-item">
          <button class="cripto-button" @click="addSelected(cripto.name)">
            <div class="form-control">
              <checkbox-oracle :checked="cripto.selected || allCheck" />
            </div>
            <div class="icon">
              <img :src="cripto.img" alt="" />
            </div>
            <p class="cripto-text">
              {{ cripto.name }}
            </p>
          </button>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import CalendarOracle from '~/components/calendar-oracle.vue'
import ChartLabel from '~/components/charts/chart-labels.vue'
import DepositDoughnutChart from '~/components/charts/DepositDoughnutChart.vue'
import ExpensisDoughnutChart from '~/components/charts/ExpensisDoughnutChart.vue'

// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-back.svg?inline'

const Swiper = process.client ? require('swiper').default : null
require('swiper/swiper-bundle.css')

// interface Payload {
//   type: string
//   step: number
// }
interface Item {
  id: number
  img: string
  name: string
  selected: boolean
}
interface Text {
  title?: string
  price?: string
  date?: string
  percent?: string
}
@Component({
  components: {
    CalendarOracle,
    ExpensisDoughnutChart,
    DepositDoughnutChart,
    ChartLabel,
    ArrowIcon,
  },
})
export default class HistoryPage extends Vue {
  private swiper!: any
  searchIcon = true
  search = false
  allCheck = false
  step = 0
  stepDeposit = 0
  activeExpensesType: string | null = null
  activeDepositType: string | null = null
  pageTitle = 'History'
  expensisTitle = 'ALL'
  depositTitle = 'ALL'
  expensis = true
  deposit = false
  isOpen = false
  filterModal = false
  depositModal = false
  expensesModal = false
  isExLabSelected = true
  isDeLabSelected = true
  expensisChart = true
  depositChart = false
  selectedMonth = 1

  selectedItems: string[] = []

  localData: Item[] = []

  months = ['January', 'February', 'March', 'April', 'May']

  chartData = {
    labels: ['Escrow', 'P2P', 'SWAP', 'Transfers'],
    datasets: [
      {
        data: [28, 25, 28, 19],
        backgroundColor: ['#f6c32a', '#f64e2a', '#902af6', '#2af653'],
        borderWidth: 0,
      },
    ],
  }

  expensisData = [
    {
      id: 1,
      to: '/history/escrow',
      name: 'Escrow',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      to: '/history/p2p',
      name: 'P2P',
      price: '$1,923.15',
      color: 'color-p2p',
    },
    {
      id: 3,
      to: '/history/swap',
      name: 'SWAP',
      price: '$1,923.15',
      color: 'color-swap',
    },
    {
      id: 4,
      to: '/history/transfers',
      name: 'Transfers',
      price: '$1,923.15',
      color: 'color-transfers',
    },
    {
      id: 5,
      to: '/history/prepaid',
      name: 'Prepaid Cards',
      price: '$1,923.15',
      color: 'color-prepaid',
    },
    {
      id: 6,
      to: '/history/bills',
      name: 'Bills',
      price: '$1,923.15',
      color: 'color-bills',
    },
    {
      id: 7,
      to: '/history/fees',
      name: 'Fees',
      price: '$1,923.15',
      color: 'color-fees',
    },
    {
      id: 8,
      to: '/history/mixing',
      name: 'Mixing',
      price: '$1,923.15',
      color: 'color-mixing',
    },
    {
      id: 9,
      to: '/history/shops',
      name: 'Shops',
      price: '$1,923.15',
      color: 'color-shops',
    },
    {
      id: 10,
      to: '/history/oracle-pay',
      name: 'OraclePay',
      price: '$1,923.15',
      color: 'color-oracle-pay',
    },
    {
      id: 11,
      to: '/history/checks',
      name: 'Checks',
      price: '$1,923.15',
      color: 'color-checks',
    },
  ]

  depositData = [
    {
      id: 1,
      to: '/history/escrow',
      name: 'Escrow',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      to: '/history/p2p',
      name: 'P2P',
      price: '$1,923.15',
      color: 'color-p2p',
    },
    {
      id: 3,
      to: '/history/swap',
      name: 'SWAP',
      price: '$1,923.15',
      color: 'color-swap',
    },
    {
      id: 4,
      to: '/history/transfers',
      name: 'Transfers',
      price: '$1,923.15',
      color: 'color-transfers',
    },
    {
      id: 5,
      to: '/history/prepaid',
      name: 'Prepaid Cards',
      price: '$1,923.15',
      color: 'color-prepaid',
    },
    {
      id: 6,
      to: '/history/bills',
      name: 'Bills',
      price: '$1,923.15',
      color: 'color-bills',
    },
    {
      id: 7,
      to: '/history/fees',
      name: 'Fees',
      price: '$1,923.15',
      color: 'color-fees',
    },
    {
      id: 8,
      to: '/history/mixing',
      name: 'Mixing',
      price: '$1,923.15',
      color: 'color-mixing',
    },
    {
      id: 9,
      to: '/history/shops',
      name: 'Shops',
      price: '$1,923.15',
      color: 'color-shops',
    },
    {
      id: 10,
      to: '/history/oraclepay',
      name: 'OraclePay',
      price: '$1,923.15',
      color: 'color-oracle-pay',
    },
    {
      id: 11,
      to: '/history/checks',
      name: 'Checks',
      price: '$1,923.15',
      color: 'color-checks',
    },
  ]

  expensesText: Text = {
    title: 'Total',
    price: '1,923$',
  }

  depositText: Text = {
    title: 'Total',
    price: '1,923$',
  }

  data = [
    {
      id: 1,
      img: require('@/assets/svg/litecoin-ltc.svg'),
      name: 'Litecoin',
      selected: false,
    },
    {
      id: 2,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'XRP',
      selected: false,
    },
    {
      id: 3,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'Bitcoin',
      selected: false,
    },
    {
      id: 4,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'Etherium',
      selected: false,
    },
    {
      id: 5,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'USDT',
      selected: false,
    },
    {
      id: 6,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'BNB',
      selected: false,
    },
  ]

  mounted() {
    if (process.client && Swiper) {
      this.swiper = new Swiper('.historySwiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          slideChange: () => {
            if (this.swiper) {
              this.selectedMonth = this.swiper.activeIndex + 1
            }
          },
        },
      })
    }
  }

  created() {
    this.localData = [...this.data]
  }

  historyData = [
    {
      id: 1,
      date: 'March 20, 2025',
      expenses: [
        {
          _id: 1,
          img: require('@/assets/svg/btc.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '100.234$',
        },
        {
          _id: 2,
          img: require('@/assets/svg/ton.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '100.234$',
        },
      ],
    },
    {
      id: 2,
      date: 'March 20, 2025',
      expenses: [
        {
          _id: 1,
          img: require('@/assets/svg/litecoin-ltc.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '154.111$',
        },
        {
          _id: 2,
          img: require('@/assets/svg/eth.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '84.455$',
        },
        {
          _id: 3,
          img: require('@/assets/svg/litecoin-ltc.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '84.455$',
        },
      ],
    },
    {
      id: 3,
      date: 'March 20, 2025',
      expenses: [
        {
          _id: 1,
          img: require('@/assets/svg/litecoin-ltc.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '154.111$',
        },
        {
          _id: 2,
          img: require('@/assets/svg/eth.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '84.455$',
        },
      ],
    },
    {
      id: 4,
      date: 'March 20, 2025',
      expenses: [
        {
          _id: 1,
          img: require('@/assets/svg/btc.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '100.234$',
        },
        {
          _id: 2,
          img: require('@/assets/svg/ton.svg'),
          title: 'O-Pay Dep.',
          amount: '0,0244 TON',
          description: 'Telegram Shop API Keys',
          price: '100.234$',
        },
      ],
    },
  ]

  monthSelected(i: any) {
    this.selectedMonth = i
    if (this.swiper) {
      this.swiper.slideTo(i - 1)
    }
  }

  expensisSelect(name: string) {
    this.expensisTitle = name
    this.isExLabSelected = false
  }

  depositSelect(name: string) {
    this.depositTitle = name
    this.isDeLabSelected = false
  }

  @Watch('data', { deep: true })
  onDataChange(newVal: Item[]) {
    this.localData = [...newVal]
  }

  addSelected(name: string) {
    this.localData.forEach((item) => {
      if (item.name === name) {
        this.$set(item, 'selected', !item.selected)
      }
    })
    const index = this.selectedItems.indexOf(name)
    if (index !== -1) {
      this.selectedItems.splice(index, 1)
    } else {
      this.selectedItems.push(name)
    }

    this.allCheck = this.localData.every((item) => item.selected === true)

    this.$emit('update', this.localData)
  }

  private toggleAllCheck() {
    this.allCheck = !this.allCheck

    this.localData.forEach((item) => {
      this.$set(item, 'selected', this.allCheck)
    })

    this.selectedItems = this.allCheck
      ? this.localData.map((item) => item.name)
      : []

    this.$emit('update', this.localData)
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/history-page.scss' as *;
.general-history {
  .history-content {
    .chart-labels {
      .chart-labels__wrapper {
        .chart-label__list {
          width: calc(100% + 32px);
          flex-direction: row;
          gap: 6px;
          margin-left: -16px;
          padding: 0 16px;
          &::-webkit-scrollbar {
            height: 0;
          }
          .chart-label {
            min-width: 105px;
            width: 105px;
            flex-direction: column;
            align-items: start;
            .chart-label__body {
              flex-direction: column;
              align-items: start;
            }
          }
        }
      }
    }
  }
}
</style>
