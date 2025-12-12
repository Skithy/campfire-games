<script lang="ts">
    import type { Prompt } from '$lib/data/wavelengthPrompts';

    let { 
        prompts, 
        target, 
        onSelectPrompt, 
        onReroll, 
        onReadyToGuess 
    }: { 
        prompts: Prompt[], 
        target: number, 
        onSelectPrompt: (prompt: Prompt) => void, 
        onReroll: () => void, 
        onReadyToGuess: () => void 
    } = $props();

    let selectedPromptIndex = $state<number | null>(null);

    function handleSelect(index: number) {
        selectedPromptIndex = index;
        onSelectPrompt(prompts[index]);
    }
</script>

<div class="flex flex-col items-center gap-4 w-full max-w-[600px] mx-auto h-full p-4">
    <h2 class="text-2xl font-bold">You are the Psychic!</h2>
    
    {#if selectedPromptIndex === null}
        <div class="w-full flex flex-col items-center gap-4">
            <h3 class="text-xl font-semibold">Pick a Prompt</h3>
            <div class="flex flex-col gap-4 w-full">
                {#each prompts as prompt, i}
                    <button 
                        class="flex justify-between items-center p-6 bg-[#2a2a2a] border-2 border-[#3a3a3a] rounded-xl text-white text-lg cursor-pointer transition-all hover:border-[#646cff] hover:-translate-y-0.5"
                        onclick={() => handleSelect(i)}
                    >
                        <span class="font-bold">{prompt[0]}</span>
                        <span class="text-[#888] text-sm uppercase mx-4">vs</span>
                        <span class="font-bold">{prompt[1]}</span>
                    </button>
                {/each}
            </div>
            <button 
                class="mt-6 px-6 py-3 bg-transparent border border-[#666] text-[#ccc] rounded-lg cursor-pointer hover:bg-white/5"
                onclick={onReroll}
            >
                Reroll Prompts
            </button>
        </div>
    {:else}
        <div class="w-full flex flex-col items-center gap-4 flex-1 justify-between">
            <div class="text-center">
                <p class="text-lg">
                    Give a verbal clue that belongs at this position.
                </p>
            </div>

            <div class="flex flex-col items-center gap-4 w-full max-w-[400px] flex-1 justify-center">
                <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">
                    {prompts[selectedPromptIndex][1]}
                </div>
                
                <div class="relative h-[40vh] w-[120px] bg-[#333] rounded-[60px] border-2 border-[#555] p-2.5">
                    <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-white/20 pointer-events-none"></div>
                    
                    <!-- Custom Thumb with Target Number -->
                    <div 
                        class="absolute left-2.5 right-2.5 h-20 bg-[#4caf50] border-4 border-white rounded-[40px] flex items-center justify-center text-3xl font-bold text-white shadow-lg z-10"
                        style="bottom: {target}%; transform: translateY(50%)"
                    >
                        {target}
                    </div>
                </div>

                <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">
                    {prompts[selectedPromptIndex][0]}
                </div>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[300px]">
                <button 
                    class="w-full p-4 bg-[#646cff] text-white border-none rounded-lg text-xl font-bold cursor-pointer hover:bg-[#535bf2]" 
                    onclick={onReadyToGuess}
                >
                    Ready to Guess
                </button>
                <button 
                    class="bg-transparent border-none text-[#888] cursor-pointer underline hover:text-white"
                    onclick={() => selectedPromptIndex = null}
                >
                    Back to Prompts
                </button>
            </div>
        </div>
    {/if}
</div>
