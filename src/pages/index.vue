<template>
    <p>
        Welcome to First Page
        <button @click="count ++">{{ count }}</button>
    </p>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>