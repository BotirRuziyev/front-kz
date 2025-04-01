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
            :class="createCheck ? 'expensis-bg' : 'deposit-bg'"
          ></div>
          <button
            class="create-check__btn tab-btn"
            :class="{ active: createCheck }"
            @click=";(createCheck = true), (cashedCheck = false)"
          >
            CREATED CHECKS
          </button>
          <button
            class="cashed-checks__btn tab-btn"
            :class="{ active: cashedCheck }"
            @click=";(createCheck = false), (cashedCheck = true)"
          >
            CASHED CHECKS
          </button>
        </div>
      </div>
    </div>
    <form-select :data="data" label="Choose a cryptocurrency" />
    <div v-if="createCheck && !cashedCheck" class="create-checks-content">
      <transfer-history-item
        :data="historyData"
        color="color-blue"
        @openModal=";(createModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <div v-if="cashedCheck && !createCheck" class="cashed-checks-content">
      <transfer-history-item
        :data="historyData"
        color="color-blue"
        @openModal=";(cashedModal = true), $nuxt.$emit('open-modal')"
      />
    </div>
    <draggable-modal
      class="checks-modal"
      :is-open="createModal"
      @close="createModal = false"
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

@Component({
  components: {
    CalendarOracle,
  },
})
export default class TransfersHistoryPage extends Vue {
  layout() {
    return 'mobile'
  }

  createCheck = true
  cashedCheck = false
  isOpen = false
  isSelectOpen = false
  cashedModal = false
  createModal = false

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
.checks-history {
  .transfer-history__wrapper {
    .transfer-history-item {
      .transfer-history__list {
        .transfer-item {
          align-items: start;
        }
      }
    }
  }
}
</style>
