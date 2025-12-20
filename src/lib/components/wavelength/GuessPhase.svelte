<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"
  import { sliderToDisplayValue } from "$lib/utils/colors"

  let {
    prompt,
    promptIndex,
    leftColor,
    rightColor,
    onLockIn,
  }: {
    prompt: Prompt
    promptIndex: number
    leftColor: string
    rightColor: string
    onLockIn: (guess: number) => void
  } = $props()

  // Internal value: -10 to 10 (representing 10% increments)
  let value = $state(0)
  let isDragging = $state(false)
  let dialEl: HTMLDivElement | null = $state(null)

  // Convert slider value (-10 to 10) to dial angle
  // -10 = 180° (left), 0 = 90° (center/up), 10 = 0° (right)
  function sliderToAngle(val: number): number {
    return 90 - val * 9
  }

  // Convert pointer position to slider value
  function pointerToValue(clientX: number, clientY: number): number {
    if (!dialEl) return 0
    const rect = dialEl.getBoundingClientRect()
    // Center point is at bottom center of the dial
    const centerX = rect.left + rect.width / 2
    const centerY = rect.bottom
    // Calculate angle from center to pointer
    const dx = clientX - centerX
    const dy = centerY - clientY

    // If pointer is below the dial baseline, clamp to nearest edge
    if (dy < 0) {
      return dx < 0 ? -10 : 10
    }

    // atan2 gives angle in radians, convert to degrees
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
    // Convert angle to value: 180° = -10, 90° = 0, 0° = 10
    const val = (90 - angleDeg) / 9
    // Snap to nearest integer and clamp
    return Math.max(-10, Math.min(10, Math.round(val)))
  }

  function handlePointerDown(e: PointerEvent) {
    isDragging = true
    value = pointerToValue(e.clientX, e.clientY)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return
    value = pointerToValue(e.clientX, e.clientY)
  }

  function handlePointerUp() {
    isDragging = false
  }

  function handleLockIn() {
    onLockIn(value)
  }

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

  // Interpolate color between left and right based on slider value
  function getArrowColor(val: number): string {
    // Extract hue from leftColor and rightColor (they're in HSL format)
    const leftMatch = leftColor.match(/hsl\((\d+),/)
    const rightMatch = rightColor.match(/hsl\((\d+),/)
    if (!leftMatch || !rightMatch) return "#646cff"

    const leftHue = parseInt(leftMatch[1])
    const rightHue = parseInt(rightMatch[1])

    // Normalize slider value to 0-1 range (-10 = 0, +10 = 1)
    const normalized = (val + 10) / 20
    // Interpolate hue (handle wraparound)
    let hueDiff = rightHue - leftHue
    if (hueDiff > 180) hueDiff -= 360
    if (hueDiff < -180) hueDiff += 360
    const currentHue = (leftHue + normalized * hueDiff + 360) % 360

    return `hsl(${Math.round(currentHue)}, 75%, 75%)`
  }

  let displayValue = $derived(sliderToDisplayValue(value))
  let angle = $derived(sliderToAngle(value))
  let arrowColor = $derived(getArrowColor(value))
</script>

<div class="mx-auto flex h-full w-full max-w-md flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Make Your Guess</h2>

  <div class="flex w-full flex-1 flex-col items-center justify-between gap-4">
    <!-- Dial Container -->
    <div class="flex w-full flex-1 flex-col items-center justify-center">
      <div
        bind:this={dialEl}
        class="relative aspect-2/1 w-full max-w-xs touch-none select-none"
        role="slider"
        tabindex="0"
        aria-valuemin={-10}
        aria-valuemax={10}
        aria-valuenow={value}
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerUp}
        onpointercancel={handlePointerUp}
        onkeydown={(e) => {
          if (e.key === "ArrowLeft") value = Math.max(-10, value - 1)
          if (e.key === "ArrowRight") value = Math.min(10, value + 1)
        }}
      >
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

        <!-- Arrow pointing to value -->
        {#if true}
          {@const rad = (angle * Math.PI) / 180}
          {@const tipX = 50 + Math.cos(rad) * 42}
          {@const tipY = 100 - Math.sin(rad) * 84}
          {@const headSize = 4}
          {@const headAngle1 = ((angle + 150) * Math.PI) / 180}
          {@const headAngle2 = ((angle - 150) * Math.PI) / 180}
          <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
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
                {tipX + Math.cos(headAngle1) * headSize}%,{tipY - Math.sin(headAngle1) * headSize * 2}%
                {tipX + Math.cos(headAngle2) * headSize}%,{tipY - Math.sin(headAngle2) * headSize * 2}%
              "
              fill={arrowColor}
            />
            <!-- Center pivot point (draggable indicator) -->
            <circle
              cx="50%"
              cy="100%"
              r="12"
              fill="#333"
              stroke={arrowColor}
              stroke-width="4"
              class="cursor-grab active:cursor-grabbing"
            />
          </svg>
        {/if}

        <!-- Percentage display -->
        <div class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4 text-center">
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

    <!-- Lock in button -->
    <button
      class="w-full max-w-xs cursor-pointer rounded-lg border-none bg-[#4caf50] p-4 text-xl font-bold text-white hover:bg-[#45a049]"
      onclick={handleLockIn}
      type="button"
    >
      Lock In Guess
    </button>
  </div>
</div>
