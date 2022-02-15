export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDiaolog () {
      this.$emit('update:show', false);
    }
  },
  mounted() {

  }
}
