<template>
  <header>
    <button
      type="button"
      class="show-content-menu-button header-button"
      @click="showContentMenu = !showContentMenu"
    >
      <k-icon :id="showContentMenu ? 'article' : 'menu'" />
    </button>

    <h1>{{ title }}</h1>
    <div class="header-buttons">
      <a
        v-for="(link, index) in headerLinks"
        :href="link.href"
        :key="index"
        target="_blank"
        class="header-button"
        ><k-icon :id="link.icon"
      /></a>
      <k-theme-change-button class="header-button" />
    </div>
  </header>
</template>
<script setup lang="ts">
import { headerLinks } from '@/headerConfig.ts';
import KThemeChangeButton from './KThemeChangeButton.vue';
import KIcon from './KIcon.vue';
defineProps<{ title: string }>();

const showContentMenu = defineModel<boolean>('showContentMenu');
</script>
<style scoped lang="scss">
$header-height: 60px;
$layoutLimit: 800px;
header {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: $header-height;
  height: $header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding-left: 1rem;
  padding-right: 1rem;

  @include theme.use {
    background: theme.mix('background', 'color', 90%);
  }
  .show-content-menu-button {
    @media (min-width:#{$layoutLimit}) {
      & {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
  .header-button {
    font-size: 2em;
    cursor: pointer;
    padding: 0.08em;
    border: 0.08em solid transparent;
    border-radius: 0.3em;
    background: transparent;
    outline: none;
    @include motion.transition(all 0.3s, transform 0.2s ease);
    @include theme.use {
      color: theme.get('color');
    }
    &:focus {
      @include theme.use {
        border-color: theme.get('active-color');
      }
    }

    &:hover {
      @include theme.use {
        color: theme.get('active-color');
        transform: scale(1.1);
      }
    }

    &:active {
      @include theme.use {
        color: theme.get('active-color');
        transform: scale(0.9);
      }
    }
  }
  & > h1 {
    text-align: center;
    flex-grow: 1;
    line-height: $header-height;
    margin: 0;
    word-wrap: none;
    white-space: nowrap;
    overflow-x: auto;
  }

  .header-buttons {
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
  }
}
</style>
