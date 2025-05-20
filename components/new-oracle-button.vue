<template>
  <button
    class="new-oracle-button"
    :class="[backgrounColor, { 'big-button': icon !== '' }]"
    @click="onButtonClick"
  >
    <span v-if="icon != ''" class="button-icon">
      <img :src="icon" alt="" />
    </span>
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class ButtonOracle extends Vue {
  name = 'ButtonOracle'
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: 'black' }) readonly color!: string
  @Prop({ default: '' }) readonly to!: string
  @Prop({ default: '' }) readonly icon!: string

  get backgrounColor() {
    return this.color
  }

  onButtonClick() {
    if (this.to !== '') {
      this.$router.push(this.to)
    } else {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.new-oracle-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 14px;
  padding: 9px 0;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #fff;
  transition: 0.2s;
  &.big-button {
    padding: 11px 16px;
    line-height: 22px;
  }
  &.black {
    background: #1e1d28;
    &:hover {
      background: #f64e2a;
      box-shadow: 0 0 10px rgba(246, 78, 42, 0.25);
    }
  }
  &.yellow {
    background: #f64e2a;
    &:hover {
      background: #f64e2a;
      box-shadow: 0 0 10px rgba(246, 78, 42, 0.25);
    }
  }
  .button-icon {
    line-height: 0;
  }
}
</style>
