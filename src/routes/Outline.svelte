<script lang="ts">
  import { slide } from "svelte/transition";
  import { handleAnchorClick } from "$lib/interact";

  export let articles;

  let expanded = false;

</script>

<div class="container"
  on:mouseenter={() => expanded = true}
  on:mouseleave={() => expanded = false}
  role="button" tabindex="0"
>
  <button class="outline"
    on:click={() => expanded = !expanded}
    class:open={expanded}
  >
    Navigate in page
  </button>

  {#if expanded}
    <div class="content" transition:slide>
      <ul>
        <li>
          <a href='#top' on:click={handleAnchorClick}>Top</a>
        </li>
        {#each articles as article}
          <li>
            <a href={`#${article.name}`} on:click={handleAnchorClick}>{article.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .container {
    position: fixed;
    top: 1em;
    left: 1em;
  }

  .outline {
    color: var(--fg-1);
    border: 1px solid var(--fg-1);
    font-size: 1em;
    cursor: pointer;
    background-color: var(--bg-1);
  }

  .outline:hover {
    background-color: var(--bg-2);
    transition: background-color 0.2s linear;  
  }

  .outline.open {
    border-bottom: none;
  }

  .content {
    background-color: var(--bg-1);
    border: 1px solid var(--fg-3);
  }

  .content ul {
    margin: 0;
    padding: 0;
  }

  .content li {
    list-style-type: none;
  }

  .content li:not(:last-child) {
    border-bottom: 1px solid var(--fg-1);
  }

  .content a {
    padding: 0.5em;
    color: var(--fg-1);
    text-decoration: none;
    display: block;
  }

  .content a:hover {
    background-color: var(--bg-2);
    transition: background-color 0.2s linear;
  }
</style>

