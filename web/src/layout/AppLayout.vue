<template>
  <div class="bg-slate-100 h-screen overflow-y-scroll">
    <AppNavBar />
    <slot />
  </div>
</template>

<script>
    import AppNavBar from '../components/AppNavBar.vue'

    export default {
        created(){
            document.title = "Login"
        },
        components: {
            AppNavBar
        }
    }
</script>