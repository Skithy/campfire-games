<script lang="ts">
  import "../app.css"
  import "../lib/css/all.css"

  let { children } = $props()
</script>

<div class="flex min-h-screen flex-col">

  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
</div>
