<template>
  <RouterView />
</template>

<script setup lang="ts"></script>

<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-muted);
  user-select: none;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  display: none;
}

::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--muted-foreground), transparent 70%);
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--primary), transparent 40%);
}
</style>
