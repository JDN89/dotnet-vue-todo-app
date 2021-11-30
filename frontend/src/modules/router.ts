import { UserModule } from "~/types";
import { useUserStore } from "~/stores/user";

export const install: UserModule = ({ app, router, isClient }) => {
  if (isClient) {
    // use const inside export function, otherwise error that pinis is not isntalled yet
    const userStore = useUserStore();
    router.beforeEach((to, from) => {
      console.log(userStore.getIsAuthenticated);

      console.log(to);
      console.log(from);
    });
  }
};
