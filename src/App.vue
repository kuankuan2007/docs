<template>
  <div
    class="page"
    :class="{
      'show-content-menu': showContentMenu,
    }"
  >
    <k-header :title="title" v-model:showContentMenu="showContentMenu" />
    <router-view v-slot="{ Component }">
      <component :is="Component" @update:title="title = $event" />
    </router-view>
  </div>
</template>
<script setup lang="ts">
import router from './router';
import KHeader from './components/KHeader.vue';
const title = ref('');
const articleDiv = useTemplateRef('articleDiv');
router.beforeEach(() => {
  showContentMenu.value = false;
  if (articleDiv.value) {
    articleDiv.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});
const showContentMenu = ref(false);
</script>
<style scoped lang="scss">

.page {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
}


</style>
