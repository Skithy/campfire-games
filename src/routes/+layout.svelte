<script lang="ts">
  import "../app.css"
  import "../lib/css/all.css"

  import Header from "./Header.svelte"

  let { children } = $props()
</script>

<div class="flex min-h-screen flex-col">
  <Header />

  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
</div>
