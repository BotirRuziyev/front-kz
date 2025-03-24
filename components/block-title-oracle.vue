<template>
  <span class="block-title-oracle">{{ text }}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BlockTitleOracle extends Vue {
  @Prop({ default: '' }) readonly text!: string
}
</script>
<style lang="scss">
.block-title-oracle {
  width: 100%;
  letter-spacing: 0.7px;
  font-family: var(--second-family);
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
}
</style>
