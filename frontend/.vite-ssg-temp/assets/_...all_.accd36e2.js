"use strict";
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueI18n = require("vue-i18n");
var serverRenderer = require("vue/server-renderer");
var block0 = {};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>${serverRenderer.ssrInterpolate(vue.unref(t)("not-found"))}</div>`);
    };
  }
});
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/[...all}.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
exports["default"] = _sfc_main;
