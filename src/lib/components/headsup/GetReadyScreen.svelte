<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import PageActions from "$lib/components/layout/PageActions.svelte"
  import { GREEN, PURPLE } from "$lib/constants/colors"

  let {
    onStart,
  }: {
    onStart: () => void
  } = $props()

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
  })
</script>

<div class="flex flex-1 flex-col items-center justify-between gap-6">
  <div class="flex flex-1 flex-col items-center justify-center gap-6">
    <div class="space-y-2 text-center">
      <p class="text-sm font-medium tracking-widest text-white/60 uppercase">Get Ready</p>
      <h1 class="text-3xl font-black" style:color={GREEN.toRgb()}>Hold Phone to Forehead</h1>
      <p class="text-sm text-white/70">Screen faces outward so others can see</p>
    </div>

    <div
      class={[
        "max-w-md",
        "p-6",
        "text-center",
        "bg-white/5",
        "rounded-xl",
        "backdrop-blur-sm",
        "space-y-3",
      ]}
    >
      <div class="flex justify-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            style:background-color={GREEN.toRgba(0.2)}
          >
            <i class="fa-solid fa-arrow-down text-xl" style:color={GREEN.toRgb()}></i>
          </div>
          <span class="text-xs text-white/70">Correct</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <i class="fa-solid fa-arrow-up text-xl text-white/60"></i>
          </div>
          <span class="text-xs text-white/70">Skip</span>
        </div>
      </div>
      <p class="pt-2 text-xs text-white/50">On desktop: Arrow keys ↑↓</p>
    </div>
  </div>

  <PageActions right={{ label: "Start Round", onclick: onStart, color: GREEN.toRgb() }} />
</div>
