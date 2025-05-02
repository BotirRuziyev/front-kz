<template>
  <div class="history-page p2p-history">
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
          @openModal="isEscrow = true"
        />
        <transfer-history-item
          v-if="expensis && !deposit"
          :data="historyData"
          color="color-brown"
          @openModal="isEscrow = true"
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
        @openModal="sentOpenModal"
      />
      <transfer-history-item
        v-if="expensis && !deposit"
        :data="historyData"
        color="color-white"
        @openModal="sentOpenModal"
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
      class="history-successfully__modal p2p-history"
      :is-visible="isEscrow"
      @close="isEscrow = false"
    >
      <div class="modal-head">
        <button class="close-btn" @click="isEscrow = false">
          <CloseIcon />
        </button>
        <div class="coin-icon">
          <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
        </div>
        <h3 class="modal-title">P2P Transaction Details</h3>
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
              <h5 class="info-top__text">Deal ID</h5>
              <h5 class="info-top__text">Status</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">ESC-10932</h5>
              <h5 class="info-bottom__text">Completed</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Type</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">
                Crypto2Fiat (Your purchased Fiat)
              </h5>
            </div>
          </li>
          <li class="list-item user-item">
            <div class="info-head">
              <h5 class="info-top__text">Counterparty</h5>
              <h5 class="info-bottom__text">User name</h5>
            </div>
            <div class="info-bottom">
              <div class="user-img">
                <img :src="require('@/assets/png/zaglushka.png')" alt="" />
              </div>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Paid with:</h5>
            </div>
            <div class="info-bottom">
              <div class="coin-icon">
                <img :src="require('@/assets/svg/litecoin-ltc.svg')" alt="" />
              </div>
              <h5 class="info-bottom__text">***3213</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Your FIat Payment Method</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">EUR (Europe) - PayPal</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Reason</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text">Held Funds – P2P Exchange</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Amount Paid</h5>
              <h5 class="info-top__text">Received Fiat</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text total-bottom__text">
                101 USDT <span>≈ $98.98</span>
              </h5>
              <h5 class="info-bottom__text total-bottom__text">100 USD</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="info-top__text">Inclduing Fees</h5>
            </div>
            <div class="info-bottom">
              <h5 class="info-bottom__text issuance-bottom__text">
                0.05 BTC <span>≈ $5 USD</span>
              </h5>
            </div>
          </li>
        </ul>
      </div>
      <Nuxt-link to="#" class="more-btn">Go to Exchange Page</Nuxt-link>
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
import CopyIcon from '@/assets/svg/copy.svg?inline'
// @ts-ignore
import CloseIcon from '@/assets/svg/close.svg?inline'

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
    CopyIcon,
    CloseIcon,
  },
})
export default class EscrowHistoryPage extends Vue {
  searchIcon = true
  search = false
  allCheck = false
  step = 0
  stepDeposit = 0
  activeExpensesType: string | null = null
  activeDepositType: string | null = null
  pageTitle = 'History'
  expensisTitle = 'P2P'
  depositTitle = 'P2P'
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
  isInternal = false
  isExternal = false
  isEscrow = false
  isSentExternal = false
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
          description: 'Payout Received for Deal: ESC-10932',
          amount: '0,0244 TON',
          title: 'Counterparty: @MerchantName',
          price: '100.234$',
        },
        {
          _id: 2,
          img: require('@/assets/svg/ton.svg'),
          description: 'Refund for Deal: ESC-10932',
          amount: '0,0244 TON',
          title: 'Counterparty: @MerchantName',
          price: '100.234$',
        },
      ],
    },
  ]

  monthSelected(i: any) {
    this.selectedMonth = i
  }

  expensisSelect() {
    this.isExLabSelected = false
  }

  depositSelect() {
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

  receivedOpenModal(name: string) {
    if (name === 'Internal Deposit') {
      this.isInternal = true
    } else {
      this.isExternal = true
    }
  }

  sentOpenModal(name: string) {
    if (name === 'Internal Deposit') {
      this.isEscrow = true
    } else {
      this.isSentExternal = true
    }
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
