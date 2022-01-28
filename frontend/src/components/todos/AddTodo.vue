<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";
import { useAlertStore } from "~/stores/alertStore";

const { t } = useI18n();
const todoStore = useTodoStore();
const alertStore = useAlertStore();

let showInput = ref<boolean>(false);

let newTodo = ref<string | null>(null);
const addNewTodo = async (
  listId: number,
  todo: string | null,
  todos: string[],
  archived: string[]
) => {
  // if todo item already exists, give an alert
  // current design of DB gives error if we have duplicate todo and archive descriptions
  // in the same list
  // reason => we fetch list title + listId +todo and archive
  // when we (un)archive a task we filter on the todo description instead of the id
  // this is a mistake
  // CHORE => rewrite the fetchList query and retrieve also the todoId and archiveId
  // use the id's as :key in the v-for="todo" block
  // and in the v-for="archived" block
  // The CURRENT temporary solution is making sure that no duplicate items exist
  // in the todos array and archived array before we push them to the backend
  if (todo?.length == null) {
    alertStore.showAlert = true;
    return (alertStore.alertMessage = t("alert.todoNull"));
  }

  if (todos.includes(todo)) {
    alertStore.showAlert = true;
    return (alertStore.alertMessage = t("alert.todoDuplicate"));
  }
  if (archived.includes(todo)) {
    await todoStore
      .unArchiveTask(listId, todo)
      .then(() => (showInput.value = false))
      .then(() => (newTodo.value = null));
    return await todoStore.fetchList(listId);
  } else {
    await todoStore.addTodo(listId, todo);
    showInput.value = false;
    await todoStore.fetchList(listId);
    return (newTodo.value = null);
  }
};

const archiveTask = async (listId: number, todo: string) => {
  await todoStore.archiveTask(listId, todo);
  await todoStore.fetchList(listId);
};
const unArchiveTask = async (listId: number, todo: string) => {
  await todoStore.unArchiveTask(listId, todo);
  await todoStore.fetchList(listId);
};
</script>

<template>
  <div
    class="flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center"
  >
    <div
      class="msg content-center min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 sm:mx-auto mx-auto"
    >
      <button
        :title="t('button.close')"
        class="float-right hover mt-1 mr-1"
        @click="todoStore.showAddTodoComp = false"
      >
        <bi-x-lg />
      </button>
      <div class="title prose">
        <h3>
          {{ todoStore.getTemporaryList!.title }}
        </h3>
      </div>
      <hr class="hr max-w-27 pb-3" />

      <div class="todos">
        <ul>
          <div class="relative">
            <li
              v-for="todo in todoStore.getTemporaryList!.todos"
              :key="todo"
              class="flex justify-left items-start"
            >
              <carbon-checkbox
                @click="archiveTask(todoStore.getTemporaryList!.listId, todo)"
                class="mr-2 my-auto hover"
              />{{ todo }}
            </li>
          </div>
        </ul>
      </div>
      <div class="flex justify-left items-start">
        <bi-plus-lg v-if="!showInput" @click="showInput = true" class="hover" />

        <input
          v-else
          type="text"
          key="user-input"
          v-model="newTodo"
          placeholder="Add a new todo"
          class="max-w-43 bg-transparent mx-auto ml-2 overflow-hidden focus:outline-none placeholder-true-gray-600 placeholder-opacity-20 dark:placeholder-light-50 dark:placeholder-opacity-20"
          @blur="
            addNewTodo(
              todoStore.getTemporaryList!.listId,
              newTodo,
              todoStore.getTemporaryList!.todos,
              todoStore.getTemporaryList!.archived
            )
          "
        />
      </div>

      <hr class="m-2" />

      <div>
        <ul>
          <li
            v-for="archived in todoStore.getTemporaryList!.archived"
            :key="archived"
            class="flex justify-left items-start"
          >
            <carbon-checkbox-checked
              @click="unArchiveTask(todoStore.getTemporaryList!.listId, archived)"
              class="mr-2 my-auto hover"
            />

            {{ archived }}
          </li>
        </ul>
      </div>
      <Alert v-if="alertStore.getShowAlert" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
