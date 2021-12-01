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
  password: yup.string().required().min(8),
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
const onSubmit = handleSubmit(userStore.loginUser);
// resetForm()

const router = useRouter();

// })

const engage = () => {
  router.replace({
    name: "todos",
    params: { todos: userStore.getUsers[1].id },
  });
};
</script>

<template>
  <div class="mx-auto min-w-xs max-w-xs py-6 prose">
    <h2>{{ t("page.login") }}</h2>

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

      <button type="submit">Submit</button>
      <button @click="engage">nav to todos</button>
    </form>
  </div>
</template>
