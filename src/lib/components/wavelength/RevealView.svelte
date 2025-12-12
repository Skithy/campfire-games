<script lang="ts">
    import type { Prompt } from '$lib/data/wavelengthPrompts';

    let { 
        prompt, 
        target, 
        guess, 
        onNextRound 
    }: { 
        prompt: Prompt, 
        target: number, 
        guess: number, 
        onNextRound: () => void 
    } = $props();

    let difference = Math.abs(target - guess);
    let scoreMessage = $derived.by(() => {
        if (difference <= 2) return "PERFECT!";
        if (difference <= 5) return "So Close!";
        if (difference <= 10) return "Great Job!";
        if (difference <= 20) return "Not Bad";
        return "Way Off...";
    });
</script>

<div class="flex flex-col items-center gap-4 w-full h-full p-4">
    <div class="text-center">
        <h2 class="text-5xl m-0 bg-gradient-to-r from-[#ff4444] to-[#ffff44] bg-clip-text text-transparent font-bold">
            {scoreMessage}
        </h2>
        <p>Target: {target}% | Guess: {guess}%</p>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center w-full max-w-[400px] gap-4">
        <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">{prompt[1]}</div>
        
        <div class="relative h-[40vh] w-[80px] bg-[#333] rounded-[40px] border-2 border-[#555]">
            <!-- Bullseye Zone -->
            <div 
                class="absolute left-0 right-0 h-[10%] bg-white/10 border-t-2 border-b-2 border-white/20 pointer-events-none"
                style="bottom: {target}%; transform: translateY(50%)"
            ></div>

            <!-- Target Marker -->
            <div 
                class="absolute -left-20 right-0 h-0.5 flex items-center translate-y-1/2 pointer-events-none z-20"
                style="bottom: {target}%"
            >
                <div class="bg-[#4caf50] text-white px-2 py-1 rounded text-xs whitespace-nowrap mr-2 w-[60px] text-center">Target</div>
                <div class="flex-1 h-1 rounded-sm bg-[#4caf50]"></div>
            </div>

            <!-- Guess Marker -->
            <div 
                class="absolute -left-20 right-0 h-0.5 flex items-center translate-y-1/2 pointer-events-none z-10"
                style="bottom: {guess}%"
            >
                <div class="bg-[#646cff] text-white px-2 py-1 rounded text-xs whitespace-nowrap mr-2 w-[60px] text-center">Guess</div>
                <div class="flex-1 h-1 rounded-sm bg-[#646cff]"></div>
            </div>
        </div>

        <div class="text-2xl font-bold text-center p-2 bg-[#2a2a2a] rounded-lg w-full">{prompt[0]}</div>
    </div>

    <button 
        class="px-12 py-4 text-2xl font-bold bg-white text-black border-none rounded-[50px] cursor-pointer transition-transform active:scale-95 shadow-lg hover:bg-gray-100"
        onclick={onNextRound}
    >
        Start Next Round
    </button>
</div>
