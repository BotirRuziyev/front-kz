<template>
  <div class="history-page checks-history">
    <block-nav-bar to="#" text="CHECKS HISTORY" />
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
            CREATED CHECKS
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
            CASHED CHECKS
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
          :active-created-type="activeCreatedType"
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
          :active-cashed-type="activeCashedType"
          :step-deposit="stepDeposit"
          :chart-data="chartData"
          @chart-back="chartBack"
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
      class="checks-modal"
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
      <h2 class="user-info">Check #912942-2024</h2>
      <div class="accordion">
        <button
          class="accordion-btn"
          :class="{ active: isSelectOpen }"
          @click="isSelectOpen = !isSelectOpen"
        >
          <span>
            3 of 3 activations left - 0.5 BTC per activation (1.5 BTC total)
          </span>
          <span class="arrown-icon">
            <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
          </span>
        </button>
        <transition name="accordion">
          <div v-show="isSelectOpen" class="accordion-body">
            <ul class="body-list">
              <li class="list-item">
                1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST
              </li>
              <li class="list-item">
                2nd Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST
              </li>
              <li class="list-item">
                3rd Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="transfer-info">
        <span class="deposit-coin">9.14 LTC</span>
        <span class="deposit-price">≈ 9,204.18$</span>
      </div>
      <div class="modal-buttons">
        <button class="tick-btn border-gradient">
          <div class="left-blur"></div>
          <div class="btn-icon">
            <img :src="require('@/assets/svg/tick-circle.svg')" alt="" />
          </div>
          Claim This Check
        </button>
        <button class="refresh-btn border-gradient">
          <div class="left-blur"></div>
          <div class="btn-icon">
            <img :src="require('@/assets/svg/refresh-circle.svg')" alt="" />
          </div>
          Claim This Check
        </button>
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
    ChartLabel,
    DepositDoughnutChart,
  },
})
export default class TransfersHistoryPage extends Vue {
  layout() {
    return 'mobile'
  }

  step = 0
  stepDeposit = 0
  activeCreatedType: string | null = null
  activeCashedType: string | null = null
  expensisTitle = 'CHECKS CREATED'
  depositTitle = 'CASHED CHECKS'

  expensis = true
  deposit = false
  isOpen = false
  isSelectOpen = false
  depositModal = false
  expensesModal = false

  expensisChart = true
  depositChart = false

  chartData = {
    labels: ['Active', 'Expired', 'Claimed'],
    datasets: [
      {
        data: [32, 32, 36],
        backgroundColor: ['#2A67F6', '#902AF6', '#F6C32A'],
        borderWidth: 0,
      },
    ],
  }

  expensisData = [
    {
      id: 1,
      type: 'claimed',
      name: 'Claimed',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      type: 'active',
      name: 'Active',
      price: '$1,923.15',
      color: 'color-checks',
    },
    {
      id: 3,
      type: 'expired',
      name: 'Expired',
      price: '$1,923.15',
      color: 'color-swap',
    },
  ]

  depositData = [
    {
      id: 1,
      type: 'claimed',
      name: 'Claimed',
      price: '$1,923.15',
      color: 'color-escrow',
    },
    {
      id: 2,
      type: 'active',
      name: 'Active',
      price: '$1,923.15',
      color: 'color-checks',
    },
    {
      id: 3,
      type: 'expired',
      name: 'Expired',
      price: '$1,923.15',
      color: 'color-swap',
    },
  ]

  expensesText: Text = {
    price: '12.234$',
    percent: '30%',
    date: '12.12.25 - 12.12.26',
  }

  depositText: Text = {
    price: '12.234$',
    percent: '30%',
    date: '12.12.25 - 12.12.26',
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
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '100.234$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
        {
          _id: 2,
          img: require('@/assets/svg/ton.svg'),
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '100.234$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
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
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '154.111$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
        {
          _id: 2,
          img: require('@/assets/svg/eth.svg'),
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '84.455$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
        {
          _id: 3,
          img: require('@/assets/svg/litecoin-ltc.svg'),
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '84.455$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
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
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '154.111$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
        {
          _id: 2,
          img: require('@/assets/svg/eth.svg'),
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '84.455$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
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
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '100.234$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
        {
          _id: 2,
          img: require('@/assets/svg/ton.svg'),
          title: '9:14 PM EST',
          amount: '0,0244 TON',
          description: 'Check #912942-2024',
          price: '100.234$',
          activations: {
            _title: '5 activations left out of 10',
            selected: false,
            list: [
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
              '1st Activation Claimed 12 Dec, 2024 by @UserUser at 9:14 PM EST',
            ],
          },
        },
      ],
    },
  ]

  expensisSelect(payload: Payload) {
    this.activeCreatedType = payload.type
    this.expensisTitle = 'CLAIMED'
    this.expensisData = []
  }

  depositSelect(payload: Payload) {
    this.activeCashedType = payload.type
    this.depositTitle = 'CLAIMED'

    this.depositData = []
  }

  chartBack() {
    this.expensisTitle = 'EXPENSES'
    this.expensesText = {
      price: '12.234$',
      percent: '30%',
      date: '12.12.25 - 12.12.26',
    }

    this.expensisData = [
      {
        id: 1,
        type: 'claimed',
        name: 'Claimed',
        price: '$1,923.15',
        color: 'color-escrow',
      },
      {
        id: 2,
        type: 'active',
        name: 'Active',
        price: '$1,923.15',
        color: 'color-checks',
      },
      {
        id: 3,
        type: 'expired',
        name: 'Expired',
        price: '$1,923.15',
        color: 'color-swap',
      },
    ]

    this.depositText = {
      price: '12.234$',
      percent: '30%',
      date: '12.12.25 - 12.12.26',
    }
    this.depositData = [
      {
        id: 1,
        type: 'claimed',
        name: 'Claimed',
        price: '$1,923.15',
        color: 'color-escrow',
      },
      {
        id: 2,
        type: 'active',
        name: 'Active',
        price: '$1,923.15',
        color: 'color-checks',
      },
      {
        id: 3,
        type: 'expired',
        name: 'Expired',
        price: '$1,923.15',
        color: 'color-swap',
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
