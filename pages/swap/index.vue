<template>
  <div class="swap-page">
    <block-nav-bar to="#" text="Swap" :time="true" />
    <div class="swap-page__content">
      <div class="swap-page__converter">
        <div class="coin-converter coin-converter__input">
          <coin-select name="USDT" price="2500 USDT" amount="2500" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="inputCoin"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="0.00"
                class="form-input"
                @input="coinEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
            </div>
            <h4 class="coin-name">USDT</h4>
            <button class="max-btn" @click="maxInputSelect">MAX</button>
          </div>
          <div class="coin-converter__to-usd">
            <h5 class="to-usd__value">$</h5>
            <div class="form-control">
              <input
                v-model="inputDollor"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                @input="inputDollorEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
              <div v-if="isInputFilled" class="input-placeholder">
                <span>0</span>.00
              </div>
            </div>
            <button class="transfer-btn">
              <TransferIcon />
            </button>
          </div>
        </div>
        <button
          class="coin-convert__icon"
          :class="{ active: isOpen }"
          @click=";(isOpen = true), $nuxt.$emit('open-modal')"
        >
          <ConvertShowIcon v-if="isOpen" class="convert-show__icon" />
          <ConvertIcon v-else class="convert-icon" />
        </button>
        <div class="coin-converter coin-converter__output">
          <coin-select name="Litecoin" price="1 LTC" amount="2500" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="coinConvert"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                placeholder="0.00"
                @input="coinConvertEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
            </div>
            <h4 class="coin-name">LTC</h4>
            <button class="max-btn" @click="maxOutputSelect">MAX</button>
          </div>
          <div class="coin-converter__to-usd">
            <h5 class="to-usd__value">$</h5>
            <div class="form-control">
              <input
                v-model="outputDollor"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                @input="outputDollorEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste"
              />
              <div v-if="isOutputFilled" class="input-placeholder">
                <span>0</span>.00
              </div>
            </div>
            <button class="transfer-btn">
              <TransferIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="swap-info">
        <div class="swap-info__fees">
          <div class="swap-info__label">Fees</div>
          <div class="swap-info__amount">0.5 USDT</div>
        </div>
        <div class="swap-info__coin">
          <div class="swap-info__pair">USDT/LTC</div>
          <div class="swap-info__rate">0.00000010</div>
        </div>
        <new-oracle-button
          text="Swap"
          color="yellow"
          @click="isSuccessful = true"
        />
      </div>
    </div>

    <draggable-modal :is-open="isOpen" @close="isOpen = false">
      <h1 class="modal-title">Choose Network</h1>
      <ul class="coins-list">
        <div v-for="item of data" :key="item.id" class="list-item">
          <label class="list-item__label">
            <input
              name="user"
              type="radio"
              class="form-input"
              :checked="item.selected"
            />
            <div class="checkbox-button">
              <span class="check-icon">
                <CheckIcon />
              </span>
            </div>
            <div class="coin-info">
              <div class="coin-img">
                <img :src="item.img" alt="" />
              </div>
              <div class="coin-body">
                <div class="body-head">
                  <h4 class="coin-name">{{ item.name }}</h4>
                  <h4 class="coin-convert">0,0244 TON</h4>
                </div>
                <div class="body-bottom">
                  <h5 class="card-num">***2343</h5>
                  <h5 class="coin-convert">≈ 1000.4$</h5>
                </div>
              </div>
            </div>
          </label>
        </div>
      </ul>
    </draggable-modal>

    <history-modal :is-visible="isSuccessful" class="successful-modal">
      <div class="modal-body">
        <div class="icon">
          <SeccessfulIcon />
        </div>
        <h2 class="modal-title">Swap Successful!</h2>
        <div class="conversion-info">
          <p class="conversion-info__pair">BTC → USDT</p>
          <p class="conversion-info__result">You’ve received: 1,902 USDT</p>
          <p class="conversion-info__rate-change">
            <span>3.5 USDT</span> → 4 USDT
          </p>
        </div>
      </div>
      <new-oracle-button
        text="Close"
        color="yellow"
        @click="isSuccessful = false"
      />
    </history-modal>
    <history-modal :is-visible="isFailed" class="failed-modal">
      <div class="modal-body">
        <div class="icon">
          <FailedIcon />
        </div>
        <h2 class="modal-title">Swap Failed</h2>
        <p class="modal-description">
          Unfortunately, we couldn’t complete the swap. Please try again later
          or check your connection.
        </p>
      </div>
      <new-oracle-button text="Close" @click="isFailed = false" />
    </history-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import ConvertIcon from '@/assets/svg/coin-convert-icon.svg?inline'
// @ts-ignore
import ConvertShowIcon from '@/assets/svg/coin-convert-show-icon.svg?inline'
// @ts-ignore
import TransferIcon from '@/assets/svg/transfer-vertical-svg.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/check-icon.svg?inline'
// @ts-ignore
import SeccessfulIcon from '@/assets/svg/successful.svg?inline'
// @ts-ignore
import FailedIcon from '@/assets/svg/failed.svg?inline'

@Component({
  components: {
    ConvertIcon,
    ConvertShowIcon,
    TransferIcon,
    CheckIcon,
    SeccessfulIcon,
    FailedIcon,
  },
})
export default class SwapPage extends Vue {
  isOpen = false
  inputCoin: string = ''
  coinConvert: string = ''
  inputDollor: string = ''
  outputDollor: string = ''
  maxInput = '100'
  maxOutput = '55'
  isInputFilled: boolean = true
  isOutputFilled: boolean = true
  isSuccessful: boolean = false
  isFailed: boolean = false

  data = [
    {
      id: 1,
      img: require('@/assets/svg/litecoin-ltc.svg'),
      name: 'Litecoin',
      selected: true,
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

  inputDollorEvent() {
    this.inputDollor = this.inputDollor.replace(',', '.')
    this.isInputFilled = this.inputDollor.trim() === ''
    this.inputCoin = String(Number(this.inputDollor) * 1.3)
  }

  outputDollorEvent() {
    this.outputDollor = this.outputDollor.replace(',', '.')
    this.isOutputFilled = this.outputDollor.trim() === ''
    this.coinConvert = String(Number(this.outputDollor) * 1.3)
  }

  coinEvent(event: Event): void {
    this.inputCoin = this.inputCoin.replace(',', '.')
    this.isInputFilled = this.inputCoin.trim() === ''
    this.inputDollor =
      this.inputCoin.trim() === '' ? '' : String(Number(this.inputCoin) * 0.7)

    const target = event.target as HTMLInputElement
    let value = target.value

    // Birinchi nuqta yoki vergulni saqlaymiz, qolganlarini olib tashlaymiz
    const firstDotIndex = Math.min(
      value.indexOf('.'),
      value.includes('.') ? Infinity : value.indexOf(',')
    )

    if (firstDotIndex !== -1) {
      // Ajratish
      const before = value.substring(0, firstDotIndex + 1)
      const after = value.substring(firstDotIndex + 1).replace(/[.,]/g, '') // Qolgan nuqtalarni olib tashlash
      value = before + after
    }

    // Harflarni olib tashlash
    value = value.replace(/[^\d.,]/g, '')

    target.value = value
  }

  coinConvertEvent() {
    this.coinConvert = this.coinConvert.replace(',', '.')
    this.isOutputFilled = this.coinConvert.trim() === ''
    this.outputDollor =
      this.coinConvert.trim() === ''
        ? ''
        : String(Number(this.coinConvert) * 0.7)
  }

  maxInputSelect() {
    this.inputCoin = this.maxInput
    this.inputCoin = this.inputCoin.replace(',', '.')
    this.isInputFilled = this.inputCoin.trim() === ''
    this.inputDollor =
      this.inputCoin.trim() === '' ? '' : String(Number(this.inputCoin) * 0.7)
  }

  maxOutputSelect() {
    this.coinConvert = this.maxOutput
    this.coinConvertEvent()
  }

  allowDecimalNumbers(event: KeyboardEvent): void {
    const key = event.key
    const isNumber = /^\d$/.test(key)
    const isDot = key === '.' || key === ','

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const alreadyHasDot =
      currentValue.includes('.') || currentValue.includes(',')

    if (!isNumber && !(isDot && !alreadyHasDot)) {
      event.preventDefault()
    }
  }

  blockInvalidDecimalPaste(event: ClipboardEvent): void {
    event.preventDefault()
    let pasted = event.clipboardData?.getData('text') || ''

    pasted = pasted.replace(/,/g, '.')

    pasted = pasted.replace(/[^\d.]/g, '')

    const firstDotIndex = pasted.indexOf('.')
    if (firstDotIndex !== -1) {
      const beforeDot = pasted.slice(0, firstDotIndex + 1)
      const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, '')
      pasted = beforeDot + afterDot
    }

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const selectionStart = target.selectionStart || 0
    const selectionEnd = target.selectionEnd || 0

    const newValue =
      currentValue.slice(0, selectionStart) +
      pasted +
      currentValue.slice(selectionEnd)

    target.value = newValue
  }
}
</script>

<style lang="scss">
.swap-page {
  max-width: 375px;
  margin: 0 auto;
  padding: 0 16px 24px;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1 1 100%;
    .swap-page__converter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 75px;

      .coin-converter {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #13121b;
        border-radius: 8px;
        padding: 8px 16px 16px 16px;
        .input-coin {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .form-control {
            .form-input {
              width: 100%;
              height: 40px;
              background: transparent;
              padding: 0 20px 0 0;
              border: none;
              font-family: 'Hector', sans-serif;
              font-weight: 400;
              font-size: 32px;
              line-height: 125%;
              color: #fff;
              &:focus {
                outline: none;
              }
              &::placeholder {
                font-family: 'Hector', sans-serif;
                font-weight: 400;
                font-size: 32px;
                line-height: 125%;
                color: #7a74ba;
              }
            }
          }
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #67639a;
          }
          .max-btn {
            margin-left: 8px;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #f64e2a;
          }
        }
        .coin-converter__to-usd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2px;
          .to-usd__value {
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            color: rgba(131, 131, 175, 0.8);
            span {
              font-size: 12px;
            }
          }
          .form-control {
            width: 100%;
            position: relative;
            .form-input {
              width: 100%;
              height: 16px;
              position: relative;
              z-index: 2;
              background: transparent;
              padding: 0 20px 0 0;
              border: none;
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 16px;
              line-height: 120%;
              color: #fff;
              &:focus {
                outline: none;
              }
              &::placeholder {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 12px;
                text-transform: capitalize;
                line-height: 120%;
                color: #7a74ba;
              }
            }
            .input-placeholder {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 12px;
              line-height: 120%;
              color: rgba(131, 131, 175, 0.8);
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
      .coin-converter__input {
        position: relative;
        z-index: 6;
      }
      .coin-converter__output {
        .coin-select {
          .select-btn {
            .left-block {
              .coin-info-head {
                display: block;
                .coin-name {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 120%;
                }
              }
            }
          }
        }
      }
      .coin-convert__icon {
        border-radius: 8px;
        width: 34px;
        height: 34px;
        background: #181720;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s;
        .convert-icon {
          width: 18px;
          height: 18px;
        }
        &.active {
          width: 40px;
          height: 40px;
        }
      }
    }
    .swap-info {
      &__fees,
      &__coin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      &__coin {
        margin-bottom: 16px;
      }
      &__label,
      &__pair {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #7a74ba;
      }
      &__amount,
      &__rate {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #fff;
      }
      .new-oracle-button {
        padding: 11px;
        line-height: 22px;
      }
    }
  }
  .draggable-modal {
    backdrop-filter: blur(0);
    display: flex;
    align-items: end;
    .draggable-modal-content {
      width: 100%;
      height: auto;
      border-radius: 30px 30px 0 0;
      background: #181720;
      padding: 0 16px 24px;
      .drag-handle-container {
        background: #181720;
        margin-bottom: 10px;
      }
      &__in {
        background: #181720;
        min-height: auto;
        .modal-title {
          margin-bottom: 12px;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 140%;
          color: #fff;
        }
        .coins-list {
          .list-item {
            width: calc(100% + 32px);
            margin-left: -16px;
            border-bottom: 1px solid #28283a;
            &:last-child {
              border: 0;
            }
            &__label {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 16px;
              cursor: pointer;
              .form-input {
                display: none;
                &:checked + .checkbox-button {
                  background: #f64e2a;
                  border-color: #f64e2a;
                  .check-icon {
                    opacity: 1;
                  }
                }
              }
              .checkbox-button {
                min-width: 18px;
                min-height: 18px;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 1px solid #7a74ba;
                transition: 0.1s;
                .check-icon {
                  line-height: 0;
                  opacity: 0;
                  transition: 0.1s;
                }
              }
              .coin-info {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 8px;
                .coin-body {
                  width: 100%;
                  .body-head,
                  .body-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  }
                  .body-bottom {
                    .card-num,
                    .coin-convert {
                      font-family: 'Roboto', sans-serif;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 135%;
                      color: #7a74ba;
                    }
                  }
                  .body-head {
                    .coin-name,
                    .coin-convert {
                      font-family: 'Roboto', sans-serif;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 130%;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .successful-modal,
  .failed-modal {
    padding: 24px 16px;
    .modal-content {
      display: flex;
      flex-direction: column;
      padding: 0;
      .modal-body {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon {
          margin-bottom: 12px;
        }
        .modal-title {
          margin-bottom: 38px;
          font-family: 'Hector', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
        .modal-description {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: #fff;
        }
        .conversion-info {
          &__pair {
            margin-bottom: 4px;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 140%;
            text-align: center;
            color: #31f62a;
          }
          &__result {
            margin-bottom: 12px;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            text-align: center;
            color: #fff;
          }
          &__rate-change {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            text-align: center;
            color: #b2aaf9;
            span {
              text-decoration: line-through;
            }
          }
        }
      }
      .new-oracle-button {
        padding: 11px;
        line-height: 22px;
      }
    }
  }
  .failed-modal {
    .new-oracle-button {
      background: #fff;
      color: #000;
      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>
