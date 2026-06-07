<template>
  <div
    class="content-line"
    :class="{
      fold,
    }"
  >
    <p class="title">
      <router-link
        :class="{
          selected: selected,
        }"
        :to="'/' + props.data.list.join('/')"
        >{{ props.data.title }}</router-link
      >
      <k-icon
        @click="fold = !fold"
        v-if="Object.keys(props.data.subArticles).length > 0"
        id="down"
        class="button"
      />
    </p>
    <k-auto-height-folding ref="autoHeightFolding" :fold="fold" v-if="props.data.subArticles">
      <ul>
        <li>
          <k-content-component
            v-for="subArticle in props.data.subArticles"
            :key="subArticle.id ?? '_root'"
            :data="subArticle"
            :path-tree="subArticle.id === pathTree[1] ? pathTree.slice(1) : []"
          />
        </li>
      </ul>
    </k-auto-height-folding>
  </div>
</template>
<script setup lang="ts">
import KIcon from './KIcon.vue';
import KContentComponent from './KContentComponent.vue';
import KAutoHeightFolding from './KAutoHeightFolding.vue';
import type { Article } from '@/scripts/findContent';
const props = defineProps<{
  data: Article;
  pathTree: (string | null)[];
}>();

const fold = ref(false);
const selected = computed(() => props.pathTree.length === 1 && props.pathTree[0] === props.data.id);
watch(
  () => props.pathTree.length,
  () => {
    fold.value = props.pathTree.length === 0;
  }
);
</script>
<style scoped lang="scss">
.selected {
  @include theme.use {
    color: theme.get('color');
  }

  background-color: transparent;
  background-image: none;
  cursor: default;
}

.title {
  display: flex;
  margin: 0.5rem;
}

.button {
  cursor: pointer;
  border: solid 0.12em transparent;
  border-radius: 999px;
  padding: 2px;
  display: block;
  @include motion.transition(0.3s);

  &:hover {
    @include theme.use {
      border-color: theme.mix('active-color', 'color', 85%);
      color: theme.mix('active-color', 'color', 85%);
    }
  }

  .fold > .title > & {
    transform: rotate(-90deg);
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 2rem;
  padding-left: 0.5rem;
  border-left-width: 1px;
  border-left-style: solid;

  @include theme.use {
    border-left-color: rgba(theme.get('color'), 0.3);
  }
}
</style>
