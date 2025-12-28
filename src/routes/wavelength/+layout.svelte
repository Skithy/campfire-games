<script lang="ts">
  import GameContainer from "$lib/components/layout/GameContainer.svelte"

  let { children } = $props()
</script>

<div class={["relative overflow-hidden", "flex flex-col", "h-full", "font-sans text-white", "bg-[#111]"]}>
  <GameContainer>
    {@render children()}
  </GameContainer>
</div>
