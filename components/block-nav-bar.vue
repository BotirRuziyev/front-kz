<template>
  <div class="block-nav-bar">
    <nuxt-link :to="to" class="back-btn">
      <BackIcon />
    </nuxt-link>
    <span>
      {{ text }}
    </span>
    <button v-if="search" class="search-btn" @click="$emit('openSearch', true)">
      <SearchIcon />
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/search.svg?inline'
@Component({
  components: {
    BackIcon,
    SearchIcon,
  },
})
export default class BlockNavBack extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: '' }) readonly to!: string
  @Prop({ default: false }) readonly search!: boolean
}
</script>
<style lang="scss" scoped>
.block-nav-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 18px 0;
  font-family: var(--second-family);
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  .back-btn {
    min-width: 22px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    svg {
      path {
        stroke: #fff;
      }
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
</style>
