<!-- 
  We have to island this accordion for the `toLocaleTimeString`
  to use the users local timezone.
 -->

<script lang="ts">
  import Accordion from "$components/Accordion.svelte";

  export let items: {
    id: string;
    title: string;
    aside?: Date;
    description: string;
  }[];
  $: localised = items.map((item) => ({
    ...item,
    aside: item.aside?.toLocaleTimeString(document.documentElement.lang, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "shortGeneric",
    }),
  }));
  export let initial: string;
</script>

<Accordion
  items={localised}
  defaultValue={initial}
  styles={{
    container: "w-full",
    item: "text-xl font-extrabold",
    aside: "text-neutral-300",
  }}
/>
