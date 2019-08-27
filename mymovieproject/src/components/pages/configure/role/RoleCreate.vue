<script>
import RoleModal from './RoleModal.vue'
import { mapActions } from "vuex";
export default {
  extends: RoleModal,
  methods: {
    ...mapActions(["CreatRole"]),
    async submit() {
      let valid = await this.validate()
      if(valid) {
        this.CreatRole({
          ...this.form
        }).then(() => {
          this.$emit('success')
          this.cancel()
        }).catch(err=>{
          this.$store.commit('SHOW_ERROR_TOAST', err.data.message || err.data);
        })
      }
    }
  },
};
</script>