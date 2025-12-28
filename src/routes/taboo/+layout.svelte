<script lang="ts">
  import GameContainer from "$lib/components/layout/GameContainer.svelte"

  let { children } = $props()
</script>

<div class="relative flex h-full flex-col overflow-hidden bg-[#111] font-sans text-white">
  <GameContainer>
    {@render children()}
  </GameContainer>
</div>
