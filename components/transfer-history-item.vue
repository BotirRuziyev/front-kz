<template>
  <div class="transfer-history__wrapper">
    <div
      v-for="transfer in localData"
      :key="transfer.id"
      class="transfer-history-item"
    >
      <p class="transfer-date">{{ transfer.date }}</p>
      <div class="transfer-history__list">
        <li
          v-for="item in transfer.expenses"
          :key="item._id"
          class="transfer-item"
          @click="openModal()"
        >
          <div class="coin-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="transfer-item__body">
            <div class="item">
              <h4 class="item-title">{{ item.title }}</h4>
              <h4 class="coin-amound" :class="color">
                <span v-if="color == 'color-white'">
                  <img :src="require('@/assets/svg/snowflake.svg')" alt="" />
                </span>
                <span v-else> + </span>
                {{ item.amount }}
              </h4>
            </div>
            <div class="item">
              <p class="item-description">{{ item.description }}</p>
              <h4 class="coin-price" :class="color">≈ {{ item.price }}</h4>
            </div>
            <div v-if="item.activations" class="activations">
              <h4 class="activations-title">{{ item.activations._title }}</h4>
              <transition name="accordion">
                <ul v-show="item.activations.selected" class="activations-list">
                  <li
                    v-for="(activation, i) in item.activations.list"
                    :key="i"
                    class="list-item"
                  >
                    {{ activation }}
                  </li>
                </ul>
              </transition>
              <div class="activations-arrow">
                <button
                  class="arrow-down"
                  :class="{ active: item.activations.selected }"
                  @click="activationsArrow(transfer.id, item._id, $event)"
                >
                  <img
                    :src="require('@/assets/svg/arrow-circle-down.svg')"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

interface Transfer {
  id: number
  date: string
  expenses: {
    _id: number
    img: string
    title: string
    amount: string
    description: string
    price: string
    activations?: {
      _title?: string
      selected?: boolean
      list?: []
    }
  }[]
}
@Component
export default class TransferHistory extends Vue {
  @Prop({ default: () => [] }) data!: Transfer[]
  @Prop({ default: '' }) color!: string

  localData: Transfer[] = []

  created() {
    this.localData = [...this.data]
  }

  @Watch('data', { deep: true })
  onDataChange(newVal: Transfer[]) {
    this.localData = [...newVal]
  }

  openModal() {
    this.$emit('openModal')
  }

  activationsArrow(id: number, _id: number, event: Event) {
    event.stopPropagation()
    this.$emit('close')
    this.localData.forEach((transfer) => {
      if (transfer.id === id) {
        transfer.expenses.forEach((expense) => {
          if (expense.activations) {
            if (expense._id === _id && expense.activations) {
              this.$set(
                expense.activations,
                'selected',
                !expense.activations.selected
              )
            }
          }
        })
      }
    })
  }
}
</script>

<style lang="scss">
.transfer-history__wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  .transfer-history-item {
    cursor: pointer;
    .transfer-date {
      margin-bottom: 12px;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
    }
    .transfer-history__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .transfer-item {
        display: flex;
        align-items: center;
        gap: 9px;
        background: #121119;
        padding: 12px;
        border-radius: 10px;
        .coin-img {
          min-width: 42px;
          min-height: 42px;
          max-height: 42px;
          max-width: 42px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .transfer-item__body {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            .item-title {
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: rgba(255, 255, 255, 0.4);
            }
            .coin-amound {
              display: flex;
              align-items: center;
              gap: 4px;
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 16px;
              line-height: 130%;
              text-align: right;

              &.color-green {
                color: #1b961f;
              }
              &.color-white {
                color: #fff;
              }
              &.color-blue {
                color: #0033ad;
              }
            }
            .item-description {
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 14px;
              color: #fff;
            }
            .coin-price {
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 16px;
              line-height: 130%;
              text-align: right;

              &.color-green {
                color: rgba(27, 150, 31, 0.3);
              }
              &.color-white {
                color: rgba(255, 255, 255, 0.3);
              }
              &.color-blue {
                color: rgba(27, 150, 31, 0.3);
              }
            }
          }
          .activations {
            &-title {
              margin-bottom: 13px;
              font-family: var(--font-family);
              font-weight: 400;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
            }
            .accordion-enter-active,
            .accordion-leave-active {
              transition: height 0.3s;
            }
            .accordion-enter-from,
            .accordion-leave-to {
              height: 0;
              opacity: 0;
              transition: height 0.3s;
            }

            .accordion-enter-to,
            .accordion-leave-from {
              height: auto;
              opacity: 1;
            }
            &-list {
              width: calc(100% + 51px);
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin-left: -51px;
              .list-item {
                font-family: var(--font-family);
                font-weight: 400;
                font-size: 10px;
                line-height: 70%;
                color: rgba(255, 255, 255, 0.4);
              }
            }
            &-arrow {
              width: calc(100% + 51px);
              margin-left: -51px;
              display: flex;
              justify-content: center;
              margin-top: 10px;
              .arrow-down {
                &.active {
                  img {
                    transform: rotate(0deg);
                  }
                }
                img {
                  transform: rotate(-180deg);
                  transition: 0.3s;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
