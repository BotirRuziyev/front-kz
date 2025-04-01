<template>
  <div class="history-page">
    <block-nav-bar to="#" text="History" />
    <input-oracle
      :search="true"
      :calendar="true"
      placeholder="Search..."
      @openCalendar="openCalendar"
    />
    <CalendarOracle ref="calendar" :is-open="isOpen" @close="isOpen = false" />
    <div class="history-tab">
      <div class="tab-head">
        <div class="tab-button">
          <div
            class="btn-bg"
            :class="expensis ? 'expensis-bg' : 'deposit-bg'"
          ></div>
          <button
            class="expenses-btn tab-btn"
            :class="{ active: expensis }"
            @click=";(expensis = true), (deposit = false)"
          >
            Expenses
          </button>
          <button
            class="deposits-btn tab-btn"
            :class="{ active: deposit }"
            @click=";(expensis = false), (deposit = true)"
          >
            deposits
          </button>
        </div>
      </div>
    </div>
    <div v-if="expensis && !deposit" class="expenses-content">
      <div v-if="expensisChart" class="expensis-chart">
        <form-select :data="data" label="Choose a cryptocurrency" />
        <TransferHistoryChart />
        <div class="chart-labels">
          <ChartLabel :data="expensisData" />
        </div>
      </div>
      <transfer-history-item
        :data="historyData"
        color="color-white"
        @openModal=";(expensesModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <div v-if="deposit && !expensis" class="deposits-content">
      <form-select :data="data" label="All crypto" />
      <transfer-history-item
        :data="historyData"
        color="color-green"
        @openModal=";(depositModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <draggable-modal
      class="deposits-modal"
      :is-open="depositModal"
      @close="depositModal = false"
    >
      <div class="modal-header">
        <p class="modal-header__date">
          12 Dec
          <span></span>
          9:14 PM EST
        </p>
      </div>
      <div class="modal-logo">
        <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
      </div>
      <h2 class="user-info">@UserUser (ID:810192102)</h2>
      <div class="transfer-info">
        <h2 class="deposit-coin">+ 0,0244 BTC</h2>
        <h3 class="deposit-price">≈ 100.234$</h3>
        <span class="transfer-funds"> Transfer of funds </span>
      </div>
      <button class="return-btn border-gradient">
        <div class="left-blur"></div>
        <div class="btn-icon">
          <img :src="require('@/assets/svg/return.svg')" alt="" />
        </div>
        Return
      </button>
      <div class="deposit-account">
        <h2 class="deposit-account__title">DEPOSIT TO THE ACCOUNT</h2>
        <div class="deposit-block">
          <div class="coin-img">
            <img :src="require('@/assets/svg/tether-usdt.svg')" alt="" />
          </div>
          <div class="coin-info">
            <div class="coin-info-head">
              <h3 class="coin-name">0,015424 BTC</h3>
              <p class="coin-price">(≈ $1.456)</p>
            </div>
            <div class="coin-account-info">BTC Account: ***2235</div>
          </div>
        </div>
      </div>
      <div class="requisites">
        <h2 class="requisites-title">requisites</h2>
        <div class="sender">
          <p class="label">Sender</p>
          <h3 class="user-info">@UserUser (ID:810192102)</h3>
        </div>
      </div>
    </draggable-modal>
    <draggable-modal
      class="expenses-modal"
      :is-open="expensesModal"
      @close="expensesModal = false"
    >
      <div class="modal-header">
        <p class="modal-header__date">
          12 Dec
          <span></span>
          9:14 PM EST
        </p>
      </div>
      <div class="modal-logo">
        <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
      </div>
      <h2 class="user-info">@UserUser (ID:810192102)</h2>
      <div class="transfer-info">
        <h2 class="deposit-coin color-white">+ 0,0244 BTC</h2>
        <h3 class="deposit-price color-white">≈ 100.234$</h3>
      </div>
      <button class="return-btn border-gradient">
        <div class="left-blur"></div>
        <div class="btn-icon">
          <img :src="require('@/assets/svg/repeat.svg')" alt="" />
        </div>
        Repeat
      </button>
      <div class="deposit-account">
        <h2 class="deposit-account__title">Transfer from an account</h2>
        <div class="deposit-block">
          <div class="coin-img">
            <img :src="require('@/assets/svg/tether-usdt.svg')" alt="" />
          </div>
          <div class="coin-info">
            <div class="coin-info-head">
              <h3 class="coin-name">0,015424 BTC</h3>
              <p class="coin-price">(≈ $1.456)</p>
            </div>
            <div class="coin-account-info">BTC Account: ***2235</div>
          </div>
        </div>
      </div>
      <div class="requisites">
        <h2 class="requisites-title">requisites</h2>
        <div class="sender">
          <p class="label">Sender</p>
          <h3 class="user-info">@UserUser (ID:810192102)</h3>
        </div>
      </div>
    </draggable-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CalendarOracle from '~/components/calendar-oracle.vue'
import ChartLabel from '~/components/charts/chart-labels.vue'
import TransferHistoryChart from '~/components/charts/TransferHistoryChart.vue'

@Component({
  components: {
    CalendarOracle,
    TransferHistoryChart,
    ChartLabel,
  },
})
export default class HistoryPage extends Vue {
  layout() {
    return 'mobile'
  }

  expensis = true
  deposit = false
  isOpen = false
  depositModal = false
  expensesModal = false

  expensisChart = true

  expensisData = [
    {
      id: 1,
      name: 'Escrow -',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      name: 'P2P',
      price: '$1,923.15',
      color: 'color-p2p',
    },
    {
      id: 3,
      name: 'SWAP',
      price: '$1,923.15',
      color: 'color-swap',
    },
    {
      id: 4,
      name: 'Transfers',
      price: '$1,923.15',
      color: 'color-transfers',
    },
    {
      id: 5,
      name: 'Prepaid Cards',
      price: '$1,923.15',
      color: 'color-prepaid',
    },
    {
      id: 6,
      name: 'Bills',
      price: '$1,923.15',
      color: 'color-bills',
    },
    {
      id: 7,
      name: 'Fees',
      price: '$1,923.15',
      color: 'color-fees',
    },
    {
      id: 8,
      name: 'Mixing',
      price: '$1,923.15',
      color: 'color-mixing',
    },
    {
      id: 9,
      name: 'Shops',
      price: '$1,923.15',
      color: 'color-shops',
    },
    {
      id: 10,
      name: 'OraclePay',
      price: '$1,923.15',
      color: 'color-oracle-pay',
    },
    {
      id: 11,
      name: 'Checks',
      price: '$1,923.15',
      color: 'color-checks',
    },
  ]

  chartData = {
    labels: ['Yanvar', 'Fevral', 'Mart'],
    datasets: [
      {
        label: 'Transferlar',
        data: [12, 19, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }

  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Oylik transferlar',
      },
    },
  }

  data = [
    {
      id: 1,
      img: require('@/assets/svg/litecoin-ltc.svg'),
      name: 'LTC',
      selected: false,
    },
    {
      id: 2,
      img: require('@/assets/svg/bitcoin.svg'),
      name: 'BTC',
      selected: false,
    },
    {
      id: 3,
      img: require('@/assets/svg/tether-usdt.svg'),
      name: 'USDT',
      selected: false,
    },
  ]

  historyData = [
    {
      id: 1,
      date: '21.12.24',
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
      date: '15.12.24',
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
      date: '25.02.25',
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
      date: '21.12.24',
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

  openCalendar(event: MouseEvent) {
    ;(this.$refs.calendar as CalendarOracle).openCalendar()
    this.isOpen = true
    const target = (event.target as HTMLElement).closest(
      '.input-calendar-action'
    ) as HTMLElement | null

    if (!target) return

    const rect = target.getBoundingClientRect()
    alert(`Top: ${rect.top}, Left: ${rect.left}`)

    alert(`Top: ${rect.top}, Left: ${rect.left}`)
    const calendarElement = document.querySelector(
      '.flatpickr-calendar'
    ) as HTMLElement

    if (calendarElement) {
      calendarElement.style.position = 'fixed'
      calendarElement.style.top = `${rect.top + 40}px`
      calendarElement.style.left = `${rect.left - 322}px`
      calendarElement.style.visibility = 'visible'
      calendarElement.style.opacity = '1'
      setTimeout(() => {}, 100)
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/pages/history-page.scss' as *;
</style>
