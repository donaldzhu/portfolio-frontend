<script lang="ts">
  import type { Snippet } from "svelte"
  import { ViewType } from "$lib/types"
  import Countdown from "./countdown.svelte"

  let {
    children,
    view = $bindable(),
    toView,
    link,
    canReturn,
    date,
    headingType,
    onclick,
  }: {
    children: Snippet
    view: ViewType
    toView?: ViewType
    link?: string
    canReturn?: boolean
    date?: string
    headingType: "h1" | "h2" | "h3" | "h4"
    onclick?: () => void
  } = $props()

  const switchToView = () => {
    if (!toView) return
    if (view === ViewType.LANDING) return (view = toView)
    if (canReturn) view = ViewType.LANDING
  }
</script>

{#snippet content()}
  {#if onclick && view === ViewType.LANDING}
    <button {onclick}>
      {@render children()}
    </button>
  {:else if date}
    <Countdown {date} />
  {:else if link}
    <a href={link} target="_blank">
      {@render children()}
    </a>
  {:else if toView && (view === ViewType.LANDING || canReturn)}
    <button onclick={switchToView}>
      {@render children()}
    </button>
  {:else}
    {@render children()}
  {/if}
{/snippet}

{#if headingType === "h1"}
  <h1>{@render content()}</h1>
{:else if headingType === "h2"}
  <h2>{@render content()}</h2>
{:else if headingType === "h3"}
  <h3>{@render content()}</h3>
{:else if headingType === "h4"}
  <h4>{@render content()}</h4>
{/if}
