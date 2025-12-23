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
      class="w-full cursor-pointer rounded-xl bg-white/15 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/25 active:scale-[0.98]"
      style:background-color={primaryColor}
      onclick={onPrimary}
      type="button"
    >
      {primaryLabel}
    </button>
  </div>
{:else if equalButtons}
  <div class="flex w-full max-w-sm gap-3">
    <button
      class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
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
      class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
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
  <div class="flex w-full max-w-sm items-center gap-3">
    <button
      class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-white/20 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
      onclick={onBack}
      type="button"
      aria-label={backLabel}
    >
      <i class="fa-solid fa-arrow-left text-lg"></i>
    </button>
    <button
      class="flex-1 cursor-pointer rounded-xl bg-white/15 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-white/25 active:scale-[0.98]"
      onclick={onPrimary}
      type="button"
    >
      {primaryLabel}
    </button>
  </div>
{/if}
