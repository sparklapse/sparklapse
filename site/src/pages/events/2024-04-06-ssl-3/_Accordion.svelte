<script lang="ts">
  import Accordion from "$components/Accordion.svelte";

  export let dates: Record<string, Date>;
</script>

<Accordion
  items={[
    {
      id: "warm-up",
      title: "🔥 Warm Up Games",
      aside: dates.warmup.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "shortGeneric",
      }),
      description: "Join early for rank capped warm up games!",
    },
    {
      id: "main-event",
      title: "🏆 Main Event",
      aside: dates.main.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "shortGeneric",
      }),
      description:
        "The main event consists of 8 standard games and 8 gimmick games, with each game lasting 3-8 minutes. Gimmick games are a staple of Super Streamer Lobbies, in which we run several custom game modes to maximize laughs and clippable moments.",
    },
    {
      id: "afterparty",
      title: "🎉 Afterparty Showcase",
      aside: dates.afterparty.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "shortGeneric",
      }),
      description:
        "Come watch the Twitch showcase of the best clips and highlights from all 200 streamers in the event, along with some interviews and giveaways!",
    },
  ]}
  defaultValue="main-event"
  styles={{
    container: "w-full",
    item: "text-xl font-extrabold",
    aside: "text-neutral-300",
  }}
/>
