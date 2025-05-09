<template>
  <div
    class="history-modal"
    :class="isVisible ? 'show' : ''"
    @click.self="$emit('close', false)"
  >
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class AdressesModal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isVisible!: boolean

  leyout() {
    return 'mobile'
  }
}
</script>

<style lang="scss">
.history-modal {
  width: 100%;
  height: 100vh;
  padding: 50px 16px;
  backdrop-filter: blur(35.400001525878906px);
  background: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 101;
  visibility: hidden;
  transition: 0.2s;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }

  &.show {
    background: rgba(0, 0, 0, 0.6);
    visibility: visible;
    opacity: 1;
  }
  &.history-successfully__modal {
    .modal-content {
      height: auto;
      background: #181720;
      border-radius: 24px;
      padding: 24px 26px;
      .modal-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
        position: relative;
        .close-btn {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          svg {
            width: 22px;
            height: 22px;
          }
        }
        .coin-icon {
          width: 48px;
          height: 48px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          margin-bottom: 16px;
        }
        .modal-title {
          margin-bottom: 28px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 18px;
          text-align: center;
          line-height: 140%;
          color: #fff;
        }
        .border-bottom {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          &::before,
          &::after {
            content: '';
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #000;
            position: absolute;
            top: 50%;
            left: -40px;
            transform: translateY(-50%);
          }
          &::after {
            left: auto;
            right: -40px;
          }
        }
      }
      .user-info {
        margin-bottom: 32px;
        &__list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          .list-item {
            // &:nth-child(2) {
            //   flex-direction: column;
            // }
            .info-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 4px;
            }
            .info-top__text {
              font-family: 'Roboto', sans-serif;
              font-weight: 500;
              font-size: 12px;
              line-height: 135%;
              color: #b2aaf9;
            }
            .info-bottom__text {
              display: flex;
              align-items: center;
              gap: 8px;
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
              font-size: 14px;
              line-height: 130%;
              color: #fff;
              &.total-bottom__text {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                font-size: 24px;
                line-height: 125%;
                span {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 120%;
                }
              }
              &.issuance-bottom__text {
                display: flex;
                align-items: center;
                gap: 8px;
                span {
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 135%;
                  color: #7a74ba;
                }
              }
            }
            .info-bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .amount-coin {
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 24px;
                line-height: 140%;
                color: #fff;
              }
            }
            .user-img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
      .more-btn {
        display: block;
        width: 100%;
        background: #f64e2a;
        border-radius: 14px;
        padding: 11px 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        line-height: 140%;
        color: #fff;
      }
      .transaction-summary {
        &__fees,
        &__price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        &__price {
          margin-bottom: 0;
        }
        &__label {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #7a74ba;
        }
        &__amount {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  &.history-cashed__modal {
    .modal-content {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      .user-info {
        margin-bottom: 0;
      }
    }
  }
  &.transfers-internal__history {
    .user-info {
      &__list {
        .list-item {
          &:nth-child(4) {
            .info-bottom {
              justify-content: start;
              gap: 8px;
            }
          }
        }
        .user-item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .info-head {
            flex-direction: column;
            align-items: start !important;
          }
        }
      }
    }
  }
  &.transfers-external__history,
  &.p2p-history {
    .user-info {
      &__list {
        .list-item {
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            .info-bottom {
              justify-content: start;
              gap: 8px;
            }
          }
          &:nth-child(7),
          &:nth-child(8) {
            .info-head {
              gap: 12px;
              .info-top__text {
                flex: 1 1 50%;
              }
            }
            .info-bottom {
              gap: 12px;
              .copy-btn {
                cursor: pointer;
              }
              .info-bottom__text {
                flex: 1 1 50%;
                &.total-bottom__text {
                  font-weight: 600;
                  font-size: 18px;
                  line-height: 140%;
                  color: #fff;
                  span {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 135%;
                    color: #7a74ba;
                  }
                }
              }
            }
          }
        }
        .user-item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .info-head {
            flex-direction: column;
            align-items: start !important;
          }
        }
      }
    }
  }
  &.swap-history,
  &.oracle-pay-deposit__modal,
  &.mixing-deposit__modal,
  &.prepaid-deposit__modal,
  &.prepaid-expensis__modal {
    .user-info {
      margin-bottom: 0 !important;
      &__list {
        .list-item {
          .info-bottom {
            .info-bottom__text {
              &.total-bottom__text {
                font-weight: 400;
                font-size: 14px;
                line-height: 130%;
                color: #fff;
                span {
                  font-size: 12px;
                  line-height: 135%;
                  color: #7a74ba;
                }
              }
            }
          }
        }
      }
    }
  }
  &.oracle-pay-deposit__modal,
  &.mixing-deposit__modal,
  &.prepaid-deposit__modal,
  &.prepaid-expensis__modal {
    .user-info {
      margin-bottom: 32px !important;
    }
  }
  &.bills-deposit__modal,
  &.bills-expensis__modal {
    .user-info {
      &__list {
        .list-item {
          &:nth-child(3) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .info-head {
              flex-direction: column;
              align-items: start;
            }
          }
        }
      }
    }
  }
  &.history-external__modal {
    .user-info {
      margin-bottom: 0 !important;
      &__list {
        .list-item {
          &:nth-child(3),
          &:nth-child(5) {
            .info-bottom {
              justify-content: start;
            }
          }
          .info-bottom {
            gap: 8px;
            .copy-btn {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  &.escrow-history {
    .user-info {
      &__list {
        .list-item {
          &:nth-child(4) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .info-head {
              flex-direction: column;
              align-items: start;
            }
          }
          &:nth-child(5) {
            .info-bottom {
              justify-content: start;
            }
          }
          .info-bottom {
            gap: 8px;
            .copy-btn {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .modal-content {
    max-width: 375px;
    margin: 0 auto;
    padding: 40px 10px;
    height: 100%;
  }
}
</style>
