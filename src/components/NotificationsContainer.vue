<template>
  <div class="container">
    <Notification
      v-for="item in notifications"
      :key="item.id"
      :notification="item"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    Notification,
  },
  computed: {
    ...mapState({
      notifications: (state) => state.notifications,
    }),
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  margin: 20px;
}
</style>
