<template>
  <div class="history-page transfer-history">
    <block-nav-bar to="#" text="transfers History" />
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
            @click="
              expensis = true
              deposit = false
              expensisChart = true
              depositChart = false
              chartBack()
            "
          >
            Expenses
          </button>
          <button
            class="deposits-btn tab-btn"
            :class="{ active: deposit }"
            @click="
              ;(expensis = false),
                (deposit = true),
                (expensisChart = false),
                (depositChart = true),
                chartBack()
            "
          >
            deposits
          </button>
        </div>
      </div>
    </div>
    <div v-if="expensis && !deposit" class="expenses-content">
      <div class="expensis-chart">
        <form-select
          v-if="step != 2"
          :data="data"
          label="Choose a cryptocurrency"
        />
        <ExpensisDoughnutChart
          :data="expensesText"
          :active-expensis-type="activeExpensesType"
          :step="step"
          :chart-data="chartData"
          @chartBack="chartBack"
        />
        <div class="chart-labels">
          <ChartLabel
            :step="step"
            :data="expensisData"
            :title="expensisTitle"
            @item-selected="expensisSelect"
          />
        </div>
      </div>
      <transfer-history-item
        :data="historyData"
        color="color-white"
        @openModal=";(expensesModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <div v-if="deposit && !expensis" class="deposits-content">
      <div class="expensis-chart">
        <form-select v-if="stepDeposit != 2" :data="data" label="All crypto" />
        <DepositDoughnutChart
          :data="depositText"
          :active-deposit-type="activeDepositType"
          :step-deposit="stepDeposit"
          :chart-data="chartData"
          @chartBack="chartBack"
        />
        <div class="chart-labels">
          <ChartLabel
            :step="stepDeposit"
            :data="depositData"
            title="deposits"
            @item-selected="depositSelect"
          />
        </div>
      </div>
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
import ExpensisDoughnutChart from '~/components/charts/ExpensisDoughnutChart.vue'
import DepositDoughnutChart from '~/components/charts/DepositDoughnutChart.vue'

interface Payload {
  type: string
  step: number
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
  },
})
export default class TransfersHistoryPage extends Vue {
  layout() {
    return 'mobile'
  }

  step = 0
  stepDeposit = 0
  activeExpensesType: string | null = null
  activeDepositType: string | null = null
  pageTitle = 'History'
  expensisTitle = 'Escrow'
  depositTitle = 'deposits'

  expensis = true
  deposit = false
  isOpen = false
  depositModal = false
  expensesModal = false

  expensisChart = true
  depositChart = false

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
      type: 'escrow',
      name: 'Escrow -',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      type: 'p2p',
      name: 'P2P',
      price: '$1,923.15',
      color: 'color-p2p',
    },
    {
      id: 3,
      type: 'swap',
      name: 'SWAP',
      price: '$1,923.15',
      color: 'color-swap',
    },
    {
      id: 4,
      type: 'transfers',
      name: 'Transfers',
      price: '$1,923.15',
      color: 'color-transfers',
    },
    {
      id: 5,
      type: '',
      name: 'Prepaid Cards',
      price: '$1,923.15',
      color: 'color-prepaid',
    },
    {
      id: 6,
      type: '',
      name: 'Bills',
      price: '$1,923.15',
      color: 'color-bills',
    },
    {
      id: 7,
      type: '',
      name: 'Fees',
      price: '$1,923.15',
      color: 'color-fees',
    },
    {
      id: 8,
      type: '',
      name: 'Mixing',
      price: '$1,923.15',
      color: 'color-mixing',
    },
    {
      id: 9,
      type: '',
      name: 'Shops',
      price: '$1,923.15',
      color: 'color-shops',
    },
    {
      id: 10,
      type: '',
      name: 'OraclePay',
      price: '$1,923.15',
      color: 'color-oracle-pay',
    },
    {
      id: 11,
      type: '',
      name: 'Checks',
      price: '$1,923.15',
      color: 'color-checks',
    },
  ]

  depositData = [
    {
      id: 1,
      type: 'escrow',
      name: 'Escrow -',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      type: 'p2p',
      name: 'P2P',
      price: '$1,923.15',
      color: 'color-p2p',
    },
    {
      id: 3,
      type: 'swap',
      name: 'SWAP',
      price: '$1,923.15',
      color: 'color-swap',
    },
    {
      id: 4,
      type: 'transfers',
      name: 'Transfers',
      price: '$1,923.15',
      color: 'color-transfers',
    },
    {
      id: 5,
      type: '',
      name: 'Prepaid Cards',
      price: '$1,923.15',
      color: 'color-prepaid',
    },
    {
      id: 6,
      type: '',
      name: 'Bills',
      price: '$1,923.15',
      color: 'color-bills',
    },
    {
      id: 7,
      type: '',
      name: 'Fees',
      price: '$1,923.15',
      color: 'color-fees',
    },
    {
      id: 8,
      type: '',
      name: 'Mixing',
      price: '$1,923.15',
      color: 'color-mixing',
    },
    {
      id: 9,
      type: '',
      name: 'Shops',
      price: '$1,923.15',
      color: 'color-shops',
    },
    {
      id: 10,
      type: '',
      name: 'OraclePay',
      price: '$1,923.15',
      color: 'color-oracle-pay',
    },
    {
      id: 11,
      type: '',
      name: 'Checks',
      price: '$1,923.15',
      color: 'color-checks',
    },
  ]

  expensesText: Text = {
    title: 'EXPENSES',
    price: '1,923$',
    date: '01.01.25 - 01.02.25',
  }

  depositText: Text = {
    title: 'receipts',
    price: '1,923$',
    date: '25.01.25 - 01.02.25',
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

  expensisSelect(payload: Payload) {
    this.activeExpensesType = payload.type
    this.expensisTitle = 'Escrow'
    this.pageTitle = 'escrow History'
    this.step = this.step !== 2 ? this.step + 1 : (this.step = 2)

    if (this.step === 1) {
      this.expensisData = [
        {
          id: 1,
          type: 'escrow',
          name: '@TopHitta228 (ID: 90192102)',
          price: '$593.15',
          color: 'color-escrow',
        },
        {
          id: 2,
          type: 'p2p',
          name: '@UserUser (ID: 810192102)',
          price: '$1,923.15',
          color: 'color-p2p',
        },
        {
          id: 3,
          type: 'swap',
          name: '@TopUser (ID: 10192102)',
          price: '$1,923.15',
          color: 'color-swap',
        },
        {
          id: 4,
          type: 'transfers',
          name: '@TopUser123 (ID: 70192102) ',
          price: '$1,923.15',
          color: 'color-transfers',
        },
      ]
      this.expensesText = {
        title: 'Escrow',
        price: '1,923$',
        date: '01.01.25 - 01.02.25',
      }
    } else {
      this.expensisData = this.expensisData.filter(
        (item) => item.type === payload.type
      )
      this.expensesText = {
        title: 'Escrow',
        price: '593$',
        percent: '22%',
        date: '01.01.25 - 01.02.25',
      }
    }
  }

  depositSelect(payload: Payload) {
    this.activeDepositType = payload.type
    this.depositTitle = 'Escrow'
    this.pageTitle = 'escrow History'
    this.stepDeposit =
      this.stepDeposit !== 2 ? this.stepDeposit + 1 : (this.stepDeposit = 2)
    if (this.stepDeposit === 1) {
      this.depositData = [
        {
          id: 1,
          type: 'escrow',
          name: '@TopHitta228 (ID: 90192102)',
          price: '$593.15',
          color: 'color-escrow',
        },
        {
          id: 2,
          type: 'p2p',
          name: '@UserUser (ID: 810192102)',
          price: '$1,923.15',
          color: 'color-p2p',
        },
        {
          id: 3,
          type: 'swap',
          name: '@TopUser (ID: 10192102)',
          price: '$1,923.15',
          color: 'color-swap',
        },
        {
          id: 4,
          type: 'transfers',
          name: '@TopUser123 (ID: 70192102) ',
          price: '$1,923.15',
          color: 'color-transfers',
        },
      ]
      this.depositText = {
        title: 'Escrow',
        price: '1,923$',
        date: '01.01.25 - 01.02.25',
      }
    } else {
      this.depositData = this.depositData.filter(
        (item) => item.type === payload.type
      )
      this.depositText = {
        title: 'Escrow',
        price: '1.256$',
        percent: '41%',
        date: '01.01.25 - 01.02.25',
      }
    }
  }

  chartBack() {
    this.chartData = {
      labels: ['Escrow', 'P2P', 'SWAP', 'Transfers'],
      datasets: [
        {
          data: [28, 25, 28, 19],
          backgroundColor: ['#f6c32a', '#f64e2a', '#902af6', '#2af653'],
          borderWidth: 0,
        },
      ],
    }
    this.pageTitle = 'History'
    this.expensisTitle = 'EXPENSES'
    this.expensesText = {
      title: 'Escrow',
      price: '1,923$',
      date: '01.01.25 - 01.02.25',
    }
    this.expensisData = [
      {
        id: 1,
        type: 'escrow',
        name: 'Escrow -',
        price: '$1,923.15',
        color: 'color-escrow',
      },
      {
        id: 2,
        type: 'p2p',
        name: 'P2P',
        price: '$1,923.15',
        color: 'color-p2p',
      },
      {
        id: 3,
        type: 'swap',
        name: 'SWAP',
        price: '$1,923.15',
        color: 'color-swap',
      },
      {
        id: 4,
        type: 'transfers',
        name: 'Transfers',
        price: '$1,923.15',
        color: 'color-transfers',
      },
      {
        id: 5,
        type: '',
        name: 'Prepaid Cards',
        price: '$1,923.15',
        color: 'color-prepaid',
      },
      {
        id: 6,
        type: '',
        name: 'Bills',
        price: '$1,923.15',
        color: 'color-bills',
      },
      {
        id: 7,
        type: '',
        name: 'Fees',
        price: '$1,923.15',
        color: 'color-fees',
      },
      {
        id: 8,
        type: '',
        name: 'Mixing',
        price: '$1,923.15',
        color: 'color-mixing',
      },
      {
        id: 9,
        type: '',
        name: 'Shops',
        price: '$1,923.15',
        color: 'color-shops',
      },
      {
        id: 10,
        type: '',
        name: 'OraclePay',
        price: '$1,923.15',
        color: 'color-oracle-pay',
      },
      {
        id: 11,
        type: '',
        name: 'Checks',
        price: '$1,923.15',
        color: 'color-checks',
      },
    ]

    this.expensesText = {
      title: 'receipts',
      price: '1,923$',
      date: '25.01.25 - 01.02.25',
    }
    this.depositData = [
      {
        id: 1,
        type: 'escrow',
        name: 'Escrow -',
        price: '$1,923.15',
        color: 'color-escrow',
      },
      {
        id: 2,
        type: 'p2p',
        name: 'P2P',
        price: '$1,923.15',
        color: 'color-p2p',
      },
      {
        id: 3,
        type: 'swap',
        name: 'SWAP',
        price: '$1,923.15',
        color: 'color-swap',
      },
      {
        id: 4,
        type: 'transfers',
        name: 'Transfers',
        price: '$1,923.15',
        color: 'color-transfers',
      },
      {
        id: 5,
        type: '',
        name: 'Prepaid Cards',
        price: '$1,923.15',
        color: 'color-prepaid',
      },
      {
        id: 6,
        type: '',
        name: 'Bills',
        price: '$1,923.15',
        color: 'color-bills',
      },
      {
        id: 7,
        type: '',
        name: 'Fees',
        price: '$1,923.15',
        color: 'color-fees',
      },
      {
        id: 8,
        type: '',
        name: 'Mixing',
        price: '$1,923.15',
        color: 'color-mixing',
      },
      {
        id: 9,
        type: '',
        name: 'Shops',
        price: '$1,923.15',
        color: 'color-shops',
      },
      {
        id: 10,
        type: '',
        name: 'OraclePay',
        price: '$1,923.15',
        color: 'color-oracle-pay',
      },
      {
        id: 11,
        type: '',
        name: 'Checks',
        price: '$1,923.15',
        color: 'color-checks',
      },
    ]
    this.step = 0
    this.stepDeposit = 0
  }

  openCalendar(event: MouseEvent) {
    ;(this.$refs.calendar as CalendarOracle).openCalendar()
    this.isOpen = true
    const target = (event.target as HTMLElement).closest(
      '.input-calendar-action'
    ) as HTMLElement | null

    if (!target) return

    const rect = target.getBoundingClientRect()
    const calendarElement = document.querySelector(
      '.flatpickr-calendar'
    ) as HTMLElement
    const inputElement = document.querySelector('.input') as HTMLElement
    const input = inputElement.getBoundingClientRect()

    if (calendarElement) {
      calendarElement.style.position = 'fixed'
      calendarElement.style.width = `${input.width}px`
      calendarElement.style.top = `${rect.top + 40}px`
      calendarElement.style.left = `auto`
      calendarElement.style.right = `${rect.right - input.width + 12}px`
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
