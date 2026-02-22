<script lang="ts">
  import CopyLink from "$lib/components/copyLink.svelte"
  import Heading from "$lib/components/heading.svelte"
  import Image from "$lib/components/image.svelte"
  import MuxVideo from "$lib/components/muxVideo.svelte"
  import { ViewType, type SanityData } from "$lib/types"
  import { onMount } from "svelte"

  let { data }: { data: SanityData } = $props()

  let view = $state<ViewType>(ViewType.LANDING)
  let random: null | number = $state(null)

  const viewData = $derived(data.views[view])

  const mediaContents = $derived(data.settings.mediaContents)

  const mediaIndex = $derived(
    random ? Math.floor(random * mediaContents.length) : 0,
  )

  const mediaContent = $derived(mediaContents[mediaIndex])

  let isTerminating = $state(false)
  let isTerminated = $state(false)

  const terminate = () => {
    isTerminating = true
    setTimeout(() => {
      isTerminated = true
    }, 1500)
  }

  onMount(() => {
    random = Math.random()
  })
</script>

<main class:terminating={isTerminating} class:terminated={isTerminated}>
  {#if !isTerminated}
    <Heading bind:view toView={ViewType.BIO} canReturn headingType="h1"
      >{data.settings.name}</Heading
    >
    <div class="body-container">
      <Heading bind:view toView={ViewType.OLD} headingType="h2">
        {viewData.heading1}
      </Heading>
      <Heading bind:view toView={ViewType.NEW} headingType="h3">
        {viewData.heading2}
      </Heading>
      <div class="media-container">
        {#if view === ViewType.OLD}
          <Image image={data.settings.oldSiteThumbnail} />
        {:else if view === ViewType.NEW}
          <Image image={data.settings.newSiteThumbnail} />
        {:else if random !== null}
          <a href={data.settings.instagram} target="_blank">
            {#if mediaContent.video}
              <MuxVideo video={mediaContent.video} />
            {:else}
              <Image image={mediaContent.image} />
            {/if}
          </a>
        {/if}
      </div>
      <Heading
        link={viewData.heading3.link}
        bind:view
        date={viewData.heading3.date}
        headingType="h4"
      >
        {viewData.heading3.displayText}
      </Heading>
      <Heading
        link={viewData.heading4.link}
        bind:view
        date={viewData.heading4.date}
        headingType="h3"
        onclick={terminate}
      >
        {viewData.heading4.displayText}
      </Heading>
    </div>
    <div class="link-container">
      {#if view !== ViewType.LANDING}
        <button onclick={() => (view = ViewType.LANDING)}>RETURN</button>
      {:else}
        {#each data.settings.socials as social, index}
          {#if !social.copyOnClick}
            <a href={social.link} target="_blank">{social.displayText}</a>
          {:else}
            <CopyLink {social} />
          {/if}
          {#if index < data.settings.socials.length - 1}
            <span>{", "}</span>
          {/if}
        {/each}
      {/if}
    </div>

    {#if isTerminating}
      <img class="explosion" src="/assets/images/explosion.gif" />
    {/if}
  {:else}
    <h3>GONE :(</h3>
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    padding: var(--padding);
    box-sizing: border-box;

    @supports (height: 100dvh) {
      height: 100dvh;
    }

    &.terminating {
      pointer-events: none;
    }

    &.terminated {
      justify-content: center;
    }
  }

  .body-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: var(--main-shift);
  }

  .media-container {
    padding: 35px 0;
    height: var(--media-height);
  }

  .link-container {
    display: flex;
    align-items: flex-end;
  }

  .link-container span {
    white-space: pre;
  }

  :global(.link-container button) {
    font-size: var(--font-s);
  }

  .explosion {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 125vw;
    height: 75vh;
    object-fit: contain;

    @supports (height: 1dvh) {
      height: 75dvh;
    }

    transform: translateY(-50%) translateX(-50%);
  }
</style>
