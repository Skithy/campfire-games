<script lang="ts">
    import { type Prompt, wavelengthPrompts } from '$lib/data/wavelengthPrompts';
    import { getPromptColors, getSliderColor } from '$lib/utils/colors';

    let { 
        prompt, 
        onLockIn 
    }: { 
        prompt: Prompt, 
        onLockIn: (guess: number) => void 
    } = $props();

    let guess = $state(50);

    function handleLockIn() {
        onLockIn(guess);
    }

    let index = $derived(wavelengthPrompts.findIndex(p => p[0] === prompt[0] && p[1] === prompt[1]));
    let [leftColor, rightColor] = $derived(index !== -1 ? getPromptColors(index, wavelengthPrompts.length) : ['#fff', '#fff']);
</script>

<div class="flex flex-col items-center gap-4 w-full h-full p-4">
    <h2 class="text-2xl font-bold">Make Your Guess</h2>

    <div class="flex flex-col items-center gap-4 w-full max-w-[400px] flex-1 justify-center">
        <!-- We need the index to get the same colors. Since we only have the single prompt here, 
             we might need to pass the index or just use a hash/lookup if we can't change the props easily. 
             However, for now, let's assume we can get the index or just pick a color based on the prompt strings if needed.
             Wait, the user requirement is "distinct complementary colours for each prompt". 
             The previous view uses the index. Here we only have `prompt: Prompt`.
             To avoid changing the prop interface too much (though I can), I'll search for the prompt index in the list.
             This requires importing the prompts list.
        -->
        
        <div 
            class="text-2xl font-bold text-center p-2 rounded-lg w-full text-black"
            style="background-color: {rightColor}"
        >
            {prompt[1]}
        </div>
        
        <div class="relative h-[40vh] w-[120px] bg-[#333] rounded-[60px] border-2 border-[#555] p-2.5">
            <input 
                type="range" 
                min="0" 
                max="100" 
                bind:value={guess} 
                class="absolute top-0 left-0 w-full h-full opacity-0 z-10 m-0 cursor-pointer"
                style="-webkit-appearance: slider-vertical; appearance: slider-vertical;"
                orient="vertical"
            />
            <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-white/20 pointer-events-none"></div>
            
            <!-- Custom Thumb with Number -->
            <div 
                class="absolute left-2.5 right-2.5 h-20 border-4 border-white rounded-[40px] flex items-center justify-center text-3xl font-bold text-black pointer-events-none shadow-lg transition-transform z-5"
                style="
                    bottom: {guess}%; 
                    transform: translateY(50%);
                    background-color: {index !== -1 ? getSliderColor(guess, index, wavelengthPrompts.length) : '#646cff'};
                "
            >
                {guess}
            </div>
        </div>

        <div 
            class="text-2xl font-bold text-center p-2 rounded-lg w-full text-black"
            style="background-color: {leftColor}"
        >
            {prompt[0]}
        </div>
    </div>

    <button 
        class="px-12 py-4 text-2xl font-bold bg-[#4caf50] text-white border-none rounded-[50px] cursor-pointer shadow-lg hover:bg-[#45a049]"
        onclick={handleLockIn}
    >
        Lock In Guess
    </button>
</div>
