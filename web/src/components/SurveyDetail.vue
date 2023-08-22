<template>
    <div class="flex items-start bg-white p-7 space-x-5 mt-3">
        <div class="rounded-full bg-gray-100 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
        </div>
        <div class="rounded-md space-y-2">
            <h1 class="text-xl font-semibold text-gray-600 hover:underline hover:text-emerald-500">{{ title }}</h1>
            <h3 class="text-base text-gray-500">{{ description }}</h3>
            <div class="mt-5">
                <h2 class="py-3 font-semibold">Questions</h2>
                <div v-for="(question, index) in questions" :key="index" class="flex items-center space-x-3">
                    <p class="text-gray-700">{{ index+1 }}</p>
                    <span class="text-lg">{{ question.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            questions: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style>

</style>