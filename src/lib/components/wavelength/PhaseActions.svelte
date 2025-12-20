<script lang="ts">
  let {
    onBack,
    onPrimary,
    primaryLabel,
    backLabel = "Go back",
  }: {
    onBack: () => void
    onPrimary: () => void
    primaryLabel: string
    backLabel?: string
  } = $props()
</script>

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
