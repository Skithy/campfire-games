<script lang="ts">
  import type { Prompt } from "$lib/data/wavelengthPrompts"

  type Arrow = {
    value: number
    color: string
    label?: string
    displayValue?: number
    style?: "solid" | "dashed"
  }

  let {
    prompt,
    leftColor,
    rightColor,
    arrows = [],
    showDifferenceWedge = false,
    interactive = false,
    value = $bindable(0),
    ondragstart,
    ondragend,
  }: {
    prompt: Prompt
    leftColor: string
    rightColor: string
    arrows?: Arrow[]
    showDifferenceWedge?: boolean
    interactive?: boolean
    value?: number
    ondragstart?: () => void
    ondragend?: () => void
  } = $props()

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
    if (!interactive) return
    isDragging = true
    value = pointerToValue(e.clientX, e.clientY)
    ondragstart?.()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!interactive || !isDragging) return
    value = pointerToValue(e.clientX, e.clientY)
  }

  function handlePointerUp() {
    if (!interactive || !isDragging) return
    isDragging = false
    ondragend?.()
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

  // Calculate difference wedge if needed
  let diffStart = $derived.by(() => {
    if (!showDifferenceWedge || arrows.length < 2) return 0
    const angles = arrows.map((a) => sliderToAngle(a.value))
    return Math.min(...angles)
  })

  let diffEnd = $derived.by(() => {
    if (!showDifferenceWedge || arrows.length < 2) return 0
    const angles = arrows.map((a) => sliderToAngle(a.value))
    return Math.max(...angles)
  })

  let diffAngle = $derived(diffEnd - diffStart)
</script>

<div class="w-full px-8">
  {#if interactive}
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
      {@render dialContent()}
    </div>
  {:else}
    <div bind:this={dialEl} class="relative aspect-2/1 w-full max-w-xs">
      {@render dialContent()}
    </div>
  {/if}
</div>

{#snippet dialContent()}
  <!-- Semicircle background with gradient - solid like mini dial -->
  <div
    class="absolute inset-0 rounded-t-full"
    style="background: linear-gradient(to right, {leftColor} 0%, hsl(0, 0%, 95%) 50%, {rightColor} 100%);"
  ></div>
  <!-- Border overlay -->
  <div class="absolute inset-0 rounded-t-full border-2 border-b-0 border-white/30"></div>

  <!-- Notches on the arc -->
  {#each tickAngles as tick (tick.value)}
    {@const isCenter = tick.value === 0}
    {@const rad = (tick.angle * Math.PI) / 180}
    {@const outerX = 50 + Math.cos(rad) * 50}
    {@const outerY = 100 - Math.sin(rad) * 100}
    {@const innerX = 50 + Math.cos(rad) * 42}
    {@const innerY = 100 - Math.sin(rad) * 84}
    <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <line
        x1="{outerX}%"
        y1="{outerY}%"
        x2="{innerX}%"
        y2="{innerY}%"
        stroke={isCenter ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}
        stroke-width={isCenter ? 2 : 1.5}
        stroke-linecap="round"
      />
    </svg>
  {/each}

  <!-- Difference wedge between arrows (if enabled) -->
  {#if showDifferenceWedge && diffAngle > 0 && arrows.length >= 2}
    {@const radius = 50}
    {@const angle1 = sliderToAngle(arrows[0].value)}
    {@const angle2 = sliderToAngle(arrows[1].value)}
    {@const rad1 = (angle1 * Math.PI) / 180}
    {@const rad2 = (angle2 * Math.PI) / 180}
    {@const x1 = 50 + Math.cos(rad1) * radius}
    {@const y1 = 50 - Math.sin(rad1) * radius}
    {@const x2 = 50 + Math.cos(rad2) * radius}
    {@const y2 = 50 - Math.sin(rad2) * radius}
    {@const largeArc = diffAngle > 90 ? 1 : 0}
    {@const sweepFlag = angle1 > angle2 ? 1 : 0}
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      viewBox="0 0 100 50"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <clipPath id="semicircle-clip">
          <path d="M 0 50 A 50 50 0 0 1 100 50 L 100 50 L 0 50 Z" />
        </clipPath>
      </defs>
      <path
        clip-path="url(#semicircle-clip)"
        d="M 50 50
           L {x1} {y1}
           A {radius} {radius} 0 {largeArc} {sweepFlag} {x2} {y2}
           Z"
        fill="rgba(255, 100, 100, 0.35)"
      />
    </svg>
  {/if}

  <!-- Arrows -->
  {#each arrows as arrow, i (i)}
    {@const angle = sliderToAngle(arrow.value)}
    {@const rad = (angle * Math.PI) / 180}
    {@const isDashed = arrow.style === "dashed"}
    {@const armStart = 0}
    {@const armEnd = 30}
    {@const tipEnd = 38}
    {@const headWidth = 4}
    {@const perpAngle1 = rad + Math.PI / 2}
    {@const perpAngle2 = rad - Math.PI / 2}
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full"
      style="overflow: visible"
      viewBox="0 0 100 50"
      preserveAspectRatio="xMidYMax meet"
    >
      <!-- Arrow arm - thicker line like mini dial -->
      <line
        x1={50 + Math.cos(rad) * armStart}
        y1={50 - Math.sin(rad) * armStart}
        x2={50 + Math.cos(rad) * armEnd}
        y2={50 - Math.sin(rad) * armEnd}
        stroke="black"
        stroke-width="4"
        stroke-linecap={isDashed ? "butt" : "round"}
        stroke-dasharray={isDashed ? "4 3" : undefined}
      />
      <!-- Arrow head - triangle like mini dial -->
      <polygon
        points="{50 + Math.cos(rad) * tipEnd},{50 - Math.sin(rad) * tipEnd} {50 +
          Math.cos(rad) * armEnd +
          Math.cos(perpAngle1) * headWidth},{50 -
          Math.sin(rad) * armEnd -
          Math.sin(perpAngle1) * headWidth} {50 +
          Math.cos(rad) * armEnd +
          Math.cos(perpAngle2) * headWidth},{50 -
          Math.sin(rad) * armEnd -
          Math.sin(perpAngle2) * headWidth}"
        fill="black"
      />
    </svg>
  {/each}

  <!-- Center pivot - black like mini dial -->
  <div class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
    <div class="relative h-10 w-10 rounded-full bg-black">
      <div class="absolute inset-2.5 rounded-full bg-gray-600"></div>
    </div>
  </div>
  <!-- Percentage display below pivot -->
  {#if arrows.length === 1 && arrows[0].displayValue !== undefined}
    <div
      class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+1.5rem)]"
    >
      <div class="text-2xl font-bold" style="color: {arrows[0].color}">
        {arrows[0].displayValue}%
      </div>
    </div>
  {/if}

  <!-- Prompt labels integrated at dial ends -->
  <div class="absolute bottom-0 -left-4 max-w-24 translate-y-full pt-2 text-center">
    <span class="text-base font-bold" style="color: {leftColor}">{prompt[0]}</span>
  </div>
  <div class="absolute -right-4 bottom-0 max-w-24 translate-y-full pt-2 text-center">
    <span class="text-base font-bold" style="color: {rightColor}">{prompt[1]}</span>
  </div>

  <!-- Legend for multiple arrows -->
  {#if arrows.length > 1 && arrows.some((a) => a.label)}
    <div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full gap-8 pt-12">
      {#each arrows as arrow, i (i)}
        {#if arrow.label}
          <div class="flex flex-col items-center gap-1">
            <span class="text-xs tracking-wide text-gray-400 uppercase">{arrow.label}</span>
            <span class="text-2xl font-bold" style="color: {arrow.color}"
              >{#if arrow.displayValue !== undefined}{arrow.displayValue}%{/if}</span
            >
          </div>
        {/if}
      {/each}
    </div>
  {/if}
{/snippet}
