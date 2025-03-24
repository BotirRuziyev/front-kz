<template>
  <div class="payment-dashboard-cards">
    <div class="payment-dashboard-cards-head">
      <block-title-oracle :text="title" />
      <nuxt-link :to="to" class="all-link">
        All
        <div class="icon">
          <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
        </div>
      </nuxt-link>
    </div>
    <ul class="payment-dashboard-list">
      <li v-for="item in data" :key="item.id" class="list-item">
        <nuxt-link to="#" class="list-item-link">
          <div class="list-img">
            <img :src="item.img" alt="" />
          </div>
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PaymentDashboardCards extends Vue {
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: [] }) readonly data!: Array<any>
  @Prop({ default: '' }) readonly to!: string
}
</script>

<style lang="scss">
.payment-dashboard-cards {
  margin-bottom: 30px;
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    .all-link {
      display: flex;
      align-items: center;
      gap: 2px;
      font-family: var(--third-family);
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      color: #f64e2a;
      .icon {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        img {
          height: 12px;
          transform: rotate(-180deg);
        }
      }
    }
  }
  .payment-dashboard-list {
    width: calc(100% + 20px);
    display: flex;
    gap: 12px;
    margin-left: -10px;
    padding: 0 10px;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-item {
      &-link {
        min-width: 93px;
        flex-direction: column;
        font-family: var(--third-family);
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        color: #fff;
        .list-img {
          width: 93px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #262633;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
