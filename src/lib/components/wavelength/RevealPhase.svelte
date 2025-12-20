<script lang="ts">
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import { getSliderColor, sliderToDisplayValue } from "$lib/utils/colors"

  let {
    prompt,
    target,
    guess,
    leftColor,
    rightColor,
    onNextRound,
  }: {
    prompt: Prompt
    target: number // -10 to 10 internal value
    guess: number // -10 to 10 internal value
    leftColor: string
    rightColor: string
    onNextRound: () => void
  } = $props()

  let scoreMessage = $derived.by(() => {
    const difference = Math.abs(target - guess)
    if (difference === 0) return "PERFECT!"
    if (difference <= 1) return "So Close!"
    if (difference <= 3) return "Not Bad"
    return "Way Off..."
  })

  let index = $derived(
    wavelengthPrompts.findIndex((p) => p[0] === prompt[0] && p[1] === prompt[1]),
  )

  // Convert slider value (-10 to 10) to dial angle
  // -10 = 180° (left), 0 = 90° (center/up), 10 = 0° (right)
  function sliderToAngle(val: number): number {
    return 90 - val * 9
  }

  let targetDisplay = $derived(sliderToDisplayValue(target))
  let guessDisplay = $derived(sliderToDisplayValue(guess))
  let targetAngle = $derived(sliderToAngle(target))
  let guessAngle = $derived(sliderToAngle(guess))
  let targetColor = $derived(
    index !== -1 ? getSliderColor(target, index, wavelengthPrompts.length) : "#4caf50",
  )
  let guessColor = $derived(
    index !== -1 ? getSliderColor(guess, index, wavelengthPrompts.length) : "#646cff",
  )

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

  // Calculate the arc between target and guess for showing the difference
  let diffStart = $derived(Math.min(targetAngle, guessAngle))
  let diffEnd = $derived(Math.max(targetAngle, guessAngle))
  let diffAngle = $derived(diffEnd - diffStart)
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 p-4">
  <div class="text-center">
    <h2
      class="m-0 bg-gradient-to-r from-[#ff4444] to-[#ffff44] bg-clip-text text-5xl font-bold text-transparent"
    >
      {scoreMessage}
    </h2>
  </div>

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
          <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
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

        <!-- Difference arc between target and guess -->
        {#if diffAngle > 0}
          {@const radius = 30}
          {@const startRad = (diffStart * Math.PI) / 180}
          {@const endRad = (diffEnd * Math.PI) / 180}
          {@const startX = 50 + Math.cos(endRad) * radius}
          {@const startY = 100 - Math.sin(endRad) * radius * 2}
          {@const endX = 50 + Math.cos(startRad) * radius}
          {@const endY = 100 - Math.sin(startRad) * radius * 2}
          <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <path
              d="M {startX}% {startY}% A {radius}% {radius * 2}% 0 0 1 {endX}% {endY}%"
              fill="none"
              stroke="rgba(255, 100, 100, 0.5)"
              stroke-width="8"
              stroke-linecap="round"
            />
          </svg>
        {/if}

        <!-- Target arrow -->
        {#if true}
          {@const targetRad = (targetAngle * Math.PI) / 180}
          {@const targetTipX = 50 + Math.cos(targetRad) * 42}
          {@const targetTipY = 100 - Math.sin(targetRad) * 84}
          {@const headSize = 4}
          {@const targetHeadAngle1 = ((targetAngle + 150) * Math.PI) / 180}
          {@const targetHeadAngle2 = ((targetAngle - 150) * Math.PI) / 180}
          <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <!-- Arrow line -->
            <line
              x1="50%"
              y1="100%"
              x2="{50 + Math.cos(targetRad) * 38}%"
              y2="{100 - Math.sin(targetRad) * 76}%"
              stroke={targetColor}
              stroke-width="6"
              stroke-linecap="round"
            />
            <!-- Arrow head -->
            <polygon
              points="
                {targetTipX}%,{targetTipY}%
                {targetTipX + Math.cos(targetHeadAngle1) * headSize}%,{targetTipY -
                Math.sin(targetHeadAngle1) * headSize * 2}%
                {targetTipX + Math.cos(targetHeadAngle2) * headSize}%,{targetTipY -
                Math.sin(targetHeadAngle2) * headSize * 2}%
              "
              fill={targetColor}
            />
          </svg>
        {/if}

        <!-- Guess arrow -->
        {#if true}
          {@const guessRad = (guessAngle * Math.PI) / 180}
          {@const guessTipX = 50 + Math.cos(guessRad) * 42}
          {@const guessTipY = 100 - Math.sin(guessRad) * 84}
          {@const headSize = 4}
          {@const guessHeadAngle1 = ((guessAngle + 150) * Math.PI) / 180}
          {@const guessHeadAngle2 = ((guessAngle - 150) * Math.PI) / 180}
          <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <!-- Arrow line -->
            <line
              x1="50%"
              y1="100%"
              x2="{50 + Math.cos(guessRad) * 38}%"
              y2="{100 - Math.sin(guessRad) * 76}%"
              stroke={guessColor}
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="8 4"
            />
            <!-- Arrow head -->
            <polygon
              points="
                {guessTipX}%,{guessTipY}%
                {guessTipX + Math.cos(guessHeadAngle1) * headSize}%,{guessTipY -
                Math.sin(guessHeadAngle1) * headSize * 2}%
                {guessTipX + Math.cos(guessHeadAngle2) * headSize}%,{guessTipY -
                Math.sin(guessHeadAngle2) * headSize * 2}%
              "
              fill={guessColor}
            />
          </svg>
        {/if}

        <!-- Center pivot point -->
        <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50%" cy="100%" r="8" fill="#333" stroke="#fff" stroke-width="3" />
        </svg>

        <!-- Legend below dial -->
        <div
          class="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full gap-6 pt-4 text-sm"
        >
          <div class="flex items-center gap-2">
            <div class="h-3 w-6 rounded" style="background-color: {targetColor}"></div>
            <span class="text-gray-300">Target: {targetDisplay}%</span>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="h-3 w-6 rounded"
              style="background: repeating-linear-gradient(90deg, {guessColor} 0px, {guessColor} 4px, transparent 4px, transparent 6px)"
            ></div>
            <span class="text-gray-300">Guess: {guessDisplay}%</span>
          </div>
        </div>
      </div>

      <!-- Prompt labels at the ends -->
      <div class="mt-20 flex w-full max-w-sm items-stretch justify-between gap-4">
        <div
          class="flex-1 rounded-lg p-3 text-center text-lg font-bold text-black"
          style="background-color: {leftColor}"
        >
          {prompt[0]}
        </div>
        <div
          class="flex-1 rounded-lg p-3 text-center text-lg font-bold text-black"
          style="background-color: {rightColor}"
        >
          {prompt[1]}
        </div>
      </div>
    </div>

    <!-- Next round button -->
    <button
      class="w-full max-w-xs cursor-pointer rounded-lg border-none bg-white p-4 text-xl font-bold text-black hover:bg-gray-100"
      onclick={onNextRound}
      type="button"
    >
      Start Next Round
    </button>
  </div>
</div>
