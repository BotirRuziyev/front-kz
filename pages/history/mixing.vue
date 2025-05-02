<template>
  <div class="history-page mixing__history">
    <div v-if="!search">
      <block-nav-bar
        to="/history"
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
          <ExpensisDoughnutChart
            :data="expensesText"
            :active-expensis-type="activeExpensesType"
            :step="step"
            :chart-data="chartData"
          />
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
          <DepositDoughnutChart
            :data="depositText"
            :active-deposit-type="activeDepositType"
            :step-deposit="stepDeposit"
            :chart-data="chartData"
          />
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
                  ;(expensis = false),
                    (deposit = true),
                    (expensisChart = false),
                    (depositChart = true)
                "
              >
                Deposits
              </button>
              <button
                class="expenses-btn tab-btn"
                :class="{ active: expensis }"
                @click="
                  expensis = true
                  deposit = false
                  expensisChart = true
                  depositChart = false
                "
              >
                Expenses
              </button>
            </div>
          </div>
        </div>
        <h2 class="transaction-title">Transaction</h2>
        <transfer-history-item
          v-if="deposit && !expensis"
          :data="historyData"
          color="color-green"
          @openModal="isDeposit = true"
        />
        <transfer-history-item
          v-if="expensis && !deposit"
          :data="historyData"
          color="color-brown"
          @openModal="isExpensis = true"
        />
      </div>
    </div>
    <div v-else class="history-search">
      <div class="search-head">
        <input-oracle
          :search="true"
          placeholder="Search..."
          @openCalendar="openCalendar"
        />
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
    <history-modal
      class="history-successfully__modal mixing-deposit__modal"
      :is-visible="isDeposit"
      @close="isDeposit = false"
    >
      <div class="modal-head">
        <button class="close-btn" @click="isDeposit = false">
          <CloseIcon />
        </button>
        <div class="coin-icon">
          <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
        </div>
        <h3 class="modal-title">Mixing Refund Details</h3>
        <div class="border-bottom">
          <svg
            width="290"
            height="1"
            viewBox="0 0 290 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0.5H290" stroke="#60578E" stroke-dasharray="8 8" />
          </svg>
        </div>
      </div>
      <div class="user-info">
        <ul class="user-info__list">
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Date</h5>
              <h5 class="info-top__text">Time</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">Feb 20, 2025</h5>
              <h5 class="info-bottom__text">11:23 AM</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">MIX ID</h5>
              <h5 class="info-top__text">Status</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">MIX-2023-00123</h5>
              <h5 class="info-bottom__text">Completed</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Amount Refunded</h5>
              <h5 class="info-top__text">Net Amount</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text total-bottom__text">
                0.5 BTC <span>≈ $98.98</span>
              </h5>
              <h5 class="info-bottom__text total-bottom__text">
                24.5 ETH <span>≈ $98.98</span>
              </h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Transaction Fee</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text total-bottom__text">
                0.5 BTC <span>≈ $98.98</span>
              </h5>
            </div>
          </li>
        </ul>
      </div>
      <Nuxt-link to="#" class="more-btn">Learn more</Nuxt-link>
    </history-modal>
    <history-modal
      class="history-successfully__modal mixing-expensis__modal"
      :is-visible="isExpensis"
      @close="isExpensis = false"
    >
      <div class="modal-head">
        <button class="close-btn" @click="isExpensis = false">
          <CloseIcon />
        </button>
        <div class="coin-icon">
          <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
        </div>
        <h3 class="modal-title">Mixing Hold Details</h3>
        <div class="border-bottom">
          <svg
            width="290"
            height="1"
            viewBox="0 0 290 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0.5H290" stroke="#60578E" stroke-dasharray="8 8" />
          </svg>
        </div>
      </div>
      <div class="user-info">
        <ul class="user-info__list">
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Date</h5>
              <h5 class="info-top__text">Time</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">Feb 20, 2025</h5>
              <h5 class="info-bottom__text">11:23 AM</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">MIX ID</h5>
              <h5 class="info-top__text">Status</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">MIX-2023-00123</h5>
              <h5 class="info-bottom__text">On Hold</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Reason</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">Funds locked for mixing</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Amount Held</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text total-bottom__text">
                100 USDT <span>≈ $98.98</span>
              </h5>
            </div>
          </li>
        </ul>
      </div>
      <Nuxt-link to="#" class="more-btn">Learn more</Nuxt-link>
    </history-modal>
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
// @ts-ignore
import CoinIcon from '@/assets/svg/litecoin-ltc.svg?inline'
// @ts-ignore
import CloseIcon from '@/assets/svg/close.svg?inline'

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
    CoinIcon,
    CloseIcon,
  },
})
export default class MixingHistoryPage extends Vue {
  searchIcon = true
  search = false
  allCheck = false
  step = 0
  stepDeposit = 0
  activeExpensesType: string | null = null
  activeDepositType: string | null = null
  pageTitle = 'History'
  expensisTitle = 'Mixing'
  depositTitle = 'Mixing'
  expensis = false
  deposit = true
  isOpen = false
  filterModal = false
  depositModal = false
  expensesModal = false
  isExLabSelected = true
  isDeLabSelected = true
  expensisChart = true
  depositChart = false
  isDeposit = false
  isExpensis = false
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
          title: 'Fee: 0.0001 BTC',
          amount: '0,0244 TON',
          description: 'MIX-2025-00123: Refunded',
          price: '100.234$',
        },
      ],
    },
  ]

  monthSelected(i: any) {
    this.selectedMonth = i
  }

  expensisSelect(name: string) {
    this.expensisTitle = name
    this.isExLabSelected = false
  }

  depositSelect(name: string) {
    this.depositTitle = name
    this.isDeLabSelected = false
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
