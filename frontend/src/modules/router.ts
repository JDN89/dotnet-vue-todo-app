import { UserModule } from "~/types";
import { useUserStore } from "~/stores/user";

//custom router module

export const install: UserModule = ({ app, router, isClient }) => {
  if (isClient) {
    // use const inside export function, otherwise error that pinis is not isntalled yet
    const userStore = useUserStore();
    router.beforeEach((to, from, next) => {
      if (to.meta?.requiresAuth && userStore.getIsAuthenticated) {
        console.log("authorized and required");
        console.log(to.params);
        next();
      } else if (to.meta?.requiresAuth) {
        console.log("required and unauthorized");

        next("/login");
      } else {
        next();
      }

      //   console.log(userStore.getIsAuthenticated);

      //   console.log(to);
      //   console.log(from);
    });
  }
};
