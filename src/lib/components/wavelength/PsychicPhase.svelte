<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { getSliderColor, sliderToDisplayValue } from "$lib/utils/colors"

  let {
    selectedPrompt,
    selectedPromptIndex,
    target,
    leftColor,
    rightColor,
    onReadyToGuess,
    onBack,
  }: {
    selectedPrompt: Prompt
    selectedPromptIndex: number
    target: number // -10 to 10 internal value
    leftColor: string
    rightColor: string
    onReadyToGuess: () => void
    onBack: () => void
  } = $props()

  // Convert slider value (-10 to 10) to dial angle
  // -10 = 180° (left, pointing left)
  // 0 = 90° (center, pointing up)
  // 10 = 0° (right, pointing right)
  function sliderToAngle(value: number): number {
    // Map -10..10 to 180..0 degrees
    return 90 - value * 9
  }

  let displayValue = $derived(sliderToDisplayValue(target))
  let angle = $derived(sliderToAngle(target))
  let arrowColor = $derived(getSliderColor(target, selectedPromptIndex, 3))

  // Tick marks for the dial (every 20% = every 2 slider units)
  const tickAngles = [
    { value: -8, angle: 162 },
    { value: -6, angle: 144 },
    { value: -4, angle: 126 },
    { value: -2, angle: 108 },
    { value: 0, angle: 90 },
    { value: 2, angle: 72 },
    { value: 4, angle: 54 },
    { value: 6, angle: 36 },
    { value: 8, angle: 18 },
  ]
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Make a clue!</h2>

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <div class="relative aspect-2/1 w-full max-w-xs">
        <!-- Semicircle background -->
        <div
          class="absolute inset-0 overflow-hidden rounded-t-full border-4 border-b-0 border-[#555] bg-[#222]"
        >
          <!-- Gradient overlay showing spectrum -->
          <div
            class="absolute inset-0 rounded-t-full opacity-30"
            style="background: linear-gradient(to right, {leftColor}, {rightColor})"
          ></div>
        </div>

        <!-- Tick marks on the arc -->
        {#each tickAngles as tick (tick.value)}
          {@const isCenter = tick.value === 0}
          {@const rad = (tick.angle * Math.PI) / 180}
          {@const outerX = 50 + Math.cos(rad) * 48}
          {@const outerY = 100 - Math.sin(rad) * 96}
          {@const innerX = 50 + Math.cos(rad) * 40}
          {@const innerY = 100 - Math.sin(rad) * 80}
          <svg class="absolute inset-0 h-full w-full overflow-visible">
            <line
              x1="{outerX}%"
              y1="{outerY}%"
              x2="{innerX}%"
              y2="{innerY}%"
              stroke={isCenter ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)"}
              stroke-width={isCenter ? 3 : 2}
            />
          </svg>
        {/each}

        <!-- Arrow pointing to target -->
        {#if true}
          {@const rad = (angle * Math.PI) / 180}
          {@const tipX = 50 + Math.cos(rad) * 42}
          {@const tipY = 100 - Math.sin(rad) * 84}
          {@const headSize = 4}
          {@const headAngle1 = ((angle + 150) * Math.PI) / 180}
          {@const headAngle2 = ((angle - 150) * Math.PI) / 180}
          <svg class="absolute inset-0 h-full w-full overflow-visible">
            <!-- Arrow line -->
            <line
              x1="50%"
              y1="100%"
              x2="{50 + Math.cos(rad) * 38}%"
              y2="{100 - Math.sin(rad) * 76}%"
              stroke={arrowColor}
              stroke-width="6"
              stroke-linecap="round"
            />
            <!-- Arrow head -->
            <polygon
              points="
                {tipX}%,{tipY}%
                {tipX + Math.cos(headAngle1) * headSize}%,{tipY -
                Math.sin(headAngle1) * headSize * 2}%
                {tipX + Math.cos(headAngle2) * headSize}%,{tipY -
                Math.sin(headAngle2) * headSize * 2}%
              "
              fill={arrowColor}
            />
            <!-- Center pivot point -->
            <circle cx="50%" cy="100%" r="8" fill="#333" stroke={arrowColor} stroke-width="3" />
          </svg>
        {/if}

        <!-- Percentage display -->
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4 text-center">
          <span
            class="rounded-full px-4 py-2 text-2xl font-bold text-black"
            style="background-color: {arrowColor}"
          >
            {displayValue}%
          </span>
        </div>
      </div>

      <!-- Prompt labels at the ends -->
      <div class="mt-16 flex w-full max-w-sm items-stretch justify-between gap-4">
        <div
          class="flex-1 rounded-lg p-3 text-center text-lg font-bold text-black"
          style="background-color: {leftColor}"
        >
          {selectedPrompt[0]}
        </div>
        <div
          class="flex-1 rounded-lg p-3 text-center text-lg font-bold text-black"
          style="background-color: {rightColor}"
        >
          {selectedPrompt[1]}
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex w-full max-w-xs flex-col gap-4">
      <button
        class="w-full cursor-pointer rounded-lg border-none bg-[#646cff] p-4 text-xl font-bold text-white hover:bg-[#535bf2]"
        onclick={onReadyToGuess}
        type="button"
      >
        Ready!
      </button>
      <button
        class="cursor-pointer border-none bg-transparent text-[#888] underline hover:text-white"
        onclick={onBack}
        type="button"
      >
        Back to Prompts
      </button>
    </div>
  </div>
</div>
