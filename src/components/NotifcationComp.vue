<template>
  <div class="notifContainer" v-if="this.displayConditions">
    <div class="text">{{ this.notifText }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NotificationComp",
  data() {
    return {
      notifText: null,
      notifType: null,
    };
  },
  computed: {
    ...mapGetters({
      getNotification: "notifications/getNotifications",
    }),
    /**
     * Conditions to display Notification body
     */
    displayConditions() {
      return this.getNotification.length > 0 && this.notifText;
    },
  },
  beforeUpdate() {
    this.displayNotif();
  },
  methods: {
    ...mapActions({
      loadNotification: "notifications/loadNotification",
      deleteUsedNotif: "notifications/deleteUsedNotif",
    }),
    /**
     * Recursive function that displays notifications queued in state
     */
    async displayNotif() {
      if (this.getNotification.length >= 1 && !this.notifText) {
        console.log("entered here", this.getNotification);
        this.notifText = this.getNotification[0]["message"];
        await this.delay(3000);
        this.notifText = null;
        this.deleteUsedNotif();
        this.displayNotif();
      } else return;
    },
    /**
     * Use in async functions to make function wait for setTimeout
     * @param {Number} ms
     */
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style scoped>
@import "../assets/css/fontKanit.css";
@import "../assets/css/fontRoboto.css";
@import "../assets/css/fontPoppins.css";

.notifContainer {
  position: absolute;
  background: rgb(134, 134, 213);
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  margin-bottom: 1rem;
  min-width: 5rem;
  width: fit-content;
  max-width: 40rem;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.text {
  font-size: 1.4rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
}
</style>
