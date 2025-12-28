<script lang="ts">
  import "../app.css"
  import "../lib/css/all.css"

  import GameContainer from "$lib/components/layout/GameContainer.svelte"

  let { children } = $props()
</script>

<div class={["flex flex-col", "h-dvh", "overflow-hidden", "bg-gray-900 text-white"]}>
  <main class={["relative overflow-hidden", "flex flex-col", "min-h-0 flex-1", "bg-[#111]"]}>
    <GameContainer>
      {@render children()}
    </GameContainer>
  </main>
</div>
