<script lang="ts">
    import type { Prompt } from '$lib/data/wavelengthPrompts';

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
</script>

<div class="flex flex-col items-center gap-4 w-full h-full p-4">
    <h2 class="text-2xl font-bold">Make Your Guess</h2>

    <div class="flex flex-col items-center gap-4 w-full max-w-[400px] flex-1 justify-center">
        <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">{prompt[1]}</div>
        
        <div class="relative h-[40vh] w-[120px] bg-[#333] rounded-[60px] border-2 border-[#555] p-2.5">
            <input 
                type="range" 
                min="0" 
                max="100" 
                bind:value={guess} 
                class="absolute top-0 left-0 w-full h-full opacity-0 z-10 m-0 cursor-pointer appearance-none"
                orient="vertical"
            />
            <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-white/20 pointer-events-none"></div>
            
            <!-- Custom Thumb with Number -->
            <div 
                class="absolute left-2.5 right-2.5 h-20 bg-[#646cff] border-4 border-white rounded-[40px] flex items-center justify-center text-3xl font-bold text-white pointer-events-none shadow-lg transition-transform z-5"
                style="bottom: {guess}%; transform: translateY(50%)"
            >
                {guess}
            </div>
        </div>

        <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">{prompt[0]}</div>
    </div>

    <button 
        class="px-12 py-4 text-2xl font-bold bg-[#4caf50] text-white border-none rounded-[50px] cursor-pointer shadow-lg hover:bg-[#45a049]"
        onclick={handleLockIn}
    >
        Lock In Guess
    </button>
</div>
