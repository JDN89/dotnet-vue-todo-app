import { UserModule } from "~/types";
import { useUserStore } from "~/stores/user";

//custom router module

export const install: UserModule = ({ app, router, isClient }) => {
  if (isClient) {
    // use const inside export function, otherwise pinia error
    // route guard: check if auth is required and token is present
    const userStore = useUserStore();
    router.beforeEach((to, from, next) => {
      if (to.meta?.requiresAuth && userStore.getToken) {
        console.log("authorized");

        next();
      } else if (to.meta?.requiresAuth) {
        console.error("unauthorized");

        next("/login");
      } else {
        next();
      }
    });
  }
};
