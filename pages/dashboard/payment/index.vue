<template>
  <div class="payment-dashboard">
    <input-oracle :search="true" placeholder="Search" />
    <dashboard-home />
    <ul class="market-ticker">
      <li v-for="item of 4" :key="item" class="market-ticker__item">
        <div class="market-ticker__icon">
          <img :src="require('@/assets/svg/btc-icon.svg')" alt="" />
        </div>
        <div class="market-ticker__body">
          <div class="body-head">
            <div class="market-ticker__pair">BTC/USDT</div>
            <div :class="['coin-status__icon negative']">
              <WalletIcon />
            </div>
            <div :class="['coin-change negative']">-3%</div>
          </div>
          <div class="market-ticker__price">83,322</div>
        </div>
      </li>
    </ul>
    <div class="wallet-overview">
      <div class="wallet-balance">
        <div class="left-block">
          <h4 class="balance-title">Your Overall Balance</h4>
          <div class="wallet-balance__info">
            <div class="coin-icon">
              <span v-if="selectedCoin === 'USD'" class="coin-symbol">$</span>
              <img
                v-else
                :src="selectedIcon"
                alt="coin icon"
                class="coin-icon"
              />
            </div>
            <h3 class="wallet-balance__value">1,621. 00</h3>
            <div class="wallet-select__wrapper">
              <select
                id="wallet"
                v-model="selectedCoin"
                name="wallet"
                class="wallet-select"
                @change="updateIcon"
              >
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="LTC">LTC</option>
                <option value="TON">TON</option>
                <option value="ETC">ETC</option>
              </select>
            </div>
          </div>
        </div>
        <div class="wallet-history">
          <nuxt-link to="#" class="history-link">
            History
            <ArrowIcon />
          </nuxt-link>
        </div>
      </div>
      <ul class="wallet-actions">
        <li v-for="coin of coins" :key="coin.id" class="wallet-action">
          <button class="wallet-action__btn">
            <div class="coin-icon">
              <img :src="coin.img" alt="" />
            </div>
            <div class="wallet-action__body">
              <div class="left-block">
                <div class="coin-info">
                  <h3 class="coin-name">{{ coin.name }}</h3>
                  <div
                    :class="[
                      'coin-status__icon',
                      {
                        negative: !isPositive(coin.change),
                      },
                    ]"
                  >
                    <WalletIcon />
                  </div>
                  <div
                    :class="[
                      'coin-change',
                      {
                        positive: isPositive(coin.change),
                        negative: !isPositive(coin.change),
                      },
                    ]"
                  >
                    {{ coin.change }}
                  </div>
                </div>
              </div>
              <div class="right-block">
                <h4 class="coin-amount">{{ coin.amount }}</h4>
                <h4 class="coin-price">{{ coin.usdValue }}</h4>
              </div>
            </div>
          </button>
        </li>
      </ul>
      <div class="wallet-action-buttons">
        <new-oracle-button
          text="Deposit"
          :icon="require('@/assets/svg/arrow-down.svg')"
          @click="openDepositModal"
        />
        <new-oracle-button
          text="Send"
          :icon="require('@/assets/svg/arrow-up.svg')"
          @click="openWithdrawModal"
        />
        <new-oracle-button
          text="Swap"
          :icon="require('@/assets/svg/exchange.svg')"
        />
      </div>
    </div>
    <div class="recent-transactions">
      <div class="block-head">
        <h2 class="block-title">Recent transactions</h2>
      </div>
      <ul class="recent-transactions__cards">
        <li class="cart-item">
          <div class="card-icon">
            <ArrowUpIcon />
          </div>
          <p class="label">Transfer to @username</p>
        </li>
        <li class="cart-item">
          <div class="card-icon">
            <SwapIcon />
          </div>
          <p class="label">Swap BTC to LTC</p>
        </li>
        <li class="cart-item">
          <div class="card-icon">
            <WithdrawIcon />
          </div>
          <p class="label">Withdraw from *2121</p>
        </li>
        <li class="cart-item">
          <div class="card-icon">
            <MixingIcon />
          </div>
          <p class="label">Mixing withdrawn</p>
        </li>
      </ul>
    </div>
    <div class="qr-payment">
      <new-oracle-button
        text="QR Payment"
        :icon="require('@/assets/svg/qr-scan.svg')"
      />
    </div>
    <div class="send-to">
      <div class="block-head">
        <h2 class="block-title">Send to</h2>
        <label for="send-search" class="send-user__search">
          <input
            id="send-search"
            v-model="searchQuery"
            type="search"
            class="form-input"
            placeholder="Search"
            @input="filtersendTo"
          />
          <div class="search-btn">
            <SearchIcon />
          </div>
        </label>
      </div>
      <ul class="send-users">
        <li v-for="user of filteredsendTo" :key="user.id" class="user-item">
          <div class="user-img">
            <img src="@/assets/png/zaglushka.png" alt="" />
          </div>
          <h4 class="user-name">{{ user.name }}</h4>
        </li>
      </ul>
    </div>
    <div class="dashboard-sections">
      <div class="dashboard-sections__item">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">Bills</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="require('@/assets/svg/plus.svg')" alt="" />
            </div>
            Create Bill
          </nuxt-link>
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="require('@/assets/svg/bill-icon.svg')" alt="" />
            </div>
            Bill pay
          </nuxt-link>
        </div>
      </div>
      <div class="dashboard-sections__item mixing">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">Mixing</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="require('@/assets/svg/plus.svg')" alt="" />
            </div>
            <span>Create a Mix</span>
          </nuxt-link>
        </div>
      </div>
      <div class="dashboard-sections__item escrow">
        <div class="block-head">
          <nuxt-link to="#" class="head-link">
            <h2 class="block-title">Escrow</h2>
            <div class="icon">
              <ArrowIcon />
            </div>
          </nuxt-link>
        </div>
        <div class="sections-body">
          <nuxt-link to="#" class="sections-btn">
            <div class="icon">
              <img :src="require('@/assets/svg/plus.svg')" alt="" />
            </div>
            <span>Create a Deal</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <draggable-modal
      class="select-method__modal"
      :is-open="depositModal"
      @close="depositModal = false"
    >
      <h2 class="modal-title">Select Deposit Method</h2>
      <ul class="select-method__list">
        <li
          v-for="deposit of depositOptions"
          :key="deposit.id"
          class="method-item"
        >
          <div class="method-img">
            <img :src="deposit.img" alt="" />
          </div>
          <div class="item-body">
            <h3 class="method-name">{{ deposit.title }}</h3>
            <p class="method-description">
              {{ deposit.description }}
            </p>
          </div>
        </li>
      </ul>
    </draggable-modal>
    <draggable-modal
      class="select-method__modal"
      :is-open="withdrawModal"
      @close="withdrawModal = false"
    >
      <h2 class="modal-title">Select Withdraw Method</h2>
      <ul class="select-method__list">
        <li
          v-for="withdraw of withdrawOptions"
          :key="withdraw.id"
          class="method-item"
        >
          <div class="method-img">
            <img :src="withdraw.img" alt="" />
          </div>
          <div class="item-body">
            <h3 class="method-name">{{ withdraw.title }}</h3>
            <p class="method-description">
              {{ withdraw.description }}
            </p>
          </div>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ArrowIcon from '@/assets/svg/arrow-left.svg?inline'
// @ts-ignore
import WalletIcon from '@/assets/svg/wallet-status.svg?inline'
// @ts-ignore
import ArrowUpIcon from '@/assets/svg/arrow-up.svg?inline'
// @ts-ignore
import SwapIcon from '@/assets/svg/exchange.svg?inline'
// @ts-ignore
import WithdrawIcon from '@/assets/svg/withdraw.svg?inline'
// @ts-ignore
import MixingIcon from '@/assets/svg/mixing-icon.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/search.svg?inline'

@Component({
  components: {
    ArrowIcon,
    WalletIcon,
    ArrowUpIcon,
    SwapIcon,
    WithdrawIcon,
    MixingIcon,
    SearchIcon,
  },
})
export default class PaymentDashboardPage extends Vue {
  selectedCoin: string = 'USD'
  selectedIcon: string = ''
  private searchQuery = ''

  depositModal = false
  withdrawModal = false

  layout() {
    return 'mobile'
  }

  coins = [
    {
      id: 1,
      img: require('@/assets/svg/btc-icon.svg'),
      name: 'BTC',
      change: '+3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 2,
      img: require('@/assets/svg/ltc-icon.svg'),
      name: 'LTC',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 3,
      img: require('@/assets/svg/ton-icon.svg'),
      name: 'TON',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
    {
      id: 4,
      img: require('@/assets/svg/etc-icon.svg'),
      name: 'ETC',
      change: '-3%',
      amount: 0.00320321,
      cardNumber: 3213,
      usdValue: '$1233.32',
    },
  ]

  prepaidCards = [
    {
      id: 1,
      name: 'VISA',
      number: '3213',
      img: require('@/assets/svg/visa.svg'),
    },
    {
      id: 2,
      name: 'MsC',
      number: '8262',
      img: require('@/assets/svg/mastercard.svg'),
    },
    {
      id: 3,
      name: 'AMEX',
      number: '0912',
      img: require('@/assets/svg/amex.svg'),
    },
    {
      id: 4,
      name: 'ORACLE',
      number: '4569',
      img: require('@/assets/svg/oracle-icon.svg'),
    },
  ]

  depositOptions = [
    {
      id: 1,
      img: require('@/assets/svg/arrow-down.svg'),
      title: 'External Deposit',
      description: 'Deposit crypto from external wallet',
    },
    {
      id: 2,
      img: require('@/assets/svg/p2p-icon.svg'),
      title: 'P2P Deposit',
      description: 'Receive funds via P2P deal from another user',
    },
    {
      id: 3,
      img: require('@/assets/svg/oracle-icon.svg'),
      title: 'Internal Transfer In',
      description: 'Get money from another Oracle user',
    },
    {
      id: 4,
      img: require('@/assets/svg/bill-icon.svg'),
      title: 'Create Bill',
      description: 'Collect payments via Bills',
    },
  ]

  withdrawOptions = [
    {
      id: 1,
      img: require('@/assets/svg/arrow-down.svg'),
      title: 'External Withdrawal',
      description: 'Withdraw crypto to external wallet',
    },
    {
      id: 2,
      img: require('@/assets/svg/p2p-icon.svg'),
      title: 'P2P Exchange',
      description: 'Exchange crypto to fiat via P2P exchange',
    },
    {
      id: 3,
      img: require('@/assets/svg/oracle-icon.svg'),
      title: 'Internal Transfer Out',
      description: 'Send money to someone',
    },
    {
      id: 4,
      img: require('@/assets/svg/bill-icon.svg'),
      title: 'Bill Payment',
      description: 'Pay Bills',
    },
  ]

  private sendTo = [
    {
      id: 1,
      name: 'Barbara Martinez',
    },
    {
      id: 2,
      name: 'Patricia Martin',
    },
    {
      id: 3,
      name: 'Michael Anderson',
    },
    {
      id: 4,
      name: 'Patricia Lopez',
    },
  ]

  private filteredsendTo = [...this.sendTo]

  private filtersendTo(): void {
    console.log(this.searchQuery)

    this.filteredsendTo = this.sendTo.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  isPositive(change: string): boolean {
    return change.trim().startsWith('+')
  }

  updateIcon() {
    const iconMap: Record<string, string> = {
      BTC: require('@/assets/svg/btc-icon.svg'),
      LTC: require('@/assets/svg/ltc-icon.svg'),
      TON: require('@/assets/svg/ton-icon.svg'),
      ETC: require('@/assets/svg/etc-icon.svg'),
    }

    this.selectedIcon = iconMap[this.selectedCoin] || ''
  }

  mounted() {
    this.updateIcon()
  }

  openDepositModal() {
    // this.depositModal = true
    // this.$nuxt.$emit('open-modal')
  }

  openWithdrawModal() {
    // this.withdrawModal = true
    // this.$nuxt.$emit('open-modal')
  }
}
</script>

<style lang="scss">
.payment-dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 14px 0 90px;

  .block-head {
    margin-bottom: 8px;
    .block-title {
      font-family: 'Hector', sans-serif;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 0.05em;
      text-transform: capitalize;
      color: #fff;
    }
  }

  .market-ticker {
    width: calc(100% + 32px);
    margin-left: -16px;
    padding: 0 16px;
    display: flex;
    gap: 8px;
    overflow: auto;

    &::-webkit-scrollbar {
      height: 0;
    }
    &__item {
      display: flex;
      align-items: center;
      gap: 9px;
      border: 1px solid #2b2741;
      border-radius: 12px;
      padding: 9px 16px 9px 11px;
      white-space: nowrap;
    }
    &__icon {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .body-head {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    &__pair {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    .coin-status__icon {
      line-height: 0;
      &.negative {
        svg {
          transform: rotate(180deg);

          path {
            fill: #f64e2a;
          }
        }
      }
    }
    .coin-change {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 10px;
      line-height: 130%;
      color: #31f62a;
      &.negative {
        color: #f64e2a;
      }
    }
    &__price {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #7a74ba;
    }
  }

  .wallet-overview {
    .wallet-balance {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      .left-block {
        .balance-title {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }

        .wallet-balance__info {
          display: flex;
          align-items: center;
          gap: 8px;

          .coin-icon {
            height: 100%;

            span {
              font-family: 'Hector', sans-serif;
              font-weight: 400;
              font-size: 32px;
              line-height: 125%;
              color: #fff;
            }
          }

          .wallet-balance__value {
            font-family: 'Hector', sans-serif;
            font-weight: 400;
            font-size: 32px;
            line-height: 125%;
            color: #fff;
          }

          .wallet-select__wrapper {
            display: flex;
            align-items: center;

            .wallet-select {
              background: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              background: none;
              cursor: pointer;
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 130%;
              color: #fff;

              &:checked {
                outline: none;
                border: none;
              }

              option {
                background: #000;
              }
            }
          }
        }
      }

      .wallet-history {
        .history-link {
          display: flex;
          align-items: center;
          gap: 7px;
          border-radius: 12px;
          padding: 7px 10px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #b2aaf9;
          transition: 0.3s;

          &:hover {
            color: #fff;

            svg {
              path {
                stroke: #fff;
              }
            }
          }

          svg {
            width: 7px;

            path {
              stroke: #b2aaf9;
              transition: 0.3s;
            }
          }
        }
      }
    }

    .wallet-actions {
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-bottom: 16px;
      padding: 0 16px;
      display: flex;
      gap: 8px;
      overflow: auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      .wallet-action {
        &__btn {
          width: 100%;
          display: flex;
          gap: 10px;
          border: 1px solid #2b2741;
          border-radius: 12px;
          padding: 12px 14px 8px 12px;
          cursor: pointer;
          .coin-icon {
            min-width: 24px;
            min-height: 24px;
            width: 24px;
            height: 24px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .wallet-action__body {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            gap: 8px;

            .left-block {
              .coin-info {
                display: flex;
                align-items: center;
                gap: 4px;

                .coin-name {
                  font-family: 'Roboto', sans-serif;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 135%;
                  color: #fff;
                }

                .coin-status__icon {
                  margin-left: 3px;
                  line-height: 0;

                  &.negative {
                    svg {
                      transform: rotate(180deg);

                      path {
                        fill: #f64e2a;
                      }
                    }
                  }
                }

                .coin-change {
                  font-family: 'Inter', sans-serif;
                  font-weight: 500;
                  font-size: 10px;
                  line-height: 130%;

                  &.positive {
                    color: #31f62a;
                  }

                  &.negative {
                    color: #f64e2a;
                  }
                }
              }
            }

            .right-block {
              .coin-amount {
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                font-size: 12px;
                line-height: 135%;
                color: #fff;
              }

              .coin-price {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 12px;
                line-height: 135%;
                text-align: left;
                color: #7a74ba;
              }
            }
          }
        }
      }
    }

    .wallet-action-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;

      .new-oracle-button {
        padding: 9px 0;
        line-height: 18px;
      }
    }
  }

  .recent-transactions {
    &__cards {
      display: flex;
      gap: 8px;
      width: calc(100% + 32px);
      margin-left: -16px;
      padding: 0 16px;
      overflow: auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      .cart-item {
        min-width: 104px;
        border-radius: 12px;
        padding: 10px;
        background: #13121b;
        .card-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #262530;
          border-radius: 8px;
          margin-bottom: 28px;
          svg {
            width: 20px;
            height: 20px;
          }
        }
        .label {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #fff;
        }
      }
    }
  }

  .send-to {
    .block-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      .send-user__search {
        max-width: 49px;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 12px;
        border: 1px solid #2b2741;
        border-radius: 8px;
        border-color: transparent;
        transition: 0.3s;
        &:focus-within {
          max-width: 210px;
          border-color: #2b2741;
          .form-input {
            width: 100%;
          }
        }
        .form-input {
          width: 100%;
          background: transparent;
          border: 0;
          font-family: 'Nunito', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 120%;
          color: #fff;
          transition: 0.3s;
          &:focus {
            outline: none;
          }
          &::placeholder {
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
            font-size: 14px;
            line-height: 120%;
            color: #7a74ba;
          }
        }
        .search-btn {
          cursor: pointer;
          svg {
            path {
              stroke: #fff;
            }
          }
        }
      }
    }
    .send-users {
      display: flex;
      gap: 12px;
      overflow: auto;
      width: calc(100% + 32px);
      margin-left: -16px;
      padding: 0 10px;
      &::-webkit-scrollbar {
        height: 0;
      }
      .user-item {
        width: 80px;
        min-width: 80px;
        .user-img {
          margin-bottom: 6px;
          text-align: center;
          img {
            width: 48px;
            height: 48px;
            border-radius: 100%;
          }
        }
        .user-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          text-align: center;
          color: #fff;
        }
      }
    }
  }

  .dashboard-sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &__item {
      &.escrow,
      &.mixing {
        .sections-body {
          .sections-btn {
            span {
              display: block;
              width: calc(100% - 68px);
              text-align: center;
            }
          }
        }
      }
      .block-head {
        padding: 4px 0;
        .head-link {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      }
      .sections-body {
        display: flex;
        gap: 12px;
        .sections-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          padding: 10px;
          background: #13121b;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
          .icon {
            width: 32px;
            height: 32px;
            min-width: 32px;
            min-height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: #262530;
            line-height: 0;
          }
        }
      }
    }
  }

  .select-method__modal {
    display: flex;
    flex-direction: column;
    justify-content: end;

    .draggable-modal-content {
      width: 100%;
      height: auto;

      &__in {
        min-height: auto;
      }
    }

    .modal-title {
      margin-bottom: 10px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 140%;
      color: #fff;
    }

    .select-method__list {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .method-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1e1d28;
        border-radius: 12px;
        padding: 12px;

        &:first-child {
          .method-img {
            img {
              height: 20px;
            }
          }
        }

        &:nth-child(3) {
          .method-img {
            img {
              height: 20px;
            }
          }
        }

        .method-img {
          width: 36px;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #262530;
        }

        .method-name {
          width: 100%;
          margin-bottom: 4px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
        }

        .method-description {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          color: #b2aaf9;
        }
      }
    }
  }
}
</style>
