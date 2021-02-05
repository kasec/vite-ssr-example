<template>
    <p>
        Welcome to First Page
        <button @click="count ++">{{ count }}</button>
    </p>
    <a href="/about.html">go to about page</a>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>