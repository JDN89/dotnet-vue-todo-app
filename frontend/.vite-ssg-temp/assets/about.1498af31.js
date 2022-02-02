"use strict";
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueI18n = require("vue-i18n");
var serverRenderer = require("vue/server-renderer");
var main = require("../main.js");
require("vue-next-masonry");
require("nprogress");
require("pinia");
require("axios");
require("vite-ssg");
require("vue-router");
require("@vueuse/core");
require("@vueuse/head");
var about_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0 = {};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "text-black dark:text-light-50" }, _attrs))} data-v-535d577b><div class="msg prose py-7 mt-15 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl" data-v-535d577b><p data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("text.intro"))}</p></div><br data-v-535d577b><div class="msg prose max-h-prose py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl" data-v-535d577b><h3 data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("about.titleHowTo"))}</h3><p data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("about.homepage"))}</p><p data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("about.register"))}</p><p data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("about.security"))}</p></div><br data-v-535d577b><div class="pt-4 msg min-h-99 max-w-sm mx-auto bg-yellow-400 border-none dark:bg-teal-700 rounded-2xl" data-v-535d577b><div class="prose" data-v-535d577b><h3 class="my-0 pb-2 my-0" data-v-535d577b>${serverRenderer.ssrInterpolate(vue.unref(t)("about.tech"))}</h3></div><ul class="prose list-disc list-inside" data-v-535d577b><h4 data-v-535d577b>Frontend</h4><li data-v-535d577b><span class="ml-3" data-v-535d577b> Vue 3 Composition API </span></li><li data-v-535d577b><span class="ml-3" data-v-535d577b> Pinia: Vue Store </span></li><li data-v-535d577b><span class="ml-3" data-v-535d577b> Windi CSS </span></li><li data-v-535d577b><span class="ml-3" data-v-535d577b> Typescript </span></li><h4 data-v-535d577b>Backend</h4><li data-v-535d577b><span class="ml-3" data-v-535d577b> ASP.NET Core minimal web API </span></li><li data-v-535d577b><span class="ml-3" data-v-535d577b> PostgreSQL </span></li><li data-v-535d577b><span class="ml-3" data-v-535d577b> Dapper: object\u2013relational mapping </span></li></ul></div></div>`);
    };
  }
});
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var about = /* @__PURE__ */ main._export_sfc(_sfc_main, [["__scopeId", "data-v-535d577b"]]);
exports["default"] = about;
