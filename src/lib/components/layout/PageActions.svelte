<script lang="ts">
  let {
    onBack,
    onPrimary,
    primaryLabel,
    backLabel = "Go back",
    equalButtons = false,
    singleButton = false,
    backIcon,
    primaryIcon,
    primaryColor,
  }: {
    onBack?: () => void
    onPrimary: () => void
    primaryLabel: string
    backLabel?: string
    equalButtons?: boolean
    singleButton?: boolean
    backIcon?: string
    primaryIcon?: string
    primaryColor?: string
  } = $props()
</script>

{#if singleButton}
  <div class="w-full max-w-sm">
    <button
      class={["w-full", "px-6 py-4", "text-lg font-semibold text-white", "bg-white/15", "rounded-xl", "cursor-pointer transition-all hover:bg-white/25 active:scale-[0.98]"]}
      style:background-color={primaryColor}
      onclick={onPrimary}
      type="button"
    >
      {primaryLabel}
    </button>
  </div>
{:else if equalButtons}
  <div class={["flex gap-3", "w-full max-w-sm"]}>
    <button
      class={["flex flex-1 items-center justify-center gap-2", "px-6 py-4", "text-lg font-semibold text-white", "bg-white/10", "rounded-xl", "cursor-pointer transition-all hover:bg-white/20 active:scale-[0.98]"]}
      onclick={onBack}
      type="button"
      aria-label={backLabel}
    >
      {#if backIcon}
        <i class="{backIcon} text-base"></i>
      {/if}
      {backLabel}
    </button>
    <button
      class={["flex flex-1 items-center justify-center gap-2", "px-6 py-4", "text-lg font-semibold text-white", "rounded-xl", "cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]"]}
      style:background-color={primaryColor || "rgb(255 255 255 / 0.15)"}
      onclick={onPrimary}
      type="button"
    >
      {#if primaryIcon}
        <i class="{primaryIcon} text-base"></i>
      {/if}
      {primaryLabel}
    </button>
  </div>
{:else}
  <div class={["flex items-center gap-3", "w-full max-w-sm"]}>
    <button
      class={["flex items-center justify-center", "h-14 w-14", "text-white/60", "border border-white/20 rounded-xl", "cursor-pointer transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"]}
      onclick={onBack}
      type="button"
      aria-label={backLabel}
    >
      <i class="fa-solid fa-arrow-left text-lg"></i>
    </button>
    <button
      class={["flex-1", "px-6 py-4", "text-lg font-semibold text-white", "bg-white/15", "rounded-xl", "cursor-pointer transition-all hover:bg-white/25 active:scale-[0.98]"]}
      onclick={onPrimary}
      type="button"
    >
      {primaryLabel}
    </button>
  </div>
{/if}
