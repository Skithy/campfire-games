<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    
    let { onStart } = $props<{ onStart: () => void }>();

    let showInstructions = $state(false);

    function toggleInstructions() {
        showInstructions = !showInstructions;
    }
</script>

<div class="flex flex-col items-center justify-center h-full space-y-12" in:fade>
    <div class="text-center space-y-4">
        <h2 class="text-6xl font-bold bg-gradient-to-r from-[#ff4444] via-[#ffff44] to-[#4444ff] bg-clip-text text-transparent filter drop-shadow-lg">
            Wavelength
        </h2>
        <p class="text-gray-400 text-xl">A game of telepathy and empathy</p>
    </div>

    <div class="flex flex-col space-y-4 w-64">
        <button 
            class="px-8 py-4 bg-white text-black text-xl font-bold rounded-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl active:scale-95"
            onclick={onStart}
        >
            Start Game
        </button>
        <button 
            class="px-8 py-3 bg-[#333] text-white text-lg font-semibold rounded-lg hover:bg-[#444] transition-colors"
            onclick={toggleInstructions}
        >
            How to Play
        </button>
    </div>

    {#if showInstructions}
        <div 
            class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
            transition:fade
            onclick={toggleInstructions}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === 'Escape' && toggleInstructions()}
        >
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <div 
                class="bg-[#222] p-8 rounded-xl max-w-lg w-full text-left border border-[#333] shadow-2xl space-y-6" 
                in:scale
                onclick={(e) => e.stopPropagation()}
                role="document"
            >
                <h3 class="text-2xl font-bold text-white mb-4">How to Play</h3>
                
                <div class="space-y-4 text-gray-300">
                    <p>
                        <strong class="text-[#ffff44]">1. The Psychic:</strong> One player (the Psychic) sees where the target is located on the spectrum.
                    </p>
                    <p>
                        <strong class="text-[#ff4444]">2. The Clue:</strong> The Psychic gives a clue that conceptually fits where the target is between the two binary opposites.
                    </p>
                    <p>
                        <strong class="text-[#4444ff]">3. The Guess:</strong> Everyone else discusses and turns the dial to where they think the target is based on the clue.
                    </p>
                    <p>
                        <strong class="text-white">4. The Reveal:</strong> See how close you got! The closer to the center, the more points you score.
                    </p>
                </div>

                <div class="pt-4 flex justify-end">
                    <button 
                        class="px-6 py-2 bg-[#444] hover:bg-[#555] text-white rounded-lg transition-colors"
                        onclick={toggleInstructions}
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
