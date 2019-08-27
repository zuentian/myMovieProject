<script>
import RoleModal from './RoleModal.vue'
import { mapActions } from 'vuex'
export default {
    extends: RoleModal,
    methods: {
        ...mapActions([
            "QueryRoleByRoleId",
            "UpdateRoleByRoleId",
        ]),
        async fetchData() {
            await this.$store.dispatch("QueryRoleByRoleId",{
                roleId:this.roleId,
            }).then(role=>{
                this.form=role;
            })
        },
        async submit() {
            let valid = await this.validate()
            if(valid) {
               this.UpdateRoleByRoleId({
                   roleId: this.roleId,
                   status:this.form.status,
               }).then(() => {
                   this.$notify({title: '保存成功',message: '',type: 'success'});
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
