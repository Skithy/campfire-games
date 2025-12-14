<script lang="ts">
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import { getPromptColors, getSliderColor } from "$lib/utils/colors"

  let {
    prompt,
    target,
    guess,
    onNextRound,
  }: {
    prompt: Prompt
    target: number
    guess: number
    onNextRound: () => void
  } = $props()

  let scoreMessage = $derived.by(() => {
    const difference = Math.abs(target - guess)
    if (difference <= 2) return "PERFECT!"
    if (difference <= 5) return "So Close!"
    if (difference <= 20) return "Not Bad"
    return "Way Off..."
  })

  let index = $derived(wavelengthPrompts.findIndex((p) => p[0] === prompt[0] && p[1] === prompt[1]))
  let [leftColor, rightColor] = $derived(
    index !== -1 ? getPromptColors(index, wavelengthPrompts.length) : ["#fff", "#fff"],
  )
</script>

<div class="flex h-full w-full flex-col items-center gap-4 p-4">
  <div class="text-center">
    <h2
      class="m-0 bg-gradient-to-r from-[#ff4444] to-[#ffff44] bg-clip-text text-5xl font-bold text-transparent"
    >
      {scoreMessage}
    </h2>
    <p>Target: {target}% | Guess: {guess}%</p>
  </div>

  <div class="flex w-full max-w-[400px] flex-1 flex-col items-center justify-center gap-4">
    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {rightColor}"
    >
      {prompt[1]}
    </div>

    <div class="relative h-[40vh] w-[80px] rounded-[40px] border-2 border-[#555] bg-[#333]">
      <!-- Bullseye Zone -->
      <div
        class="pointer-events-none absolute right-0 left-0 h-[10%] border-t-2 border-b-2 border-white/20 bg-white/10"
        style="bottom: {target}%; transform: translateY(50%)"
      ></div>

      <!-- Target Marker -->
      <div
        class="pointer-events-none absolute right-0 -left-20 z-20 flex h-0.5 translate-y-1/2 items-center"
        style="bottom: {target}%"
      >
        <div
          class="mr-2 w-[60px] rounded px-2 py-1 text-center text-xs whitespace-nowrap text-black"
          style="background-color: {index !== -1
            ? getSliderColor(target, index, wavelengthPrompts.length)
            : '#4caf50'}"
        >
          Target
        </div>
        <div
          class="h-1 flex-1 rounded-sm"
          style="background-color: {index !== -1
            ? getSliderColor(target, index, wavelengthPrompts.length)
            : '#4caf50'}"
        ></div>
      </div>

      <!-- Guess Marker -->
      <div
        class="pointer-events-none absolute right-0 -left-20 z-10 flex h-0.5 translate-y-1/2 items-center"
        style="bottom: {guess}%"
      >
        <div
          class="mr-2 w-[60px] rounded px-2 py-1 text-center text-xs whitespace-nowrap text-black"
          style="background-color: {index !== -1
            ? getSliderColor(guess, index, wavelengthPrompts.length)
            : '#646cff'}"
        >
          Guess
        </div>
        <div
          class="h-1 flex-1 rounded-sm"
          style="background-color: {index !== -1
            ? getSliderColor(guess, index, wavelengthPrompts.length)
            : '#646cff'}"
        ></div>
      </div>
    </div>

    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {leftColor}"
    >
      {prompt[0]}
    </div>
  </div>

  <button
    class="cursor-pointer rounded-[50px] border-none bg-white px-12 py-4 text-2xl font-bold text-black shadow-lg transition-transform hover:bg-gray-100 active:scale-95"
    onclick={onNextRound}
  >
    Start Next Round
  </button>
</div>
