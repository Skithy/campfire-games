<script lang="ts">
  import "../app.css"
  import "../lib/css/all.css"
  import Navbar from "$lib/components/Navbar.svelte"

  let { children } = $props()
</script>

<div class="flex min-h-screen flex-col bg-gray-900 text-white">
  <Navbar />
  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
</div>
