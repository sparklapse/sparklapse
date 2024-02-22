<!-- 
  We have to island this accordion for the `toLocaleTimeString`
  to use the users local timezone.
 -->

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
      description:
        "Join early for rank-capped warm up games!\n(No prizes, just for fun!)",
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
    {
      id: "prizes",
      title: "🎁 Prizes",
      description:
        "During the main event, have your chance at winning gifted subs to those streaming the event! A raffle will be open at the start of the main event for a chance to win fully paid comissioned work from @milkthos_sena. Winners of the raffle will be announced during the afterparty showcase.",
    },
  ]}
  defaultValue="main-event"
  styles={{
    container: "w-full",
    item: "text-xl font-extrabold",
    aside: "text-neutral-300",
  }}
/>
