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
  class="flex w-full flex-col items-center gap-2 rounded-xl px-6 py-3"
  style="background-color: {color.toRgba(0.2)}; transition: background-color 300ms;"
>
  <span class="text-xs font-semibold tracking-widest uppercase" style:color={color.toRgb()}
    >{label}</span
  >
  <h2 class="text-2xl font-bold text-white">{title}</h2>
  <p class="text-center text-sm text-gray-400">{description}</p>
</div>
