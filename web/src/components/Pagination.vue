<template>
    <nav class="p-2">
        <ul class="flex">
            <li><a @click.prevent="changePage(pagination.current_page - 1)" 
                :disabled="[pagination.current_page <= 1]"
                :class="[pagination.current_page <= 1 ? 'bg-gray-50 text-gray-300 cursor-not-allowed':'bg-gray-100 text-gray-700']" 
                class="hover:bg-gray-100 border border-gray-100 px-3 py-1.5 text-gray-700 bg-gray-50" href="">Prev</a>
            </li>
            <li v-for="page in pages" :key="page">
                <a href="" @click.prevent="changePage(page)"
                class="px-3 py-1.5 text-gray-500 border border-gray-100"
                :class="[isCurrentPage(page) ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 bg-gray-50 text-gray-700']">{{ page }}</a>
            </li>
            <li>
                <a @click.prevent="changePage(pagination.current_page + 1)" 
                    :disabled="[pagination.current_page >= pagination.last_page]" 
                    :class="[pagination.current_page >= pagination.last_page ? 'bg-gray-50 text-gray-300 cursor-not-allowed':'bg-gray-100 text-gray-700']" 
                    class="hover:bg-gray-100 border border-gray-100 px-3 py-1.5 text-gray-700 bg-gray-50" href="">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props:['pagination','offset'],
        methods:{
            isCurrentPage(page){
                return this.pagination.current_page === page
            },
            changePage(page){
                if(page > this.pagination.last_page){
                    page = this.pagination.last_page
                }
                this.pagination.current_page = page
                this.$emit('paginate')
            }
        },
        computed:{
            pages(){
                let pages = []

                let from = this.pagination.current_page - Math.floor(this.offset/2)
                if(from < 1){
                    from = 1
                }

                let to = from + this.offset - 1

                if(to > this.pagination.last_page){
                    to = this.pagination.last_page
                }

                while(from <= to){
                    pages.push(from)
                    from++
                }

                return pages
            }
        }
    }
</script>