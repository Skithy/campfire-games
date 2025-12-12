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

<div class="reveal-view">
    <div class="result-header">
        <h2>{scoreMessage}</h2>
        <p>Target: {target}% | Guess: {guess}%</p>
    </div>

    <div class="game-board">
        <div class="prompt-top">{prompt[1]}</div>
        
        <div class="spectrum-container">
            <!-- Bullseye Zone -->
            <div class="bullseye" style="bottom: {target}%; transform: translateY(50%)"></div>

            <!-- Target Marker -->
            <div class="marker target-marker" style="bottom: {target}%">
                <div class="marker-label">Target</div>
                <div class="marker-line"></div>
            </div>

            <!-- Guess Marker -->
            <div class="marker guess-marker" style="bottom: {guess}%">
                <div class="marker-label">Guess</div>
                <div class="marker-line"></div>
            </div>
        </div>

        <div class="prompt-bottom">{prompt[0]}</div>
    </div>

    <button class="next-btn" onclick={onNextRound}>
        Start Next Round
    </button>
</div>

<style>
    .reveal-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    .result-header {
        text-align: center;
    }

    .result-header h2 {
        font-size: 3rem;
        margin: 0;
        background: linear-gradient(45deg, #ff4444, #ffff44);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
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
        width: 80px;
        background: #333;
        border-radius: 40px;
        border: 2px solid #555;
    }

    .bullseye {
        position: absolute;
        left: 0;
        right: 0;
        height: 10%; /* 10% tolerance zone */
        background: rgba(255, 255, 255, 0.1);
        border-top: 2px solid rgba(255, 255, 255, 0.2);
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        pointer-events: none;
    }

    .marker {
        position: absolute;
        left: -80px;
        right: 0;
        height: 2px;
        display: flex;
        align-items: center;
        transform: translateY(50%);
        pointer-events: none;
    }

    .marker-label {
        background: #000;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        margin-right: 8px;
        width: 60px;
        text-align: center;
    }

    .marker-line {
        flex: 1;
        height: 4px;
        border-radius: 2px;
    }

    .target-marker .marker-label { background: #4caf50; }
    .target-marker .marker-line { background: #4caf50; }

    .guess-marker .marker-label { background: #646cff; }
    .guess-marker .marker-line { background: #646cff; }

    .next-btn {
        padding: 1rem 3rem;
        font-size: 1.5rem;
        font-weight: bold;
        background: white;
        color: black;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.1s;
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
    }

    .next-btn:active {
        transform: scale(0.98);
    }
</style>
