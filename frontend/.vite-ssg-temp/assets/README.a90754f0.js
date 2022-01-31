"use strict";
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var serverRenderer = require("vue/server-renderer");
var head = require("@vueuse/head");
const meta = [];
const _sfc_main = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "meta": [] };
    expose({ frontmatter });
    const head$1 = { "meta": [] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "prose prose-sm m-auto text-left" }, _attrs))}><h2>File-based Routing</h2><p>Routes will be auto-generated for Vue files in this dir with the same file structure. Check out <a href="https://github.com/hannoeru/vite-plugin-pages" target="_blank" rel="noopener"><code>vite-plugin-pages</code></a> for more details.</p><h3>Path Aliasing</h3><p><code>~/</code> is aliased to <code>./src/</code> folder.</p><p>For example, instead of having</p><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> isDark <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../../../../composables&#39;</span>
</code></pre><p>now, you can use</p><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> isDark <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;~/composables&#39;</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/README.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
exports["default"] = _sfc_main;
exports.meta = meta;
