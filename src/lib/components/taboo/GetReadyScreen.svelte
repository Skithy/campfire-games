<script lang="ts">
  import type { Color } from "$lib/utils/colors"

  let {
    teamName,
    teamColor,
    onStart,
  }: {
    teamName: string
    teamColor: Color
    onStart: () => void
  } = $props()
</script>

<div class="flex h-full flex-col items-center justify-center gap-12 px-4 py-6">
  <div class="space-y-4 text-center">
    <p class="text-lg font-medium uppercase tracking-widest text-white/60">Get Ready</p>
    <h1 class="text-5xl font-black text-white sm:text-6xl" style:color={teamColor.toRgb()}>
      {teamName}
    </h1>
    <p class="text-lg text-white/70">Pass the device to your team's clue giver</p>
  </div>

  <button
    class="group relative cursor-pointer overflow-hidden rounded-2xl p-0.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
    style:background-color={teamColor.toRgb()}
    onclick={onStart}
  >
    <span
      class="flex items-center justify-center gap-2 rounded-[14px] bg-[#1a1a1a] px-12 py-5 text-xl font-bold text-white transition-colors group-hover:bg-transparent"
    >
      <i class="fa-solid fa-play text-base"></i>
      Start Round
    </span>
  </button>
</div>
