<template>
    <Index  v-if="isloaded"></Index>
</template>
<style lang="scss">

</style>
<script>
import Index from './yjya.vue'

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
