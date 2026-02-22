<script lang="ts">
  import type { Image } from "$lib/types"
  let { image }: { image: Image } = $props()
</script>

<img src={image.asset.url} alt="" />

<style lang="scss">
  img {
    object-fit: cover;
  }
</style>
