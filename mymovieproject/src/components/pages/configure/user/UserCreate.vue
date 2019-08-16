<script>
import UserModel from './UserModal.vue'
import {mapActions} from 'vuex'
export default {
    extends:UserModel,
    methods:{
        ...mapActions(["AC_CreateUser"]),
        async submit(){
            let vaild =await this.validate()
            if(vaild){
                this.AC_CreateUser({
                    ...this.form
                }).then(()=>{
                    this.$emit('success')
                    this.cancel()
                })
            }
        }
    }
    
}
</script>

<style scoped>

</style>