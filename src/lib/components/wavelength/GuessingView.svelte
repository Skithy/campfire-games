<script lang="ts">
  import { type Prompt, wavelengthPrompts } from "$lib/data/wavelengthPrompts"
  import { getPromptColors, getSliderColor } from "$lib/utils/colors"

  let {
    prompt,
    onLockIn,
  }: {
    prompt: Prompt
    onLockIn: (guess: number) => void
  } = $props()

  let guess = $state(50)

  function handleLockIn() {
    onLockIn(guess)
  }

  let index = $derived(wavelengthPrompts.findIndex((p) => p[0] === prompt[0] && p[1] === prompt[1]))
  let [leftColor, rightColor] = $derived(
    index !== -1 ? getPromptColors(index, wavelengthPrompts.length) : ["#fff", "#fff"],
  )
</script>

<div class="flex h-full w-full flex-col items-center gap-4 p-4">
  <h2 class="text-2xl font-bold">Make Your Guess</h2>

  <div class="flex w-full max-w-[400px] flex-1 flex-col items-center justify-center gap-4">
    <!-- We need the index to get the same colors. Since we only have the single prompt here, 
             we might need to pass the index or just use a hash/lookup if we can't change the props easily. 
             However, for now, let's assume we can get the index or just pick a color based on the prompt strings if needed.
             Wait, the user requirement is "distinct complementary colours for each prompt". 
             The previous view uses the index. Here we only have `prompt: Prompt`.
             To avoid changing the prop interface too much (though I can), I'll search for the prompt index in the list.
             This requires importing the prompts list.
        -->

    <div
      class="w-full rounded-lg p-2 text-center text-2xl font-bold text-black"
      style="background-color: {rightColor}"
    >
      {prompt[1]}
    </div>

    <div class="relative h-[40vh] w-[120px] rounded-[60px] border-2 border-[#555] bg-[#333] p-2.5">
      <input
        type="range"
        min="0"
        max="100"
        bind:value={guess}
        class="absolute top-0 left-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
        style="-webkit-appearance: slider-vertical; appearance: slider-vertical; writing-mode: vertical-lr; direction: rtl;"
      />
      <div class="pointer-events-none absolute top-1/2 right-0 left-0 h-0.5 bg-white/20"></div>

      <!-- Custom Thumb with Number -->
      <div
        class="pointer-events-none absolute right-2.5 left-2.5 z-5 flex h-20 items-center justify-center rounded-[40px] border-4 border-white text-3xl font-bold text-black shadow-lg transition-transform"
        style="
                    bottom: {guess}%; 
                    transform: translateY(50%);
                    background-color: {index !== -1
          ? getSliderColor(guess, index, wavelengthPrompts.length)
          : '#646cff'};
                "
      >
        {guess}
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
    class="cursor-pointer rounded-[50px] border-none bg-[#4caf50] px-12 py-4 text-2xl font-bold text-white shadow-lg hover:bg-[#45a049]"
    onclick={handleLockIn}
  >
    Lock In Guess
  </button>
</div>
