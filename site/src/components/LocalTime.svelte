<script lang="ts">
  export let date: Date = new Date(Date.now());
  export let options: Intl.DateTimeFormatOptions = {};
</script>

<span>{date.toLocaleTimeString(document.documentElement.lang, options)}</span>
