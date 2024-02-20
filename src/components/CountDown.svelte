<script lang="ts">
  import { onMount, beforeUpdate } from "svelte";
  export let date: Date = new Date(Date.now());
  let timeLeft = date.getTime() - Date.now();
  let days: number, hours: number, minutes: number, seconds: number;

  onMount(() => {
    const interval = setInterval(() => {
      timeLeft -= 1000;
      if (timeLeft < 0) {
        clearInterval(interval);
        timeLeft = 0;
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  beforeUpdate(() => {
    seconds = Math.floor((timeLeft / 1000) % 60);
    minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  });
</script>

{#key timeLeft}
  {#if days > 0}
    <span>
      {days} Day{#if days !== 1}s{/if},
    </span>
  {/if}
  {#if hours > 0}
    <span>
      {hours} hour{#if hours !== 1}s{/if},
    </span>
  {/if}
  {#if minutes > 0}
    <span>
      {minutes} Minute{#if minutes !== 1}s{/if},
    </span>
  {/if}
  <span>
    {seconds} Second{#if seconds !== 1}s{/if}
  </span>
{/key}
