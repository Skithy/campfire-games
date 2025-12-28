<script lang="ts">
  import "../app.css"
  import "../lib/css/all.css"

  import Navbar from "$lib/components/Navbar.svelte"

  let { children } = $props()
</script>

<div class={["flex flex-col", "h-dvh", "overflow-hidden", "bg-gray-900 text-white"]}>
  <Navbar />
  <main class={["flex flex-col", "min-h-0 flex-1", "overflow-hidden"]}>
    {@render children()}
  </main>
</div>
