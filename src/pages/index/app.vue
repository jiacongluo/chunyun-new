<template>
    <Index  v-if="isloaded"  v-cloak></Index>
</template>
<style lang="scss">

</style>
<script>
import Index from './Index.vue'

export default {
    components: {
        Index
    },
    data() {
        return {
            isloaded: false,
        }
    },
    created () {
        window['onRender'] = () => this.refresh();
    },
    mounted() {

    },

    methods: {
        refresh(){
            this.isloaded=true;
        }
    }

}
</script>
