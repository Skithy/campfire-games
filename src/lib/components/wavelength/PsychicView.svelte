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

<div class="psychic-view">
    <h2>You are the Psychic!</h2>
    
    {#if selectedPromptIndex === null}
        <div class="prompts-selection">
            <h3>Pick a Prompt</h3>
            <div class="prompts-list">
                {#each prompts as prompt, i}
                    <button class="prompt-btn" onclick={() => handleSelect(i)}>
                        <span class="left">{prompt[0]}</span>
                        <span class="divider">vs</span>
                        <span class="right">{prompt[1]}</span>
                    </button>
                {/each}
            </div>
            <button class="reroll-btn" onclick={onReroll}>Reroll Prompts</button>
        </div>
    {:else}
        <div class="active-prompt">
            <div class="target-info">
                <p class="instruction">
                    Give a verbal clue that belongs at this position.
                </p>
            </div>

            <div class="game-board">
                <div class="prompt-top">{prompts[selectedPromptIndex][1]}</div>
                
                <div class="spectrum-container">
                    <div class="center-line"></div>
                    
                    <!-- Custom Thumb with Target Number -->
                    <div class="custom-thumb" style="bottom: {target}%; transform: translateY(50%)">
                        {target}
                    </div>
                </div>

                <div class="prompt-bottom">{prompts[selectedPromptIndex][0]}</div>
            </div>

            <div class="action-section">
                <button 
                    class="submit-btn" 
                    onclick={onReadyToGuess}
                >
                    Ready to Guess
                </button>
                <button class="back-btn" onclick={() => selectedPromptIndex = null}>
                    Back to Prompts
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    .psychic-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        height: 100%;
        padding: 1rem;
    }

    .prompts-selection {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .prompts-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .prompt-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: #2a2a2a;
        border: 2px solid #3a3a3a;
        border-radius: 12px;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .prompt-btn:hover {
        border-color: #646cff;
        transform: translateY(-2px);
    }

    .divider {
        color: #888;
        font-size: 0.9rem;
        text-transform: uppercase;
        margin: 0 1rem;
    }

    .reroll-btn {
        margin-top: 1.5rem;
        padding: 0.8rem 1.5rem;
        background: transparent;
        border: 1px solid #666;
        color: #ccc;
        border-radius: 8px;
        cursor: pointer;
    }

    .active-prompt {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        flex: 1;
        justify-content: space-between;
    }

    .game-board {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
        flex: 1;
        justify-content: center;
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
        background: #4caf50; /* Green for target */
        border: 4px solid white;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        z-index: 5;
    }

    .target-info {
        text-align: center;
    }

    .action-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 300px;
    }

    .submit-btn {
        width: 100%;
        padding: 1rem;
        background: #646cff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
    }

    .back-btn {
        background: transparent;
        border: none;
        color: #888;
        cursor: pointer;
        text-decoration: underline;
    }
</style>
