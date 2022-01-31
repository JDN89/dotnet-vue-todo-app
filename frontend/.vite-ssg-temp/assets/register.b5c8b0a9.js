"use strict";
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueI18n = require("vue-i18n");
var vueRouter = require("vue-router");
var serverRenderer = require("vue/server-renderer");
var main = require("../main.js");
var veeValidate = require("vee-validate");
var yup = require("yup");
require("vue-next-masonry");
require("nprogress");
require("pinia");
require("axios");
require("vite-ssg");
require("@vueuse/core");
require("@vueuse/head");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    const userStore = main.useUserStore();
    const schema = yup__namespace.object({
      email: yup__namespace.string().required().email(),
      password: yup__namespace.string().required().min(8),
      confirmPassword: yup__namespace.string().oneOf([yup__namespace.ref("password"), null], "Confirmed password doesn't match").required()
    });
    const { handleSubmit, values } = veeValidate.useForm({
      validationSchema: schema
    });
    vue.watch(values, (newFormData) => {
      userStore.$patch({ createdUserData: newFormData });
    });
    handleSubmit(userStore.registerUser);
    const router = vueRouter.useRouter();
    vue.onUpdated(() => {
      if (userStore.getRegistrationFormIsVisible == false) {
        setTimeout(() => {
          router.replace({
            name: "login"
          });
        }, 2e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "mx-auto min-w-xs max-w-xs py-6 prose" }, _attrs))}><h2 class>${serverRenderer.ssrInterpolate(vue.unref(t)("page.register"))}</h2>`);
      if (vue.unref(userStore).getRegistrationFormIsVisible) {
        _push(`<form class="flex flex-col"><div class="flex flex-col">`);
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.Field), {
          name: "email",
          type: "email",
          placeholder: "Email",
          class: "field"
        }, null, _parent));
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.ErrorMessage), {
          name: "email",
          class: "errorMessage"
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.Field), {
          name: "password",
          type: "password",
          placeholder: vue.unref(t)("text.password"),
          class: "field"
        }, null, _parent));
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.ErrorMessage), {
          name: "password",
          class: "errorMessage"
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.Field), {
          name: "confirmPassword",
          type: "password",
          placeholder: vue.unref(t)("text.confirmPassword"),
          class: "field"
        }, null, _parent));
        _push(serverRenderer.ssrRenderComponent(vue.unref(veeValidate.ErrorMessage), {
          name: "confirmPassword",
          class: "errorMessage"
        }, null, _parent));
        _push(`</div><button type="submit" class="mt-2 hover w-19 bg-red-900 dark:bg-teal-700 dark:text-light-50 text-yellow-300 rounded-2xl mx-auto">${serverRenderer.ssrInterpolate(vue.unref(t)("button.submit"))}</button></form>`);
      } else {
        _push(`<p to="login" w:text="center 2xl  yellow-300 dark:light-50" w:bg="red-900 dark:teal-700" class="font-bold rounded-2xl text-yellow-300 mx-auto mx-1">${serverRenderer.ssrInterpolate(vue.unref(t)("text.registrationSuccessful"))}</p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
exports["default"] = _sfc_main;
