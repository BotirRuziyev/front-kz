<template>
  <div>
    <HeaderOracle />
    <div class="mobile">
      <Nuxt />
    </div>
    <div class="popup-add-contact">
      <div class="popup-add-contact-title">
        <BlockTitleOracle text="New Contact Details Adding" />
        <CloseIcon class="popup-add-contact-title-close" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// @ts-ignore
import CloseIcon from '@/assets/svg/close.svg?inline'

@Component({
  components: {
    CloseIcon,
  },
})
export default class MobileLayout extends Vue {
  name = 'AuthLayout'
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #000;
}

.mobile {
  color: #fff;
  padding: 0 16px;
  max-width: 375px;
  margin: 0 auto;
}

.popup-add-contact {
  display: none;
  position: absolute;
  width: 343px;
  height: 345px;
  left: calc(50% - 343px / 2);
  top: calc(50% - 345px / 2 - 0.5px);
  background: #19191f;
  border-radius: 12px;

  &-title {
    & > span {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }

    &-close {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
