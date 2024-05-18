import { SvgContainer } from "@gadaco/iot-widgets"
import { App } from "./edit/app"
import { Listener } from "./edit/listener"
import {
  DragListener,
  KeyShortcatListener,
  PanListener,
  ZoomListener,
} from "@gadaco/iot-widgets/event"
import { Sidebar, Toolbar, ToolbarControl } from "./edit/components"
import { View } from "./view/view"
import { ViewListener } from "./view/ViewListener"
import { MenuJson } from "@gadaco/iot-widgets/components"

export function createApp(
  menuJson: MenuJson,
  svgContainer: SvgContainer,
  sidebar: Sidebar,
  toolbar: Toolbar,
  toolbarControl: ToolbarControl,
  listener: Listener,
) {
  toolbarControl.mode("edit")
  return new App(
    document.querySelector<HTMLDivElement>("#app")!,
    menuJson,
    svgContainer,
    sidebar,
    toolbar,
    toolbarControl,
    listener,
    [],
  )
}

export function createView(
  svgContainer: SvgContainer,
  toolbarControl: ToolbarControl,
  viewListener: ViewListener,
) {
  toolbarControl.mode("view")
  return new View(
    document.querySelector<HTMLDivElement>("#app")!,
    svgContainer,
    toolbarControl,
    viewListener,
    [],
  )
}
export function createSvgContainer() {
  return new SvgContainer([], { x: 0, y: 0 }, 1)
}
export function createZoomListener() {
  return new ZoomListener()
}
export function createPanListener<T>() {
  return new PanListener<T>()
}
export function createKeyShortcatListener() {
  return new KeyShortcatListener("Digit0")
}
export function createDragListener<T>(svgContainer: SvgContainer) {
  return new DragListener<T>(svgContainer)
}
