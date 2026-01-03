<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements"

  import { Color } from "$lib/utils/colors"

  type Props = Omit<HTMLButtonAttributes, "class"> & {
    leftLabel: string
    rightLabel: string
    leftColor: Color
    rightColor: Color
    selected?: boolean
    class?: string
  }

  let {
    leftLabel,
    rightLabel,
    leftColor,
    rightColor,
    selected = false,
    class: className,
    ...restProps
  }: Props = $props()

  let gradient = $derived(Color.toGradient(leftColor, rightColor))
  let glowColor = $derived(leftColor.toHsl() + "40")
</script>

<div
  class={["rounded-2xl p-0.5 transition-all", className]}
  style:background={selected ? gradient : "#444"}
  style:box-shadow={selected ? `0 0 20px ${glowColor}` : "none"}
>
  <button
    type="button"
    class={[
      "flex w-full items-stretch overflow-hidden",
      "text-base",
      "bg-[#1a1a1a]",
      "rounded-[14px]",
      "cursor-pointer transition-all",
    ]}
    {...restProps}
  >
    <span
      class={[
        "flex flex-1 items-center justify-center",
        "px-3 py-5 md:px-6 md:py-6",
        "text-center text-base font-bold whitespace-nowrap md:text-2xl",
      ]}
      style:color={leftColor.toHsl()}
    >
      {leftLabel}
    </span>
    <div class="w-px self-stretch bg-white/20"></div>
    <span
      class={[
        "flex flex-1 items-center justify-center",
        "px-3 py-5 md:px-6 md:py-6",
        "text-center text-base font-bold whitespace-nowrap md:text-2xl",
      ]}
      style:color={rightColor.toHsl()}
    >
      {rightLabel}
    </span>
  </button>
</div>
