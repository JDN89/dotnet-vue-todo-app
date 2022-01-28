<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const { t } = useI18n();
const userStore = useUserStore();

// Create a form context with the validation schema

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirmed password doesn't match")
    .required(),
});

//  IsSubmitting disables the submit button until the yup rules are met

const { handleSubmit, values } = useForm({
  validationSchema: schema,
});

// Sync store state with vee-validate state
// store formData(email,password) in createdUserData
// This is a one way binding
watch(values, (newFormData) => {
  userStore.$patch({ createdUserData: newFormData });
});

// create a handler to submit the store state
// the store action will only run when the user submits valid form data
const onSubmit = handleSubmit(userStore.registerUser);

// Upon successful registration, reroute to login page after 2 seconds
const router = useRouter();
onUpdated(() => {
  if (userStore.getRegistrationFormIsVisible == false) {
    setTimeout(() => {
      router.replace({
        name: "login",
      });
    }, 2000);
  }
});
</script>

<template>
  <div class="mx-auto min-w-xs max-w-xs py-6 prose">
    <h2 class>{{ t("page.register") }}</h2>

    <form
      v-if="userStore.getRegistrationFormIsVisible"
      @submit="onSubmit"
      class="flex flex-col"
    >
      <div class="flex flex-col">
        <Field name="email" type="email" placeholder="Email" class="field" />

        <ErrorMessage name="email" class="errorMessage" />
      </div>

      <div class="flex flex-col">
        <Field
          name="password"
          type="password"
          :placeholder="t('text.password')"
          class="field"
        />
        <ErrorMessage name="password" class="errorMessage" />
      </div>

      <div class="flex flex-col">
        <Field
          name="confirmPassword"
          type="password"
          :placeholder="t('text.confirmPassword')"
          class="field"
        />
        <ErrorMessage name="confirmPassword" class="errorMessage" />
      </div>

      <button
        type="submit"
        class="mt-2 hover w-19 bg-red-900 dark:bg-teal-700 dark:text-light-50 text-yellow-300 rounded-2xl mx-auto"
      >
        {{ t("button.submit") }}
      </button>
    </form>
    <p
      to="login"
      w:text="center 2xl  yellow-300 dark:light-50"
      w:bg="red-900 dark:teal-700"
      class="font-bold rounded-2xl text-yellow-300 mx-auto mx-1"
      v-else
    >
      {{ t("text.registrationSuccessful") }}
    </p>
  </div>
</template>
