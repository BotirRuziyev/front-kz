<template>
  <div class="form-checkbox">
    <input type="checkbox" :checked="checked" />
    <span @click="checkedOpen"></span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CheckboxOracle extends Vue {
  @Prop({ default: false }) checked!: boolean

  checkedOpen() {
    this.checked = !this.checked
  }
}
</script>
<style lang="scss">
.form-checkbox {
  display: flex;
  gap: 10px;
  padding: 0 38px;
  align-items: center;
  cursor: pointer;
  input {
    display: none;
  }

  span {
    position: relative;
    display: block;
    width: 20px;
    min-width: 20px;
    height: 20px;
    background: #343242;
    border-radius: 3px;
    cursor: pointer;
  }

  input:checked + span::after {
    content: url('@/assets/svg/arrow.svg');
    display: block;
    position: absolute;
    left: 3px;
  }
}
</style>
