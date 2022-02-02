"use strict";
exports[Symbol.toStringTag] = "Module";
var main = require("../main.js");
var vue = require("vue");
var vueI18n = require("vue-i18n");
var serverRenderer = require("vue/server-renderer");
require("vue-next-masonry");
require("nprogress");
require("pinia");
require("axios");
require("vite-ssg");
require("vue-router");
require("@vueuse/core");
require("@vueuse/head");
const _hoisted_1$4 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$4 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$4 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = [
  _hoisted_2$4,
  _hoisted_3$4
];
function render$4(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_4);
}
var __unplugin_components_2$2 = { name: "carbon-checkbox-checked", render: render$4 };
const _hoisted_1$3 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 16 16"
};
const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"
  })
], -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
var __unplugin_components_2$1 = { name: "bi-plus-lg", render: render$3 };
const _hoisted_1$2 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
var __unplugin_components_2 = { name: "carbon-checkbox", render: render$2 };
var block0$3 = {};
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    const todoStore = main.useTodoStore();
    const alertStore = main.useAlertStore();
    let showInput = vue.ref(false);
    let newTodo = vue.ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_bi_x_lg = main.__unplugin_components_0;
      const _component_carbon_checkbox = __unplugin_components_2;
      const _component_bi_plus_lg = __unplugin_components_2$1;
      const _component_carbon_checkbox_checked = __unplugin_components_2$2;
      const _component_Alert = main._sfc_main;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center" }, _attrs))}><div class="msg content-center min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 sm:mx-auto mx-auto"><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.close"))} class="float-right hover mt-1 mr-1">`);
      _push(serverRenderer.ssrRenderComponent(_component_bi_x_lg, null, null, _parent));
      _push(`</button><div class="title prose"><h3>${serverRenderer.ssrInterpolate(vue.unref(todoStore).getTemporaryList.title)}</h3></div><hr class="hr max-w-27 pb-3"><div class="todos"><ul><div class="relative"><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(todoStore).getTemporaryList.todos, (todo) => {
        _push(`<li class="flex justify-left items-start">`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_checkbox, { class: "mr-2 my-auto hover" }, null, _parent));
        _push(`${serverRenderer.ssrInterpolate(todo)}</li>`);
      });
      _push(`<!--]--></div></ul></div><div class="flex justify-left items-start">`);
      if (!vue.unref(showInput)) {
        _push(serverRenderer.ssrRenderComponent(_component_bi_plus_lg, { class: "hover" }, null, _parent));
      } else {
        _push(`<input type="text"${serverRenderer.ssrRenderAttr("value", vue.unref(newTodo))} placeholder="Add a new todo" class="max-w-43 bg-transparent mx-auto ml-2 overflow-hidden focus:outline-none placeholder-true-gray-600 placeholder-opacity-20 dark:placeholder-light-50 dark:placeholder-opacity-20">`);
      }
      _push(`</div><hr class="m-2"><div><ul><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(todoStore).getTemporaryList.archived, (archived) => {
        _push(`<li class="flex justify-left items-start">`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_checkbox_checked, { class: "mr-2 my-auto hover" }, null, _parent));
        _push(` ${serverRenderer.ssrInterpolate(archived)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
      if (vue.unref(alertStore).getShowAlert) {
        _push(serverRenderer.ssrRenderComponent(_component_Alert, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
if (typeof block0$3 === "function")
  block0$3(_sfc_main$3);
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/todos/AddTodo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var TodoList_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0$2 = {};
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    const todoStore = main.useTodoStore();
    const deleteList = (listId) => {
      todoStore.deleteList(listId);
    };
    const archiveTask = (listId, todo) => {
      todoStore.archiveTask(listId, todo);
    };
    const unArchiveTask = (listId, todo) => {
      todoStore.unArchiveTask(listId, todo);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_masonry = vue.resolveComponent("masonry");
      const _component_carbon_edit = main.__unplugin_components_0$1;
      const _component_carbon_checkbox = __unplugin_components_2;
      const _component_carbon_checkbox_checked = __unplugin_components_2$2;
      const _component_carbon_trash_can = main.__unplugin_components_3;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        id: "List",
        class: "container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center"
      }, _attrs))} data-v-996a03fa>`);
      _push(serverRenderer.ssrRenderComponent(_component_masonry, {
        cols: { default: 5, 1280: 4, 1192: 3, 840: 2, 520: 1 },
        gutter: { default: "20px", 700: "15px", 500: "0px" },
        class: "mx-auto container justify-center"
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            serverRenderer.ssrRenderList(vue.unref(todoStore).getLists, (list) => {
              _push2(`<div class="msg hover max-h-screen-lg overflow-auto" data-v-996a03fa${_scopeId}><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.edit"))} class="float-right hover" data-v-996a03fa${_scopeId}>`);
              _push2(serverRenderer.ssrRenderComponent(_component_carbon_edit, null, null, _parent2, _scopeId));
              _push2(`</button><div class="title prose" data-v-996a03fa${_scopeId}><h3 data-v-996a03fa${_scopeId}>${serverRenderer.ssrInterpolate(list.title)}</h3></div><hr class="hr max-w-27 pb-3" data-v-996a03fa${_scopeId}><div class="todos" data-v-996a03fa${_scopeId}><ul data-v-996a03fa${_scopeId}><div class="relative" data-v-996a03fa${_scopeId}><!--[-->`);
              serverRenderer.ssrRenderList(list.todos, (todo) => {
                _push2(`<li data-v-996a03fa${_scopeId}>`);
                _push2(serverRenderer.ssrRenderComponent(_component_carbon_checkbox, { class: "mr-2 my-auto hover" }, null, _parent2, _scopeId));
                _push2(`${serverRenderer.ssrInterpolate(todo)}</li>`);
              });
              _push2(`<!--]--></div></ul></div><hr class="m-2" data-v-996a03fa${_scopeId}><div class="archived" data-v-996a03fa${_scopeId}><ul data-v-996a03fa${_scopeId}><!--[-->`);
              serverRenderer.ssrRenderList(list.archived, (archived) => {
                _push2(`<li class="flex justify-left items-start" data-v-996a03fa${_scopeId}>`);
                _push2(serverRenderer.ssrRenderComponent(_component_carbon_checkbox_checked, { class: "mr-2 my-auto hover" }, null, _parent2, _scopeId));
                _push2(` ${serverRenderer.ssrInterpolate(archived)}</li>`);
              });
              _push2(`<!--]--></ul></div><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.delete"))} class="float-right" data-v-996a03fa${_scopeId}>`);
              _push2(serverRenderer.ssrRenderComponent(_component_carbon_trash_can, { class: "float-right hover" }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(vue.unref(todoStore).getLists, (list) => {
                return vue.openBlock(), vue.createBlock("div", {
                  key: list.listId,
                  class: "msg hover max-h-screen-lg overflow-auto"
                }, [
                  vue.createVNode("button", {
                    title: vue.unref(t)("button.edit"),
                    class: "float-right hover"
                  }, [
                    vue.createVNode(_component_carbon_edit, {
                      onClick: ($event) => vue.unref(todoStore).changeList(list)
                    }, null, 8, ["onClick"])
                  ], 8, ["title"]),
                  vue.createVNode("div", { class: "title prose" }, [
                    vue.createVNode("h3", null, vue.toDisplayString(list.title), 1)
                  ]),
                  vue.createVNode("hr", { class: "hr max-w-27 pb-3" }),
                  vue.createVNode("div", { class: "todos" }, [
                    vue.createVNode("ul", null, [
                      vue.createVNode("div", { class: "relative" }, [
                        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(list.todos, (todo) => {
                          return vue.openBlock(), vue.createBlock("li", { key: todo }, [
                            vue.createVNode(_component_carbon_checkbox, {
                              onClick: ($event) => archiveTask(list.listId, todo),
                              class: "mr-2 my-auto hover"
                            }, null, 8, ["onClick"]),
                            vue.createTextVNode(vue.toDisplayString(todo), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  vue.createVNode("hr", { class: "m-2" }),
                  vue.createVNode("div", { class: "archived" }, [
                    vue.createVNode("ul", null, [
                      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(list.archived, (archived) => {
                        return vue.openBlock(), vue.createBlock("li", {
                          key: archived,
                          class: "flex justify-left items-start"
                        }, [
                          vue.createVNode(_component_carbon_checkbox_checked, {
                            onClick: ($event) => unArchiveTask(list.listId, archived),
                            class: "mr-2 my-auto hover"
                          }, null, 8, ["onClick"]),
                          vue.createTextVNode(" " + vue.toDisplayString(archived), 1)
                        ]);
                      }), 128))
                    ])
                  ]),
                  vue.createVNode("button", {
                    title: vue.unref(t)("button.delete"),
                    onClick: ($event) => deleteList(list.listId),
                    class: "float-right"
                  }, [
                    vue.createVNode(_component_carbon_trash_can, { class: "float-right hover" })
                  ], 8, ["title", "onClick"])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0$2 === "function")
  block0$2(_sfc_main$2);
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/todos/TodoList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var __unplugin_components_1$1 = /* @__PURE__ */ main._export_sfc(_sfc_main$2, [["__scopeId", "data-v-996a03fa"]]);
const _hoisted_1$1 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M29.707 5.293l-3-3a1 1 0 0 0-1.414 0L19.586 8h-2.491a11.012 11.012 0 0 0-10.383 7.366L2.056 28.67a1 1 0 0 0 1.275 1.274l13.303-4.656A11.012 11.012 0 0 0 24 14.905v-2.49l5.707-5.708a1 1 0 0 0 0-1.414zm-7.414 6A1 1 0 0 0 22 12v2.905a9.01 9.01 0 0 1-6.027 8.495l-9.168 3.209L16 17.414L14.586 16L5.39 25.195L8.6 16.027A9.01 9.01 0 0 1 17.095 10H20a1 1 0 0 0 .707-.293L26 4.414L27.586 6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_1 = { name: "carbon-pen-fountain", render: render$1 };
const _hoisted_1 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 16 16"
};
const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("path", {
  "fill-rule": "evenodd",
  d: "M2.5 1.75a.25.25 0 0 1 .25-.25h8.5a.25.25 0 0 1 .25.25v7.736a.75.75 0 1 0 1.5 0V1.75A1.75 1.75 0 0 0 11.25 0h-8.5A1.75 1.75 0 0 0 1 1.75v11.5c0 .966.784 1.75 1.75 1.75h3.17a.75.75 0 0 0 0-1.5H2.75a.25.25 0 0 1-.25-.25V1.75zM4.75 4a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5zM4 7.75A.75.75 0 0 1 4.75 7h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 4 7.75zm11.774 3.537a.75.75 0 0 0-1.048-1.074L10.7 14.145L9.281 12.72a.75.75 0 0 0-1.062 1.058l1.943 1.95a.75.75 0 0 0 1.055.008l4.557-4.45z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var __unplugin_components_0$1 = { name: "octicon-checklist16", render };
var NewList_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0$1 = {};
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    main.useAlertStore();
    let isVisible = vue.ref(false);
    main.useTodoStore();
    const todo = vue.ref("");
    const newList = vue.reactive({
      title: "",
      todos: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_octicon_checklist_16 = __unplugin_components_0$1;
      const _component_carbon_pen_fountain = __unplugin_components_1;
      const _component_carbon_checkbox = __unplugin_components_2;
      const _component_carbon_add_alt = main.__unplugin_components_3$1;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center pt-12 pb-7" }, _attrs))} data-v-509489f7>`);
      if (!vue.unref(isVisible)) {
        _push(`<button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.createList"))} class="hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50" data-v-509489f7>`);
        _push(serverRenderer.ssrRenderComponent(_component_octicon_checklist_16, null, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<div class="msg relative min-w-xs overflow-y-auto" data-v-509489f7><div class="title" data-v-509489f7>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_pen_fountain, { class: "icon mt-1 absolute" }, null, _parent));
        _push(`<input type="text"${serverRenderer.ssrRenderAttr("placeholder", vue.unref(t)("input.title"))}${serverRenderer.ssrRenderAttr("value", vue.unref(newList).title)} class="transition duration-500 bg-transparent focus:outline-none" data-v-509489f7></div><div class="todo mb-1" data-v-509489f7>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_pen_fountain, { class: "icon mt-1 absolute" }, null, _parent));
        _push(`<input id="todoInput" type="text"${serverRenderer.ssrRenderAttr("placeholder", vue.unref(t)("input.todo"))}${serverRenderer.ssrRenderAttr("value", todo.value)} class="bg-transparent transition duration-500 focus:outline-none" data-v-509489f7></div><hr class="max-w-xs mx-auto mt-1" data-v-509489f7><div class="newTodos" data-v-509489f7><ul class="pt-3 items-end" data-v-509489f7><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(newList).todos, (todo2) => {
          _push(`<li class="flex justify-left items-start" data-v-509489f7>`);
          _push(serverRenderer.ssrRenderComponent(_component_carbon_checkbox, { class: "mx-3 my-auto" }, null, _parent));
          _push(` ${serverRenderer.ssrInterpolate(todo2)}</li>`);
        });
        _push(`<!--]--></ul><button class="float-right hover"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.submit"))} data-v-509489f7>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_add_alt, null, null, _parent));
        _push(`</button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
if (typeof block0$1 === "function")
  block0$1(_sfc_main$1);
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/todos/NewList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var __unplugin_components_0 = /* @__PURE__ */ main._export_sfc(_sfc_main$1, [["__scopeId", "data-v-509489f7"]]);
var block0 = {};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const todoStore = main.useTodoStore();
    vue.onMounted(() => {
      todoStore.fetchTodoLists();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NewList = __unplugin_components_0;
      const _component_TodoList = __unplugin_components_1$1;
      const _component_AddTodo = _sfc_main$3;
      _push(`<!--[--><div class="mx-auto">`);
      _push(serverRenderer.ssrRenderComponent(_component_NewList, null, null, _parent));
      _push(serverRenderer.ssrRenderComponent(_component_TodoList, null, null, _parent));
      _push(`</div>`);
      if (vue.unref(todoStore).getShowAddTodoComponent) {
        _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>`);
        _push(serverRenderer.ssrRenderComponent(_component_AddTodo, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/myTodos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
exports["default"] = _sfc_main;
