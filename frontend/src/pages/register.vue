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
    .oneOf([yup.ref("password"), null], "Confirmed Password doesn't match")
    .required(),
});

//  IsSubmitting disables the submit button until the yup rules are met

const { handleSubmit, values } = useForm({
  validationSchema: schema,
});

// Sync store state with vee-validate state
// This is a one way binding
watch(values, (newFormData) => {
  userStore.$patch({ userData: newFormData });
});

// create a handler to submit the store state
// the store action will only run when the user submits valid form data
const onSubmit = handleSubmit(userStore.registerUser);
// resetForm()
</script>

<template>
  <div class="mx-auto min-w-xs max-w-xs py-6 prose ">
    <h2>{{ t("page.register") }}</h2>

    <form
      v-if="!userStore.getRegistrationFormIsVisible"
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
          placeholder="Password"
          class="field"
        />
        <ErrorMessage name="password" class="errorMessage" />
      </div>

      <div class="flex flex-col">
        <Field
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="field"
        />
        <ErrorMessage name="confirmPassword" class="errorMessage" />
      </div>

      <button type="submit">Submit</button>
    </form>
    <h3
      class="
        rounded-md
        mx-auto
        min-w-xs
        bg-green-100 border-1
        border-green-900
        m-1
        text-center
        text-green-900
        darkd:rounded-md dark:bg-green-900 dark:border-1
        dark:border-green-300
        dark:text-green-300
      "
      v-else
    >
      Registration Succesfull!
    </h3>
  </div>
</template>
