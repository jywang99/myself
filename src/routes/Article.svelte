<script lang="ts">
  import { t } from '$lib/i18n';
  import type { ArticleKeyType } from "$lib/data/articles";
  import Card from '$lib/Card.svelte';
  import articles from '$lib/data/articles';
  import type { Snippet } from 'svelte';

  let { key, fills, children}: { 
    key: ArticleKeyType; children?: Snippet 
    fills?: Record<string, string>;
  } = $props();

  const article = articles[key];
</script>

<div id={key} class="article">
  <Card>
    <div class="template">
      <h1>{$t(article.txTitle)}</h1>
      {@html $t(article.txContent, fills)}
    </div>
    {@render children?.()}
  </Card>
</div>

<style>
  h1 {
    color: var(--accent);
    margin-top: 0;
  }

  .template {
    margin-bottom: var(--gap-medium);
  }
</style>

