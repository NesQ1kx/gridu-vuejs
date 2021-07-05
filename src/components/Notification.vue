<template>
  <transition name="fade">
    <div class="notification" :class="notificationTypeToClass">
      {{ notification.message }}
    </div>
  </transition>
</template>

<script>
import actions from "@/store/actions";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    notificationTypeToClass() {
      return `-${this.notification.type}`;
    },
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.$store.dispatch(actions.REMOVE_NOTIFICATION, this.notification.id);
    }, 3000);
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.notification {
  padding: 5px;
  border-radius: 5px;
  color: white;
}

.notification.-success {
  background-color: green;
}

.notification.-error {
  background-color: red;
}
</style>
