<template>
  <div class="payment-dashboard">
    <input-oracle :search="true" placeholder="Search..." />
    <block-home-cards />
    <ul class="payment-dashboard-coins">
      <li v-for="(coin, index) in coins" :key="index" class="coin-item">
        <div class="coin-img">
          <img :src="coin.img" alt="" />
        </div>
        <div class="coin-info">
          <h4 class="coin-name">{{ coin.name }}</h4>
          <div class="account-coin">
            <p class="coin-amount">{{ coin.amount }}</p>
            <div class="coin-status" :class="{ green: coin.statusColor }">
              {{ coin.status }}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="faworits">
      <block-title-oracle text="Favorites" />
      <ul class="faworits-list">
        <li v-for="(coin, index) in faworits" :key="index" class="list-item">
          <nuxt-link to="#" class="list-item-link">
            <div class="coin-img">
              <img :src="coin.img" alt="" />
            </div>
            <h5 class="coin-name">{{ coin.name }}</h5>
          </nuxt-link>
        </li>
      </ul>
      <div class="faworits-buttons">
        <div class="deposit">
          <button class="faworit-btn">
            <div class="btn-img">
              <img :src="require('@/assets/svg/deposit.svg')" alt="" />
            </div>
            external deposit
          </button>
        </div>
        <div class="bills-and-qr-payment">
          <button class="faworit-btn">
            <div class="btn-img">
              <img :src="require('@/assets/svg/bills.svg')" alt="" />
            </div>
            Bills
          </button>
          <button class="faworit-btn">
            <div class="btn-img">
              <img :src="require('@/assets/svg/qr-payments.svg')" alt="" />
            </div>
            QR payments
          </button>
        </div>
      </div>
    </div>
    <div class="internal-tranfers">
      <block-title-oracle text="Internal tranfers" />
      <div class="internal-tranfers-in">
        <input-oracle :user="true" placeholder="Username or ID" />
        <h3 class="contact-title">Saved contacts</h3>
        <ul class="contact-list">
          <li
            v-for="(contact, index) in contacts"
            :key="index"
            class="list-item"
          >
            <nuxt-link to="#">
              <div class="contact-img">
                <img :src="contact.img" alt="" />
              </div>
              <span class="user-name">{{ contact.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <payment-dashboard-cards title="Exchange" :data="exchange" to="#" />
    <payment-dashboard-cards title="External" :data="external" to="#" />
    <payment-dashboard-cards title="Bills" :data="bills" to="#" />
    <payment-dashboard-cards title="Mixing" :data="mixing" to="#" />
    <payment-dashboard-cards title="escrow" :data="escrow" to="#" />
    <div class="pay-account">
      <h3 class="oracle-text">ORACLE</h3>
      <h3 class="pay-account-text">pay account</h3>
      <nuxt-link to="#" class="pay-account-btn">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.56836 1.75L6.06836 7L1.56836 12.25"
            stroke="#0A090F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// @ts-ignore
import btc from '@/assets/svg/btc.svg'
// @ts-ignore
import ton from '@/assets/svg/ton.svg'
// @ts-ignore
import eth from '@/assets/svg/eth.svg'
// @ts-ignore
import doge from '@/assets/svg/doge.svg'
// @ts-ignore
import user from '@/assets/png/zaglushka.png'
// @ts-ignore
import user2 from '@/assets/png/user.png'
// @ts-ignore
import p2p from '@/assets/svg/p2p.svg'
// @ts-ignore
import swap from '@/assets/svg/swap.svg'
// @ts-ignore
import transfer from '@/assets/svg/transfer.svg'
// @ts-ignore
import depositicon from '@/assets/svg/deposit-icon.svg'
// @ts-ignore
import withdrawal from '@/assets/svg/withdrawal.svg'
// @ts-ignore
import prepaid from '@/assets/svg/prepaid.svg'
// @ts-ignore
import bill from '@/assets/svg/bill.svg'
// @ts-ignore
import mixing from '@/assets/svg/mixing.svg'
// @ts-ignore
import escrow from '@/assets/svg/escrow.svg'

@Component({
  components: {
    btc,
    eth,
    ton,
    doge,
    user,
    p2p,
    swap,
    transfer,
    depositicon,
    withdrawal,
    prepaid,
    bill,
    mixing,
    escrow,
  },
})
export default class PaymentDashboardPage extends Vue {
  layout() {
    return 'mobile'
  }

  coins = [
    {
      id: 1,
      img: btc,
      name: 'BTC',
      amount: '100.000$',
      status: '+12%',
      statusColor: true,
    },
    {
      id: 2,
      img: ton,
      name: 'ton',
      amount: '10$',
      status: '-12%',
      statusColor: false,
    },
    {
      id: 3,
      img: eth,
      name: 'ETH',
      amount: '100.000$',
      status: '+12%',
      statusColor: true,
    },
    {
      id: 4,
      img: doge,
      name: 'DOGE',
      amount: '10$',
      status: '-12%',
      statusColor: false,
    },
  ]

  faworits = [
    {
      id: 1,
      img: btc,
      name: 'Bitcoin',
    },
    {
      id: 2,
      img: ton,
      name: 'TON coin',
    },
    {
      id: 3,
      img: eth,
      name: 'Etherium',
    },
    {
      id: 4,
      img: doge,
      name: 'Doge coin',
    },
  ]

  contacts = [
    {
      id: 1,
      img: user,
      name: 'Nickname',
    },
    {
      id: 2,
      img: user2,
      name: 'Nickname',
    },
    {
      id: 3,
      img: user,
      name: 'Nickname',
    },
    {
      id: 4,
      img: user2,
      name: 'Nickname',
    },
    {
      id: 5,
      img: user,
      name: 'Nickname',
    },
    {
      id: 6,
      img: user2,
      name: 'Nickname',
    },
    {
      id: 7,
      img: user,
      name: 'Nickname',
    },
    {
      id: 8,
      img: user2,
      name: 'Nickname',
    },
  ]

  exchange = [
    {
      id: 1,
      img: p2p,
      name: 'P2P',
    },
    {
      id: 2,
      img: swap,
      name: 'Swap',
    },
    {
      id: 3,
      img: transfer,
      name: 'Transer',
    },
    {
      id: 4,
      img: depositicon,
      name: 'Deposit',
    },
  ]

  external = [
    {
      id: 1,
      img: depositicon,
      name: 'Deposit',
    },
    {
      id: 2,
      img: withdrawal,
      name: 'Withdrawal',
    },
    {
      id: 3,
      img: prepaid,
      name: 'Prepaid cards',
    },
    {
      id: 4,
      img: depositicon,
      name: 'Lorem',
    },
  ]

  bills = [
    {
      id: 1,
      img: bill,
      name: 'Bill Pay',
    },
    {
      id: 2,
      img: bill,
      name: 'New Bill',
    },
    {
      id: 3,
      img: bill,
      name: 'My Bills',
    },
    {
      id: 4,
      img: bill,
      name: 'Bills History',
    },
  ]

  mixing = [
    {
      id: 1,
      img: mixing,
      name: 'Create a Mix',
    },
    {
      id: 2,
      img: mixing,
      name: 'Active Mixes',
    },
    {
      id: 3,
      img: mixing,
      name: 'All Mixes',
    },
    {
      id: 4,
      img: mixing,
      name: 'Mixin History',
    },
  ]

  escrow = [
    {
      id: 1,
      img: escrow,
      name: 'Create a Deal',
    },
    {
      id: 2,
      img: escrow,
      name: 'Active Deals',
    },
    {
      id: 3,
      img: escrow,
      name: 'All Deals',
    },
    {
      id: 4,
      img: escrow,
      name: 'Escrow History',
    },
  ]
}
</script>

<style lang="scss">
.payment-dashboard {
  padding: 12px 0;
  .input {
    margin-bottom: 16px;
  }
  &-coins {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
    margin-bottom: 30px;
    .coin-item {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 10px;
      border: 1px solid #18171c;
      border-radius: 12px;
      .coin-info {
        .coin-name {
          margin-bottom: 3px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          color: #fff;
        }
        .account-coin {
          display: flex;
          align-items: center;
          gap: 6px;
          .coin-amount {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 12px;
            color: #fff;
          }
          .coin-status {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 12px;
            color: #f64e2a;
            &.green {
              color: #10b806;
            }
          }
        }
      }
    }
  }
  .faworits {
    margin-bottom: 30px;
    .block-title-oracle {
      display: block;
      margin-bottom: 15px;
    }
    &-list {
      width: calc(100% + 20px);
      display: flex;
      gap: 8px;
      margin-left: -10px;
      padding: 0 10px;
      overflow-x: auto;
      overflow-y: hidden;
      margin-bottom: 32px;
      &::-webkit-scrollbar {
        display: none;
      }
      .list-item {
        min-width: 100px;
        height: 100px;
        background: #121119;
        padding: 12px;
        border-radius: 10px;
        &-link {
          flex-direction: column;
          align-items: start;
        }
        .coin-img {
          margin-bottom: 19px;
        }
        .coin-name {
          font-family: var(--third-family);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          color: #fff;
        }
      }
    }
    &-buttons {
      .faworit-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
        background: #121119;
        border: 1px solid #f64e2a;
        border-radius: 10px;
        padding: 4px;
        gap: 10px;
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 16px;
        text-transform: uppercase;
        color: #fff;
      }
      .deposit {
        padding-bottom: 20px;
        border-bottom: 1px solid #23212f;
        margin-bottom: 16px;
      }
      .bills-and-qr-payment {
        display: flex;
        gap: 12px;
        .faworit-btn {
          gap: 6px;
          font-size: 12px;
          &:last-child {
            gap: 0;
          }
        }
      }
    }
  }
  .internal-tranfers {
    margin-bottom: 30px;
    .input {
      input {
        height: 40px;
        font-size: 14px;
      }
    }
    .block-title-oracle {
      display: block;
      margin-bottom: 15px;
    }
    &-in {
      background: #15151f;
      padding: 12px;
      border-radius: 10px;
      .contact-title {
        margin-bottom: 8px;
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
      }
      .contact-list {
        width: calc(100% + 20px);
        display: flex;
        gap: 12px;
        margin-left: -10px;
        padding: 0 10px;
        overflow: hidden;
        overflow-x: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .contact-img {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border-radius: 100%;
          margin-bottom: 4px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .user-name {
          display: block;
          font-family: var(--third-family);
          font-weight: 400;
          font-size: 14px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .pay-account {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 15px;
    background: #e95548 url('@/assets/png/pay-account-bg.png') no-repeat right
      center/contain;
    border-radius: 12px;
    .oracle-text {
      background: #fff;
      border-radius: 6px;
      padding: 10px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      color: #e95548;
      line-height: 10px;
    }
    &-text {
      width: 100%;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      color: #fff;
    }
    &-btn {
      min-width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 50%;
      svg {
        margin-left: 3px;
      }
    }
  }
}
</style>
