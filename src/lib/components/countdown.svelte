<script lang="ts">
  import { onMount } from "svelte"

  let { date }: { date: string } = $props()

  const [y, m, d] = $derived(date.split("-").map(Number))
  const target = $derived(new Date(y, m - 1, d, 0, 0, 0, 0))

  let timeNow = $state(new Date())

  const timeDiffToNow = (now: Date) => {
    const diffMs = Math.abs(target.getTime() - now.getTime())

    const totalSeconds = Math.floor(diffMs / 1000)

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad2 = (n: number) => String(n).padStart(2, "0")
    return `${pad2(days)}d ${pad2(hours)}h ${pad2(minutes)}min ${pad2(seconds)}sec`
  }

  const timeDiff = $derived(timeDiffToNow(timeNow))

  onMount(() => {
    const interval = setInterval(() => {
      timeNow = new Date()
    }, 500)
    return () => clearInterval(interval)
  })
</script>

{timeDiff}
