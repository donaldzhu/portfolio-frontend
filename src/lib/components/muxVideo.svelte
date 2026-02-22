<script lang="ts">
  import type { MuxVideo } from "$lib/types"
  import "@mux/mux-player"

  let { video }: { video: MuxVideo } = $props()
</script>

<mux-player
  stream-type="on-demand"
  playback-id={video.asset.playbackId}
  thumbnail-time={0}
  autoplay
  loop
  muted
>
</mux-player>

<style lang="scss">
  mux-player {
    background-color: white;
    /* Hide all controls at once */
    --controls: none;

    /* Hide the error dialog */
    --dialog: none;

    /* Hide the loading indicator */
    --loading-indicator: none;

    /* Target all sections by excluding the section prefix */
    --play-button: none;
    --live-button: none;
    --seek-backward-button: none;
    --seek-forward-button: none;
    --mute-button: none;
    --captions-button: none;
    --airplay-button: none;
    --pip-button: none;
    --fullscreen-button: none;
    --cast-button: none;
    --playback-rate-button: none;
    --volume-range: none;
    --time-range: none;
    --time-display: none;
    --duration-display: none;
    --rendition-menu-button: none;

    /* Target a specific section by prefixing the CSS var with (top|center|bottom) */
    --center-controls: none;
    --bottom-play-button: none;

    --media-background-color: transparent;
  }
</style>
