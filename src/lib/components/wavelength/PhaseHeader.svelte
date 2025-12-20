<script lang="ts">
  let {
    label,
    title,
    description,
    bgClass,
  }: {
    label: string
    title: string
    description: string
    bgClass: string
  } = $props()

  // Map bg class to label text color
  let labelColorClass = $derived.by(() => {
    if (bgClass.includes("amber")) return "text-amber-400"
    if (bgClass.includes("purple")) return "text-purple-400"
    if (bgClass.includes("green")) return "text-white/70"
    if (bgClass.includes("red")) return "text-white/70"
    return "text-white/70"
  })
</script>

<div class="flex w-full flex-col items-center gap-2 rounded-xl {bgClass} px-6 py-3">
  <span class="text-xs font-semibold tracking-widest uppercase {labelColorClass}">{label}</span>
  <h2 class="text-2xl font-bold text-white">{title}</h2>
  <p class="text-center text-sm text-gray-400">{description}</p>
</div>
