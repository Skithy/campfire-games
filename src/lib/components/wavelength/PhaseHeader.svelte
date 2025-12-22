<script lang="ts">
  let {
    label,
    title,
    description,
    bgColor,
  }: {
    label: string
    title: string
    description: string
    bgColor: string
  } = $props()

  // Map bg color to label text color
  let labelColorClass = $derived.by(() => {
    if (bgColor.includes("amber") || bgColor.includes("180, 140")) return "text-amber-400"
    if (bgColor.includes("purple") || bgColor.includes("140, 100, 180")) return "text-purple-400"
    if (bgColor.includes("green") || bgColor.includes("80, 160, 120")) return "text-green-400"
    if (bgColor.includes("red") || bgColor.includes("180, 100, 100")) return "text-red-400"
    return "text-white/70"
  })
</script>

<div
  class="flex w-full flex-col items-center gap-2 rounded-xl px-6 py-3"
  style="background-color: {bgColor}; transition: background-color 300ms;"
>
  <span class="text-xs font-semibold tracking-widest uppercase {labelColorClass}">{label}</span>
  <h2 class="text-2xl font-bold text-white">{title}</h2>
  <p class="text-center text-sm text-gray-400">{description}</p>
</div>
