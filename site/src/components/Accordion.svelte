<script lang="ts">
  import clsx from "clsx";
  import { createAccordion, melt } from "@melt-ui/svelte";
  import { slide } from "svelte/transition";

  export let items: {
    id: string;
    title: string;
    aside?: string;
    description: string;
  }[] = [];
  export let defaultValue: string | undefined = undefined;

  export let styles: {
    container?: string;
    item?: string;
    aside?: string;
    content?: string;
  } = {
    container: "",
    item: "",
    aside: "",
    content: "",
  };

  const {
    elements: { content, item, trigger, root },
    helpers: { isSelected },
  } = createAccordion({
    defaultValue,
  });
</script>

<div class={clsx(["rounded bg-white shadow-lg", styles.container])} {...$root}>
  {#each items as { id, title, description, aside }, i}
    <div
      use:melt={$item(id)}
      class="overflow-hidden transition-colors first:rounded-t-xl last:rounded-b-xl"
    >
      <button
        use:melt={$trigger(id)}
        class={clsx([
          "flex cursor-pointer w-full bg-white px-5 py-5 justify-between",
          "transition-colors hover:bg-neutral-100",
          i !== 0 && "border-t border-t-neutral-300",
          styles.item,
        ])}
      >
        <h2 class="flex">
          {title}
        </h2>
        {#if aside}
          <aside class={clsx([styles.aside])}>
            {aside}
          </aside>
        {/if}
      </button>
      {#if $isSelected(id)}
        <div
          class={clsx(["overflow-hidden bg-neutral-100", styles.content])}
          use:melt={$content(id)}
          transition:slide
        >
          <div class="px-5 py-4">
            {description}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
