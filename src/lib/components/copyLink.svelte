<script lang="ts">
  import type { Social } from "$lib/types"
  let { social }: { social: Social } = $props()
  let isCopied = $state(false)

  const onclick = () => {
    navigator.clipboard.writeText(social.link)
    isCopied = true
  }
</script>

<button {onclick} class:copied={isCopied}>
  {isCopied ? "COPIED!" : social.displayText}
</button>

<style lang="scss">
  button {
    &.copied:hover {
      text-decoration: none;
    }
  }
</style>
