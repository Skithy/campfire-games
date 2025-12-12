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

<div class="guessing-view">
    <h2>Make Your Guess</h2>

    <div class="game-board">
        <div class="prompt-top">{prompt[1]}</div>
        
        <div class="spectrum-container">
            <input 
                type="range" 
                min="0" 
                max="100" 
                bind:value={guess} 
                class="guess-slider"
                orient="vertical"
            />
            <div class="center-line"></div>
            
            <!-- Custom Thumb with Number -->
            <div class="custom-thumb" style="bottom: {guess}%; transform: translateY(50%)">
                {guess}
            </div>
        </div>

        <div class="prompt-bottom">{prompt[0]}</div>
    </div>

    <button class="lock-in-btn" onclick={handleLockIn}>
        Lock In Guess
    </button>
</div>

<style>
    .guessing-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    .game-board {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 400px;
        gap: 1rem;
    }

    .prompt-top, .prompt-bottom {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        padding: 0.5rem;
        background: #2a2a2a;
        border-radius: 8px;
        width: 100%;
    }

    .spectrum-container {
        position: relative;
        height: 40vh; /* Reduced height */
        width: 120px; /* Wider container */
        background: #333;
        border-radius: 60px;
        border: 2px solid #555;
        padding: 10px;
    }

    .guess-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0; /* Hide native slider */
        z-index: 10; /* Ensure it captures clicks */
        margin: 0;
        cursor: pointer;
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
        appearance: slider-vertical;
    }

    /* Vertical slider support for Firefox/Standard */
    input[type=range][orient=vertical] {
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
        appearance: slider-vertical;
        width: 100%;
        height: 100%;
    }

    .center-line {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        background: rgba(255,255,255,0.2);
        pointer-events: none;
    }

    .custom-thumb {
        position: absolute;
        left: 10px;
        right: 10px;
        height: 80px;
        background: #646cff;
        border: 4px solid white;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        pointer-events: none; /* Let clicks pass through to input */
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        transition: transform 0.1s;
        z-index: 5;
    }

    .lock-in-btn {
        padding: 1rem 3rem;
        font-size: 1.5rem;
        font-weight: bold;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    }
</style>
