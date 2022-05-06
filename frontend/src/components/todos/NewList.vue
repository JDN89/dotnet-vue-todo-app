<script setup lang="ts">
import { newListInterface } from "~/types/interfaces";
import { useTodoStore } from "~/stores/todos";
import { useAlertStore } from "~/stores/alertStore";

const { t } = useI18n();

const alertStore = useAlertStore();

let isVisible = ref(false);

const showHidden = () => {
    isVisible.value = true;
};

const todoStore = useTodoStore();

const todo = ref<string>("");

const addNewTodo = () => {
    if (todo.value.length > 0) {
        newList.todos.push(todo.value);
        todo.value = "";
        return document.getElementById("todoInput")!.focus();
    } else {
        alertStore.showAlert = true;
        return (alertStore.alertMessage = t("alert.todoNull"));
    }
};

const newList: newListInterface = reactive({
    title: "",
    todos: [],
});

const addList = () => {
    let copyOfList = Object.assign({}, newList);
    if (newList.title?.length === 0) {
        alertStore.showAlert = true;
        return (alertStore.alertMessage = t("alert.listTitle"));
    } else if (newList.todos?.length == 0) {
        alertStore.showAlert = true;
        return (alertStore.alertMessage = t("alert.zeroTasks"));
    } else {
        try {
            todoStore.add(copyOfList);
        } catch (error) {
            console.error(error);
        } finally {
            newList.title = "";
            newList.todos = [];
            isVisible.value = false;
        }
    }
};
</script>

<template>
    <div class="container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center pt-12 pb-7">
        <button @click="showHidden" v-if="!isVisible" :title="t('button.createList')"
            class="hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50">
            <octicon-checklist-16 />
        </button>
        <div v-else class="msg relative min-w-xs overflow-y-auto">
            <div class="title">
                <carbon-pen-fountain class="icon mt-1 absolute" />
                <input type="text" :placeholder="t('input.title')" v-model="newList.title"
                    class="transition duration-500 bg-transparent focus:outline-none" />
            </div>
            <!-- <hr class="w-3/4 mx-auto dark:gray-100"   /> -->
            <div class="todo mb-1">
                <carbon-checkbox class="icon mt-1 absolute" />
                <input ref="todoRef" id="todoInput" type="text" :placeholder="t('input.todo')" v-model="todo"
                    @keyup.enter="addNewTodo" @blur="$refs.todoRef.focus()"
                    class="bg-transparent transition duration-500 focus:outline-none" />
            </div>
            <hr class="max-w-xs mx-auto mt-1" />
            <div class="newTodos">
                <ul class="pt-3 items-end">
                    <li v-for="todo in newList.todos" :key="todo" class="flex justify-left items-start">
                        <carbon-checkbox class="mx-3 my-auto" /> {{ todo }}
                    </li>
                </ul>
                <button @click="addList" class="float-right hover" :title="t('button.submit')">
                    <carbon-add-alt />
                </button>
            </div>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>

<style scoped>
.newTodos {
    text-align: left;
}

input {
    padding-left: 33px;
}
</style>
