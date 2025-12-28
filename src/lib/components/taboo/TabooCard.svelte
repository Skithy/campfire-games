<script lang="ts">
  import type { TabooCard } from "$lib/data/tabooCards"
  import type { Color } from "$lib/utils/colors"

  let {
    card,
    teamColor,
  }: {
    card: TabooCard
    teamColor: Color
  } = $props()
</script>

<div class={["flex flex-col", "w-60", "overflow-hidden", "bg-white", "rounded-2xl", "shadow-2xl"]}>
  <!-- Main word header -->
  <div
    class="flex items-center justify-center px-6 py-5"
    style:background-color={teamColor.toRgb()}
  >
    <h2 class="text-3xl font-black tracking-wide text-white uppercase">{card.word}</h2>
  </div>

  <!-- Forbidden words -->
  <div class="flex flex-col divide-y divide-gray-200 bg-white">
    {#each card.forbidden as word (word)}
      <div class="flex items-center gap-3 px-6 py-3">
        <i class="fa-solid fa-ban text-lg" style:color={teamColor.toRgba(0.6)}></i>
        <span class="text-lg font-semibold text-gray-800">{word}</span>
      </div>
    {/each}
  </div>
</div>
