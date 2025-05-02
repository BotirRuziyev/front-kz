<template>
  <div ref="modal" class="draggable-modal" :class="{ show: isOpen }">
    <div ref="modalContent" class="draggable-modal-content">
      <div ref="handle" class="drag-handle-container">
        <div class="drag-handle"></div>
      </div>
      <div ref="modalContentIn" class="draggable-modal-content__in">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DraggableModal extends Vue {
  private modal: HTMLElement | null = null
  private modalContent: HTMLElement | null = null
  private modalContentIn: HTMLElement | null = null
  private startY = 0
  private moveY = 0

  @Prop({ type: Boolean, default: false }) readonly isOpen!: boolean

  mounted() {
    this.modal = this.$refs.modal as HTMLElement
    this.modalContent = this.$refs.modalContent as HTMLElement
    this.modalContentIn = this.$refs.modalContentIn as HTMLElement

    if (this.modalContent) {
      this.modalContent.addEventListener('touchstart', this.handleTouchStart)
      this.modalContent.addEventListener('touchmove', this.handleTouchMove)
      this.modalContent.addEventListener('touchend', this.handleTouchEnd)
    }

    this.$nuxt.$on('open-modal', this.openModal)
    this.$nuxt.$on('close-modal', this.closeModal)
  }

  openModal() {
    this.modalContentIn!.style.opacity = '1'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0.6)`
    this.modalContent!.style.transform = `translateY(${0}%)`
    const htmlElement = document.querySelector('html')
    if (htmlElement) {
      htmlElement.style.overflow = 'hidden'
    }
  }

  closeModal() {
    this.modalContentIn!.style.opacity = '0'
    this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0)`
    this.modalContent!.style.transform = `translateY(${100}%)`
    const htmlElement = document.querySelector('html')
    if (htmlElement) {
      htmlElement.style.overflow = 'visible'
    }
  }

  private handleTouchStart(e: TouchEvent) {
    this.startY = e.touches[0].clientY
  }

  private handleTouchMove(e: TouchEvent) {
    const target = e.target as HTMLElement | null
    if (
      this.modalContentIn &&
      target &&
      !target.closest('.draggable-modal-content__in')
    ) {
      if (!this.modal || !this.modalContent) return

      this.moveY = e.touches[0].clientY
      const deltaY = this.moveY - this.startY
      const modalHeight = this.modalContent.clientHeight
      const newOpacity = Math.max(1 - deltaY / modalHeight, 0)
      const newBgOpacity = Math.max(0.6 - deltaY / modalHeight, 0)
      if (deltaY > 0) {
        if (newOpacity < 1) {
          this.modal.style.backgroundColor = `rgba(0, 0, 0, ${newBgOpacity})`
          this.modalContentIn.style.opacity =
            deltaY < modalHeight / 1.6 ? `${newOpacity}` : '0'
        }
        if (deltaY > modalHeight / 1.6) {
          this.$emit('close')
          const htmlElement = document.querySelector('html')
          if (htmlElement) {
            htmlElement.style.overflow = 'visible'
          }
          this.modalContentIn.style.opacity = '0'
          this.modal.style.backgroundColor = `rgba(0, 0, 0, 0)`
          this.modalContent.style.setProperty(
            'transform',
            `translateY(${100}%)`,
            'important'
          )
        } else {
          this.modalContent.style.setProperty(
            'transform',
            `translateY(${deltaY}px)`,
            'important'
          )
        }
        this.modalContent.style.transition = '0.5s, transform 0s'
      } else {
        this.modalContentIn.style.opacity = '1'
      }
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    const target = e.target as HTMLElement | null
    if (!this.modal || !this.modalContent || !this.modalContentIn) return

    const deltaY = this.moveY - this.startY
    if (target && !target.closest('.draggable-modal-content__in')) {
      this.modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
      this.modalContentIn.style.opacity = '1'
      this.modalContent.style.transition = '0.5s, transform 0.5s'

      if (deltaY > this.modalContent.clientHeight / 1.6) {
        this.$emit('close')
        setTimeout(() => {
          const htmlElement = document.querySelector('html')
          if (htmlElement) {
            htmlElement.style.overflow = 'visible'
          }
          this.modalContentIn!.style.opacity = '0'
          this.modal!.style.backgroundColor = `rgba(0, 0, 0, 0)`
          this.modalContent!.style.transform = `translateY(${100}%)`
        }, 200)
      } else {
        this.modalContent.style.transform = 'translateY(0)'
      }
    }
  }
}
</script>

<style lang="scss">
.draggable-modal {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  overflow: hidden;
  padding-top: 88px;
  backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  transition: 0.3s;
  &.show {
    backdrop-filter: blur(35.400001525878906px);
    background: rgba(0, 0, 0, 0.6);
    visibility: visible;
    .draggable-modal-content {
      transform: translateY(0) !important;
      .draggable-modal-content__in {
        opacity: 1;
      }
    }
  }
  &-content {
    max-width: 375px;
    width: 100%;
    max-height: 100%;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 auto;
    background: #121119;
    border-radius: 8px 8px 0 0;
    padding: 0 16px 24px;
    transform: translateY(100%) !important;
    transition: 0.3s;
    &__in {
      min-height: calc(100% - 34px);
      opacity: 0;
      transition: 0.3s;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .drag-handle-container {
      width: calc(100% + 20px);
      padding: 14px 0;
      margin-left: -10px;
      background: #121119;
      cursor: grab;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .drag-handle {
      border-radius: 10px;
      width: 32px;
      height: 4px;
      background: #8383af;
      margin: 0 auto;
    }
    .modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      .cancel-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #f64e2a;
      }
      .add-btn {
        font-family: var(--font3);
        font-weight: 400;
        font-size: 14px;
        color: #fff;
      }
    }
    .new-address-btn {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-bottom: 24px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      .back-btn {
        min-width: 22px;
        min-height: 22px;
      }
    }
    .addresses-list {
      margin-bottom: 24px;
    }
    .modal-form {
      .form-control {
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        input {
          background: #1e1d26;
          height: 42px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          &::placeholder {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 40px;
        .input {
          width: 100%;
          margin-bottom: 0;
        }
      }
      .user-name {
        margin-bottom: 24px;
      }
    }
  }

  &.deposits-modal,
  &.expenses-modal,
  &.checks-modal {
    .draggable-modal-content {
      .draggable-modal-content__in {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }
    .modal-header {
      &__date {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
        }
      }
    }
    .modal-logo {
      width: 68px;
      height: 68px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .user-info {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      color: #fff;
    }
    .transfer-info {
      .deposit-coin {
        margin-bottom: 2px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 22px;
        line-height: 130%;
        color: #1b961f;
        &.color-white {
          color: #fff;
        }
      }
      .deposit-price {
        margin-bottom: 15px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        text-align: center;
        color: rgba(27, 150, 31, 0.3);
        &.color-white {
          color: rgba(255, 255, 255, 0.3);
        }
      }
      .transfer-funds {
        background: #1d1c24;
        border-radius: 20px;
        padding: 8px 16px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        color: #fff;
        position: relative;

        &::after {
          content: '';
          width: 70px;
          height: 46px;
          background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='34' viewBox='0 0 56 34'><path d='M26.4975 0.710139C27.294 -0.196461 28.706 -0.196462 29.5025 0.710138L55.394 30.1799C56.5294 31.4723 55.6117 33.5 53.8915 33.5H2.10851C0.388286 33.5 -0.529363 31.4723 0.60603 30.18L26.4975 0.710139Z' fill='%231D1C24'/></svg>");
          background-size: auto 17px;
          background-repeat: no-repeat;
          background-position: center top;
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;
        }
      }
    }
    .return-btn,
    .tick-btn,
    .refresh-btn {
      border-radius: 12px;
      width: 165px;
      height: 107px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      color: #fff;
      .btn-icon {
        line-height: 0;
      }
    }
    .deposit-account {
      background: #191823;
      border-radius: 8px;
      padding: 16px;
      &__title {
        margin-bottom: 12px;
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 12px;
        text-align: left;
        color: #fff;
      }
      .deposit-block {
        display: flex;
        align-items: center;
        gap: 15px;
        background: #21212d;
        border-radius: 12px;
        padding: 12px;
        .coin-img {
          width: 75px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .coin-info {
          &-head {
            display: flex;
            gap: 5px;
            margin-bottom: 2px;
            .coin-name {
              font-family: var(--second-family);
              font-weight: 700;
              font-size: 14px;
              text-transform: uppercase;
              color: #fff;
            }
            .coin-price {
              font-family: var(--font3);
              font-weight: 400;
              font-size: 14px;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.6);
            }
          }
          .coin-account-info {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 14px;
            line-height: 160%;
            text-align: left;
            color: #fff;
          }
        }
      }
    }
    .requisites {
      width: 100%;
      background: #191823;
      border-radius: 8px;
      padding: 16px;
      &-title {
        margin-bottom: 12px;
        font-family: var(--second-family);
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
        color: #fff;
      }
      .sender {
        .label {
          margin-bottom: 5px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }
        .user-info {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: #fff;
        }
      }
    }
    .accordion {
      margin-top: -12px;
      .accordion-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        cursor: pointer;
        &.active {
          padding-bottom: 15px;
          .arrown-icon {
            transform: rotate(90deg);
          }
        }
        span {
          font-family: var(--third-family);
          font-weight: 400;
          font-size: 14px;
          text-align: center;
          color: #fff;
        }
        .arrown-icon {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(270deg);
          transition: 0.3s;
          img {
            height: 12px;
          }
        }
      }
      .accordion-enter-active,
      .accordion-leave-active {
        transition: max-height 0.3s ease-out, opacity 0.3s ease;
      }
      .accordion-enter-from,
      .accordion-leave-to {
        height: 0;
        opacity: 0;
        transition: max-height 0.3s ease-out, opacity 0.3s ease;
      }

      .accordion-enter-to,
      .accordion-leave-from {
        height: fit-content;
        opacity: 1;
      }
      .accordion-body {
        overflow: hidden;
        transition: 0.3s;
        .body-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .list-item {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
      .text {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .modal-buttons {
      width: 100%;
      display: flex;
      gap: 12px;
      .tick-btn,
      .refresh-btn {
        width: 100%;
      }
    }
  }
  &.checks-modal {
    .transfer-info {
      .deposit-coin {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 18px;
        line-height: 130%;
        color: #0033ad;
      }
      .deposit-price {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 18px;
        line-height: 130%;
        color: rgba(27, 150, 31, 0.3);
      }
    }
  }
  &.filter-modal {
    user-select: none;
    .draggable-modal-content {
      border-radius: 30px 30px 0 0;
      &__in {
        min-height: calc(100% - 44px);
      }
      .drag-handle-container {
        margin-bottom: 10px;
      }
    }
    .modal-title {
      margin-bottom: 15px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 20px;
      color: #fff;
    }
    .select-all {
      width: calc(100% + 32px);
      margin-left: -16px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid #282632;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: #fff;
      .form-checkbox {
        padding: 0;
        input {
          &:checked + span {
            background: #f64e2a;
          }
        }
        span {
          min-width: 18px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          &::after {
            width: 10px;
            height: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 0;
          }
        }
      }
    }
    .cripto-list {
      .list-item {
        width: calc(100% + 32px);
        margin-left: -16px;
        .cripto-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #282632;
          padding: 11px 16px;
          cursor: pointer;
          .form-control {
            margin-right: 4px;
            .form-checkbox {
              padding: 0;
              input {
                &:checked + span {
                  background: #f64e2a;
                }
              }
              span {
                min-width: 18px;
                width: 18px;
                height: 18px;
                border-radius: 4px;

                &::after {
                  width: 10px;
                  height: 10px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  line-height: 0;
                }
              }
            }
          }
          .icon {
            img {
              width: 28px;
              height: 28px;
            }
          }
          .cripto-text {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 120%;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
