<template>
  <button class="theme-button clear" @click="changeToNextTheme">
    <k-icon
      :id="
        {
          auto: 'os-follow',
          light: 'light',
          dark: 'night',
        }[themeValue as string]!
      "
      class="theme-button-icon"
    />
  </button>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import { themeValue, themeValueList } from '@kuankuan/assist-2026/theme';
function changeToNextTheme() {
  themeValue.value =
    themeValueList[(themeValueList.indexOf(themeValue.value) + 1) % themeValueList.length]!;
}
</script>
<style scoped lang="scss">
</style>
