<script lang="ts">
  import { getGameContainerContext } from "$lib/components/layout/gameContainerContext.svelte"
  import { GREEN, PURPLE } from "$lib/constants/colors"
  import { headsupCategories, type HeadsUpCategory } from "$lib/data/headsupCategories"

  let {
    onSelect,
  }: {
    onSelect: (category: HeadsUpCategory) => void
  } = $props()

  const ctx = getGameContainerContext()
  $effect(() => {
    ctx.setBackground(GREEN, PURPLE)
  })
</script>

<div class={["flex flex-1 flex-col overflow-hidden", "px-4 pb-6"]}>
  <div class="mb-6 text-center">
    <h2 class="text-2xl font-bold text-white">Choose a Category</h2>
  </div>

  <div class={["grid auto-rows-min grid-cols-2 gap-3", "flex-1 overflow-y-auto"]}>
    {#each headsupCategories as category (category.id)}
      <button
        class={[
          "flex flex-col items-center justify-center gap-3",
          "p-4",
          "rounded-2xl",
          "cursor-pointer",
          "transition-all active:scale-[0.97]",
        ]}
        style:background-color={category.color.toRgba(0.15)}
        style:border="1px solid {category.color.toRgba(0.3)}"
        onclick={() => onSelect(category)}
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full"
          style:background-color={category.color.toRgba(0.25)}
        >
          <i class="{category.icon} text-2xl" style:color={category.color.toRgb()}></i>
        </div>
        <span class="text-base font-semibold" style:color={category.color.toRgb()}>
          {category.name}
        </span>
      </button>
    {/each}
  </div>
</div>
