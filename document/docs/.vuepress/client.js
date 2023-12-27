import { defineClientConfig } from '@vuepress/client'

import DeomDefaultNode from "./demo/basic/DeomDefaultNode.vue"
import DeomDefaultNodeFun from "./demo/basic/DeomDefaultNodeFun.vue"
import DeomDefaultNodeStyle from "./demo/basic/DeomDefaultNodeStyle.vue"
import DeomDefaultNodeStyleFun from "./demo/basic/DeomDefaultNodeStyleFun.vue"
import DeomCustomNode from "./demo/basic/DeomCustomNode.vue"
import DemoChangeSizeNode from "./demo/basic/DemoChangeSizeNode.vue"

import DemoCollapsed from "./demo/collapsed/DemoCollapsed.vue"
import DemoCollapsedKnot from "./demo/collapsed/DemoCollapsedKnot.vue"
import DemoCollapsedKnotCustom from "./demo/collapsed/DemoCollapsedKnotCustom.vue"
import DemoCollapsedStyle from "./demo/collapsed/DemoCollapsedStyle.vue"

import DemoZoom from "./demo/zoom/DemoZoom.vue"
import DemoLink from "./demo/link/DemoLink.vue"

import DemoDirection from "./demo/direction/DemoDirection.vue"



export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("DeomDefaultNode", DeomDefaultNode)
    app.component("DeomDefaultNodeFun", DeomDefaultNodeFun)
    app.component("DeomDefaultNodeStyle", DeomDefaultNodeStyle)
    app.component("DeomDefaultNodeStyleFun", DeomDefaultNodeStyleFun)
    app.component("DeomCustomNode", DeomCustomNode)
    app.component("DemoChangeSizeNode", DemoChangeSizeNode)

    app.component("DemoCollapsed", DemoCollapsed)
    app.component("DemoCollapsedStyle", DemoCollapsedStyle)
    app.component("DemoCollapsedKnot", DemoCollapsedKnot)
    app.component("DemoCollapsedKnotCustom", DemoCollapsedKnotCustom)

    app.component("DemoZoom", DemoZoom)
    app.component("DemoLink", DemoLink)
    app.component("DemoDirection", DemoDirection)
  },
  setup() {},
  rootComponents: [],
})