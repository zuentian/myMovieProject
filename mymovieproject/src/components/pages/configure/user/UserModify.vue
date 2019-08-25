<script>
import UserModal from './UserModal.vue'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
export default {
    extends: UserModal,
    methods: {
        ...mapActions([
            "UpdateUserByUserId",
            "QueryUserByUserId",
        ]),
        async fetchData() {
            await this.$store.dispatch("QueryUserByUserId",{
                userId: this.userId
            }).then(user=>{
                this.form=user;
                this.form.password="";
            })
        },
        async submit() {
            this.form.password=md5(this.form.password);
            let valid = await this.validate()
            if(valid) {
               this.$store.dispatch("UpdateUserByUserId",{
                   user:this.form,
               }).then(() => {
                   this.$emit('success')
                   this.cancel()
               })
            }
        }
    },
    created() {
        this.fetchData()
    },
}
</script>
