<script lang="ts">
    import { onMount } from "svelte";

    // Reactive state
    let players = 8;
    let cubeSize = 360;
    let desiredPoolSize = 45;
    let maxCardsPerPack = 20;
    let maxPacksPerPlayer = 15;
    let maxCardsSeen = 0;

    // Derived reactive values
    $: config = findOptimalConfiguration(
        players,
        cubeSize,
        desiredPoolSize,
        maxPacksPerPlayer,
        maxCardsPerPack,
        maxCardsSeen,
    );

    // Calculate cards seen per pack based on draft mechanics.
    function calculateSeenPerPack(
        players: number,
        cardsPerPack: number,
    ): number {
        let seen = 0;
        for (let i = 0; i < players; i++) {
            seen += cardsPerPack - i;
        }
        return seen;
    }

    // Find optimal draft configuration for given constraints.
    function findOptimalConfiguration(
        players: number,
        cubeSize: number,
        desiredPoolSize: number,
        maxPacksPerPlayer: number,
        maxCardsPerPack: number,
        maxCardsSeen: number,
    ) {
        if (players <= 0 || cubeSize <= 0 || desiredPoolSize <= 0) {
            return null;
        }

        let bestConfig = null;
        let bestScore = -1;

        // Try different pack counts.
        for (let packs = 1; packs <= maxPacksPerPlayer; packs++) {
            // Try different cards per pack values.
            for (let cards = 1; cards <= maxCardsPerPack; cards++) {
                const seenPerPack = calculateSeenPerPack(players, cards);
                const totalSeen = seenPerPack * packs;

                // Calculate burn as integer and derive actual pool size.
                const idealBurn = cards - desiredPoolSize / packs;
                const burn = Math.round(idealBurn);
                const actualPoolSize = packs * (cards - burn);
                const cardsUsed = packs * cards * players;

                // Skip configurations that exceed cube size, have invalid burn, or exceed a max value.
                if (
                    cardsUsed > cubeSize ||
                    totalSeen <= 0 ||
                    burn < 0 ||
                    (maxCardsSeen > 0 && totalSeen > maxCardsSeen)
                ) {
                    continue;
                }

                // Score based on maximizing cards seen while staying within cube limit.
                const utilization = cardsUsed / cubeSize;
                let seenScore = totalSeen / cubeSize;

                // When maxCardsSeen is specified, prefer configurations closer to that target.
                if (maxCardsSeen > 0) {
                    const seenTargetPenalty =
                        (Math.abs(totalSeen - maxCardsSeen) / maxCardsSeen) *
                        0.5;
                    seenScore -= seenTargetPenalty;
                }

                const burnPenalty = burn * 0.1;
                const poolSizePenalty =
                    Math.abs(actualPoolSize - desiredPoolSize) /
                    desiredPoolSize;

                const score =
                    seenScore + utilization - (burnPenalty + poolSizePenalty);

                if (score > bestScore) {
                    bestScore = score;
                    bestConfig = {
                        packs: packs,
                        cards: cards,
                        seen: totalSeen,
                        burn: burn,
                        used: cardsUsed,
                        utilization: utilization,
                        poolSize: actualPoolSize,
                    };
                }
            }
        }

        return bestConfig;
    }

    // Load preset configuration.
    function loadPreset(
        presetPlayers: number,
        presetCubeSize: number,
        presetPoolSize: number,
    ) {
        players = presetPlayers;
        cubeSize = presetCubeSize;
        desiredPoolSize = presetPoolSize;
    }
</script>

<div
    class="max-w-lg mx-auto bg-base-100 bg-opacity-50 border border-solid border-primary rounded-2xl shadow-2xl overflow-hidden"
>
    <div
        class="bg-gradient-to-r from-primary to-secondary p-5 text-primary-content text-center"
    >
        <h1 class="text-2xl font-bold drop-shadow-md">MTG Draft Calculator</h1>
    </div>

    <div class="p-5 border-b border-primary">
        <h3 class="text-xl font-semibold text-content mb-4">Inputs</h3>
        <div class="space-y-4 text-base-content">
            <div class="flex justify-between items-center space-x-2">
                <label for="players-input" class="font-medium"
                    >Number of players:</label
                >

                <input
                    id="players-input"
                    type="number"
                    bind:value={players}
                    min="1"
                    class="input input-primary w-20"
                />
            </div>
            <div class="flex justify-between items-center space-x-2">
                <label for="cube-size-input" class="font-medium"
                    >Cube size:</label
                >
                <input
                    id="cube-size-input"
                    type="number"
                    bind:value={cubeSize}
                    class="input input-primary w-20"
                />
            </div>
            <div class="flex justify-between items-center space-x-2">
                <label for="pool-input" class="font-medium"
                    >Desired pool size:</label
                >
                <input
                    id="pool-input"
                    type="number"
                    bind:value={desiredPoolSize}
                    min="1"
                    class="input input-primary w-20"
                />
            </div>
            <div class="flex justify-between items-center space-x-2">
                <label for="max-cards-input" class="font-medium"
                    >Max cards per pack:</label
                >
                <input
                    id="max-cards-input"
                    type="number"
                    bind:value={maxCardsPerPack}
                    min="1"
                    class="input input-primary w-20"
                />
            </div>
            <div class="flex justify-between items-center space-x-2">
                <label for="max-packs-input" class="font-medium"
                    >Max packs per player:</label
                >
                <input
                    id="max-packs-input"
                    type="number"
                    bind:value={maxPacksPerPlayer}
                    min="1"
                    class="input input-primary w-20"
                />
            </div>
            <div
                class="tooltip flex justify-between items-center space-x-2"
                data-tip="The maximum number of cards that each players will be able to pick from during the draft. Ignored when the value is zero or less."
            >
                <label for="max-cards-seen-input" class="font-medium"
                    >Max cards seen per player:</label
                >
                <input
                    id="max-cards-seen-input"
                    type="number"
                    bind:value={maxCardsSeen}
                    min="1"
                    max={cubeSize}
                    class="input {maxCardsSeen > 0
                        ? 'input-primary'
                        : 'input-disabled'} w-20"
                />
            </div>
        </div>
    </div>

    <div class="p-5 border-b border-primary">
        <h3 class="text-xl font-semibold text-content mb-4">Outputs</h3>
        {#if config}
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">Number of packs:</div>
                    <div class="text-2xl font-bold">
                        {config.packs}
                    </div>
                </div>
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">Cards per pack:</div>
                    <div class="text-2xl font-bold">
                        {config.cards}
                    </div>
                </div>
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">Burn per pack:</div>
                    <div class="text-2xl font-bold">
                        {config.burn}
                    </div>
                </div>
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">Pool size:</div>
                    <div class="text-2xl font-bold">
                        {config.poolSize}
                    </div>
                </div>
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">
                        Cards seen per player:
                    </div>
                    <div class="text-2xl font-bold">
                        {config.seen} ({Math.round(
                            (config.seen / cubeSize) * 100,
                        )}%)
                    </div>
                </div>
                <div
                    class="bg-blue-100 text-secondary-content p-4 rounded-xl border-l-4 border-secondary"
                >
                    <div class="text-sm font-medium mb-2">Cards used:</div>
                    <div class="text-2xl font-bold">
                        {config.used} ({Math.round(config.utilization * 100)}%)
                    </div>
                </div>
            </div>
        {:else}
            <div>
                Failed to calculate.

                {#if Math.floor(cubeSize / players) < desiredPoolSize}
                    <br />
                    It seems your desired pool size ({desiredPoolSize}) is
                    greater than the cube size ({cubeSize}) divided by the
                    player count ({players}). With these settings you pool size
                    cannot exceeed {Math.floor(cubeSize / players)}.
                {:else}
                    Some reasons may be:
                    <ul class="list-disc list-inside">
                        <li>Max cards per pack is too low.</li>
                        <li>Max packs per player is too low.</li>
                        <li>
                            Desired pool size is too low relative to the max
                            cards seen per player. Try increasing the max cards
                            seen or decreasing the desired pool size.
                        </li>
                    </ul>
                {/if}
            </div>
        {/if}
    </div>

    <div class="p-5">
        <h3 class="text-xl font-semibold text-content mb-4">
            Common Configurations
        </h3>
        <div class="flex flex-col space-y-3">
            <h4 class="text-lg text-content">
                Normal Cube (360 cards, 45 card pool)
            </h4>
            <div class="grid grid-cols-2 gap-2">
                <button
                    on:click={() => loadPreset(8, 360, 45)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    8 players
                </button>
                <button
                    on:click={() => loadPreset(6, 360, 45)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    6 players
                </button>
                <button
                    on:click={() => loadPreset(4, 360, 45)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    4 players
                </button>
                <button
                    on:click={() => loadPreset(2, 360, 45)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    2 players
                </button>
            </div>

            <h4 class="text-lg text-content mb-4">
                Micro Cube (192 cards, 24 card pool)
            </h4>
            <div class="grid grid-cols-2 gap-2">
                <button
                    on:click={() => loadPreset(8, 192, 24)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    8 players
                </button>
                <button
                    on:click={() => loadPreset(6, 192, 24)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    6 players
                </button>
                <button
                    on:click={() => loadPreset(4, 192, 24)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    4 players
                </button>
                <button
                    on:click={() => loadPreset(2, 192, 24)}
                    class="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:translate-y-0"
                >
                    2 players
                </button>
            </div>
        </div>
    </div>
</div>
