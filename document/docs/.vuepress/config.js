import { defineUserConfig } from "vuepress";
import { defaultTheme } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
  base: "/vue-d3-tree/",
  lang: "zh-CN",
  title: "Vue D3 Tree",
  description: "Vue Tree Chart By D3",
  theme: defaultTheme({
    sidebar: "auto",
    repo: 'astrongfish/vue-d3-tree',
  }),
  plugins: [registerComponentsPlugin({})],
});
