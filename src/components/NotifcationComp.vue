<template>
  <div class="notifContainer" v-if="this.displayConditions">
    <div :class="this.typeStyling()">
      <div class="text">{{ this.notifText }}</div>
    </div>
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
        this.notifType = this.getNotification[0]["type"];
        await this.delay(3000);
        this.notifText = null;
        this.notifType = null;
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
    /**
     * Returns the class which corresponds to the type name.
     * ** good practice in case of error from type attribution **
     */
    typeStyling() {
      switch (this.notifType) {
        case "info":
          return "info";
        case "alert":
          return "alert";
        case "confirm":
          return "confirm";
        default:
          return "info";
      }
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
  filter: drop-shadow(0 0 0.3rem rgb(0, 0, 0));
}

.info {
  width: 100%;
  height: 100%;
  /* border: 5px solid rgb(0, 101, 160); */
  background: rgb(119, 205, 255);
  border-radius: 0.7rem;
  background-color: rgba(23, 59, 133, 0.8);
  color: #f8f8f8;
}

.alert {
  width: 100%;
  height: 100%;
  /* border: 5px solid rgb(0, 101, 160); */
  /* background: rgb(255, 119, 119); */
  border-radius: 0.7rem;
  background-color: rgba(133, 23, 23, 0.8);
  color: #f8f8f8;
}

.text {
  font-size: 1.4rem;
  letter-spacing: 0.2px;
  width: 100%;
  height: 100%;
  padding: 1rem;
}
</style>
