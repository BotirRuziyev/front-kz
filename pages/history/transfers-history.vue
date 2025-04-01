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
    <form-select :data="data" label="Choose a cryptocurrency" />
    <div v-if="expensis && !deposit" class="expenses-content">
      <transfer-history-item
        :data="historyData"
        color="color-white"
        @openModal=";(expensesModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <div v-if="deposit && !expensis" class="deposits-content">
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

@Component({
  components: {
    CalendarOracle,
  },
})
export default class TransfersHistoryPage extends Vue {
  layout() {
    return 'mobile'
  }

  expensis = true
  deposit = false
  isOpen = false
  depositModal = false
  expensesModal = false

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
.transfer-history {
  .block-nav-bar {
    .back-btn {
      border: 1px solid #f64e2a;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
      background: #0a090f;
    }
    span {
      display: block;
      width: calc(100% - 80px);
      text-align: center;
    }
  }
}
</style>
