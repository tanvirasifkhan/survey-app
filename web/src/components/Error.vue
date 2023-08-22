<template>
    <div class="m-auto p-12 flex justify-center">
        <h1 class="text-xl text-red-500 font-medium">{{ message }}</h1>
    </div>
</template>

<script>
    export default {
        props: ['message']
    }
</script>