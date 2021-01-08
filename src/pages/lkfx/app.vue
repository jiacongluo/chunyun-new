<template>
    <div class="base-page">
        <Index v-if="isloaded"></Index>
    </div>
</template>
<style lang="scss">
.base-page{
    background-color: #0c2449;
    width: 1920px;
    height: 1080px;
}
</style>
<script>
import Index from './lkfx.vue'

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
