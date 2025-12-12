<script lang="ts">
    import { wavelengthPrompts, type Prompt } from '$lib/data/wavelengthPrompts';
    import PsychicView from '$lib/components/wavelength/PsychicView.svelte';
    import GuessingView from '$lib/components/wavelength/GuessingView.svelte';
    import RevealView from '$lib/components/wavelength/RevealView.svelte';

    type GamePhase = 'psychic' | 'guessing' | 'reveal';

    let phase = $state<GamePhase>('psychic');
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

    // Initialize first round
    startNewRound();

    function handleSelectPrompt(prompt: Prompt) {
        selectedPrompt = prompt;
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
</script>

<div class="game-container">
    <header>
        <h1>Wavelength</h1>
    </header>

    <main>
        {#if phase === 'psychic'}
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

<style>
    :global(body) {
        margin: 0;
        background: #111;
        color: white;
        font-family: 'Inter', system-ui, sans-serif;
    }

    .game-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #333;
    }

    h1 {
        margin: 0;
        font-size: 2rem;
        background: linear-gradient(90deg, #ff4444, #ffff44, #4444ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    main {
        flex: 1;
        display: flex;
        justify-content: center;
    }
</style>
