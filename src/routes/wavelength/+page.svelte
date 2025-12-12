<script lang="ts">
    import GuessingView from '$lib/components/wavelength/GuessingView.svelte';
    import PsychicView from '$lib/components/wavelength/PsychicView.svelte';
    import RevealView from '$lib/components/wavelength/RevealView.svelte';
    import SplashScreen from '$lib/components/wavelength/SplashScreen.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { type Prompt,wavelengthPrompts } from '$lib/data/wavelengthPrompts';

    type GamePhase = 'splash' | 'psychic' | 'guessing' | 'reveal';

    let phase = $state<GamePhase>('splash');
    let currentPrompts = $state<Prompt[]>([]);
    let selectedPrompt = $state<Prompt | null>(null);
    let target = $state<number>(50);
    let guess = $state<number>(50);

    function getRandomPrompts(count: number): Prompt[] {
        const shuffled = [...wavelengthPrompts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function startNewRound() {
        currentPrompts = getRandomPrompts(3);
        selectedPrompt = null;
        target = Math.floor(Math.random() * 101); // 0 to 100
        guess = 50;
        phase = 'psychic';
    }

    function handleStartGame() {
        startNewRound();
    }

    function handleSelectPrompt(prompt: Prompt) {
        selectedPrompt = prompt;
        // Regenerate target when a prompt is selected so players get a fresh value if they switch
        target = Math.floor(Math.random() * 101);
    }

    function handleReroll() {
        currentPrompts = getRandomPrompts(3);
    }

    function handleReadyToGuess() {
        phase = 'guessing';
    }

    function handleLockIn(playerGuess: number) {
        guess = playerGuess;
        phase = 'reveal';
    }

    function handleNextRound() {
        startNewRound();
    }

    $effect(() => {
        if ($page.url.searchParams.has('reset')) {
            phase = 'splash';
            goto('/wavelength', { replaceState: true });
        }
    });
</script>

<div class="min-h-screen flex flex-col p-4 bg-[#111] text-white font-sans">

    <main class="flex-1 flex justify-center">
        {#if phase === 'splash'}
            <SplashScreen onStart={handleStartGame} />
        {:else if phase === 'psychic'}
            <PsychicView 
                prompts={currentPrompts} 
                {target}
                onSelectPrompt={handleSelectPrompt}
                onReroll={handleReroll}
                onReadyToGuess={handleReadyToGuess}
            />
        {:else if phase === 'guessing'}
            {#if selectedPrompt}
                <GuessingView 
                    prompt={selectedPrompt} 
                    onLockIn={handleLockIn} 
                />
            {/if}
        {:else if phase === 'reveal'}
            {#if selectedPrompt}
                <RevealView 
                    prompt={selectedPrompt} 
                    {target} 
                    {guess} 
                    onNextRound={handleNextRound} 
                />
            {/if}
        {/if}
    </main>
</div>
