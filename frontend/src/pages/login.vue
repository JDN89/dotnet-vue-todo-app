<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const { t } = useI18n();
const userStore = useUserStore();

// Create a form context with the validation schema

const schema = yup.object({
  email: yup.string().required().email(),
  hash: yup.string().required().min(8),
});

//  IsSubmitting disables the submit button until the yup rules are met

const { handleSubmit, values } = useForm({
  validationSchema: schema,
});

// Sync store state with vee-validate state
// This is a one way binding
watch(values, (newFormData) => {
  userStore.$patch({ loginData: newFormData });
});

// create a handler to submit the store state
// the store action will only run when the user submits valid form data
const onSubmit = handleSubmit(async () => {
  // check if getLoginData is not null
  if (userStore.getLoginData) {
    const response = await userStore.loginUser(userStore.getLoginData);
    if (response == true) {
      router.replace({
        name: "todos",
        params: { todos: userStore.getUserId },
      });
    }
  } else alert("Singin failed, could't retrieve login data");
});

const router = useRouter();
</script>

<template>
  <div class="mx-auto min-w-xs max-w-xs py-6 prose">
    <h2>{{ t("page.login") }}</h2>

    <form @submit="onSubmit" class="flex flex-col">
      <div class="flex flex-col">
        <Field name="email" type="email" placeholder="Email" class="field" />

        <ErrorMessage name="email" class="errorMessage" />
      </div>

      <div class="flex flex-col">
        <Field name="hash" type="hash" placeholder="hash" class="field" />
        <ErrorMessage name="hash" class="errorMessage" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
