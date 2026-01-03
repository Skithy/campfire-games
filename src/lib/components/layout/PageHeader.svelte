<script lang="ts">
  import type { Color } from "$lib/utils/colors"

  let {
    label,
    title,
    description,
    color,
  }: {
    label: string
    title: string
    description: string
    color: Color
  } = $props()
</script>

<div
  class={[
    "flex flex-col items-center gap-2 md:gap-4",
    "w-full",
    "px-6 py-3 md:px-10 md:py-5",
    "rounded-xl",
    "transition-colors duration-300",
  ]}
  style:background-color={color.toRgba(0.2)}
>
  <span
    class="text-xs font-semibold tracking-widest uppercase md:text-base"
    style:color={color.toRgb()}>{label}</span
  >
  <h2 class="text-2xl font-bold text-white md:text-4xl">{title}</h2>
  <p class="text-center text-sm text-gray-400 md:text-lg">{description}</p>
</div>
