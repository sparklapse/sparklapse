<script lang="ts">
  import { keystone, gql } from "$connections/keystone";
  import { onMount } from "svelte";

  let scroller: HTMLDivElement;
  let streamers: string[] = [];
  onMount(async () => {
    const request = await keystone.query<{
      eventDoc: {
        document: {
          document: { type: string; children: { text: string }[] }[];
        };
      };
    }>({
      query: gql`
        query EventDoc($where: EventDocWhereUniqueInput!) {
          eventDoc(where: $where) {
            document {
              document
            }
          }
        }
      `,
      variables: {
        where: {
          id: "clsu1o13c0000tiv09bxkfd1a",
        },
      },
    });
    streamers = request.data.eventDoc.document.document
      .map((doc) => doc.children.at(0)?.text)
      .filter((streamer) => typeof streamer === "string") as string[];

    // Shuffle the streamers
    for (let i = streamers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [streamers[i], streamers[j]] = [streamers[j], streamers[i]];
    }

    requestAnimationFrame(() => {
      const height = scroller.querySelector("div")!.clientHeight;
      scroller.animate(
        [{ transform: "translateY(0)" }, { transform: `translateY(-${height}px)` }],
        {
          duration: 30000,
          iterations: Infinity,
        },
      );
    });
  });

  $: doubleCol = streamers
    .slice(0, Math.floor(streamers.length / 2))
    .map((v, i) => [v, streamers[i + Math.floor(streamers.length / 2)]]);
</script>

<div class="max-h-72 overflow-hidden">
  <div class="text-xl font-bold" bind:this={scroller}>
    <div class="flex flex-col">
      {#each doubleCol as [a, b]}
        <div class="flex justify-center gap-4 *:w-full">
          <span class="text-right">{a}</span>
          <span class="text-left">{b}</span>
        </div>
      {/each}
    </div>
    <div class="flex flex-col">
      {#each doubleCol as [a, b]}
        <div class="flex justify-center gap-4 *:w-full">
          <span class="text-right">{a}</span>
          <span class="text-left">{b}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
