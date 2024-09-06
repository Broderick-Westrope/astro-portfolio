<template>
    <div id="bg-dot-container" class="relative w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const dotColors = [
    'oklch(var(--p))',
    'oklch(var(--s))',
    'oklch(var(--a))',
    'oklch(var(--n))',
    'oklch(var(--in))',
    'oklch(var(--su))',
    'oklch(var(--wa))',
    'oklch(var(--er))',
]

function randomOnBellCurve(min: number, max: number, mean: number, stdDev: number): number {
    function randomNormalDistribution() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); // Avoid zero
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    let randomValue = randomNormalDistribution() * stdDev + mean;

    // Clamp the value between min and max
    return Math.max(min, Math.min(max, randomValue));
}

function getRandomColor(): string {
    return dotColors[Math.floor(Math.random() * dotColors.length)];
}

function getRandomOpacity(row: number, numRows: number): number {
    const max = 1;
    const min = 0.8;
    let value = randomOnBellCurve(min, max, (max + min) / 2, (max - min) / 4);

    // Fade out towards the bottom
    if (row !== undefined && numRows !== undefined) {
        value *= 1 - (row / numRows);
    }
    return value;
}

function getRandomSize(): number {
    const max = 10;
    const min = 2;

    return randomOnBellCurve(min, max, (max + min) / 3, (max - min) / 4);
}

function getRandomPos(pos: number, gridSize: number): number {
    let diversion = gridSize / 3;
    let offset = randomOnBellCurve(-diversion, diversion, 0, gridSize / 5);
    return (pos * gridSize) + (offset * 10)
}

onMounted(() => {
    const dotsContainer = document.getElementById('bg-dot-container');
    if (dotsContainer === null) return;

    const dots = [];
    const gridSize = 50;
    const numDotsX = Math.ceil(window.innerWidth / gridSize);
    const numDotsY = Math.ceil(window.innerHeight / gridSize);

    for (let y = 0; y < numDotsY; y++) {
        for (let x = 0; x < numDotsX; x++) {
            let size = getRandomSize() + "px";
            let xPos = getRandomPos(x, gridSize);
            let yPos = getRandomPos(y, gridSize);
            if (xPos > window.innerWidth || yPos > window.innerHeight) continue;

            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.width = size;
            dot.style.height = size;
            dot.style.left = `${xPos}px`;
            dot.style.top = `${yPos}px`;
            dot.style.backgroundColor = getRandomColor();
            dot.style.opacity = getRandomOpacity(y, numDotsY).toString();
            dot.style.clipPath = 'polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)'; // Star shape
            dots.push(dot);
            dotsContainer.appendChild(dot);
        }
    }
});
</script>
