<script>
import RoleModal from './RoleModal.vue'
import { mapActions } from 'vuex'
export default {
    extends: RoleModal,
    methods: {
        ...mapActions([
            "QueryRoleByRoleId",
            "AC_ObtainRole",
        ]),
        async fetchData() {
            await this.$store.dispatch("QueryRoleByRoleId",{
                roleId:this.roleId,
            }).then(role=>{
                this.form=role;
            })
            // let { name, status } = await this.AC_ObtainRole({
            //     id: this.id
            // })
        },
        async submit() {
            let valid = await this.validate()
            if(valid) {
               this.AC_ModifyRole({
                   roleId: this.roleId,
                   ...this.form
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
