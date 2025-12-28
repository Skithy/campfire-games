<script lang="ts">
  import type { Color } from "$lib/utils/colors"

  let {
    top,
    bottom,
  }: {
    top: Color
    bottom: Color
  } = $props()
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
  <!-- Top glow -->
  <div
    class={[
      "glow",
      "absolute top-0 left-1/2",
      "h-[60%] w-[160%]",
      "-translate-x-1/2",
      "rounded-[100%]",
      "blur-3xl",
      "transition-colors duration-700",
    ]}
    style:transform="translateY(-60%)"
    style:background-color={top.toRgb()}
    style:mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
    style:-webkit-mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
  ></div>
  <!-- Bottom glow -->
  <div
    class={[
      "glow",
      "absolute bottom-0 left-1/2",
      "h-[60%] w-[160%]",
      "-translate-x-1/2",
      "rounded-[100%]",
      "blur-3xl",
      "transition-colors duration-700",
    ]}
    style:transform="translateY(60%)"
    style:background-color={bottom.toRgb()}
    style:mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
    style:-webkit-mask-image="radial-gradient(ellipse at center, black 0%, transparent 60%)"
  ></div>
</div>

<style>
  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.4;
    }
  }

  .glow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
</style>
