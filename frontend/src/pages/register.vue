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
  confirmpassword: yup
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
// resetForm()
</script>

<template>
  <div class="mx-auto min-w-xs max-w-xs py-6 prose">
    <h2>{{ t("page.register") }}</h2>

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
          placeholder="password"
          class="field"
        />
        <ErrorMessage name="password" class="errorMessage" />
      </div>

      <div class="flex flex-col">
        <Field
          name="confirmpassword"
          type="password"
          placeholder="Confirm password"
          class="field"
        />
        <ErrorMessage name="confirmpassword" class="errorMessage" />
      </div>

      <button type="submit">Submit</button>
    </form>
    <router-link
      to="login"
      w:border="1 green-900 dark:green-300"
      w:text="center green-900 dark:green-300"
      w:bg="green-100 dark:green-900"
      class="rounded-md mx-auto min-w-xs"
      v-else
    >
      Registration Succesfull > Login
    </router-link>
  </div>
</template>
