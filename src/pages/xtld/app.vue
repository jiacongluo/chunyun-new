<template>
    <Index2 v-if="ifOld"></Index2>
    <Index v-else></Index>
</template>
<style lang="scss">

</style>
<script>
import Index1 from './xtld1.vue'
import Index2 from './xtld2.vue'
import Index from './xtld.vue'
export default {
    components: {
        Index,
        Index1,
        Index2
    },
    data() {
        var theDate=new Date();
        var theSplitTime=new Date('2019-01-16 23:00:00');
        return {
          ifOld:true
        }
    },
    created () {
    },
    methods: {
    }

}
</script>
