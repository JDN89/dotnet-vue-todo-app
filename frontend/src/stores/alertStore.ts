import { acceptHMRUpdate, defineStore } from "pinia";

interface AlertStateInterface {
  showAlert: boolean;
  alertMessage: string | null;
}

export const useAlertStore = defineStore("alert", {
  state: (): AlertStateInterface => ({
    showAlert: false,
    alertMessage: null,
  }),
  actions: {
    async closeAlert() {
      this.showAlert = false;
      this.alertMessage = null;
    },
  },
  getters: {
    getShowAlert: (state) => state.showAlert,
    getAlertMessage: (state) => state.alertMessage,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot));
