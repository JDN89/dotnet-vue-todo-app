// @ts-check
import { acceptHMRUpdate, defineStore } from "pinia";

interface State {
    showAlert: boolean;
    alertMessage: string | null;
}

export const useAlertStore = defineStore("alert", {
    state: (): State => ({
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
        getShowAlert: (state: State) => state.showAlert,
        getAlertMessage: (state: State) => state.alertMessage,
    },
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot));
