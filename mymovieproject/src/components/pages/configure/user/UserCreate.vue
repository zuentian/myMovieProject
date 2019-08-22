<script>
import UserModel from './UserModal.vue'
import {mapActions} from 'vuex'
import md5 from 'js-md5'
export default {
    extends:UserModel,
    methods:{
        ...mapActions(["CreateUser"]),
        async submit(){
            this.form.password=md5(this.form.password);
            let vaild =await this.validate()
            if(vaild){
                this.CreateUser({
                    ...this.form
                }).then(()=>{
                    this.$emit('success')
                    this.cancel()
                }).catch((err)=>{
                    //this.$store.commit('SHOW_ERROR_TOAST', err.data.message || err.data)        
                    this.cancel();
                })
            }
        }
    }
    
}
</script>

<style scoped>

</style>