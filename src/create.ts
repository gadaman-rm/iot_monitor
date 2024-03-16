import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { App } from "./edit/app"
import { Listener } from "./edit/listener"
import { DragListener, KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { ContextMenu, Sidebar, Toolbar } from "./edit/components"
import { View } from "./view/view"
import { ViewListener } from "./view/ViewListener"

export function createApp(
	contextMenu: ContextMenu,
	svgContainer: SvgContainer,
	sidebar: Sidebar, 
	toolbar: Toolbar,
	listener: Listener
	) {
		toolbar.mode('edit')
	return new App(document.querySelector<HTMLDivElement>("#app")!, contextMenu, svgContainer, sidebar, toolbar, listener, [])
}

export function createView(
	svgContainer: SvgContainer,
	toolbar: Toolbar,
	viewListener: ViewListener,
	) {
		toolbar.mode('view')
	return new View(document.querySelector<HTMLDivElement>("#app")!, svgContainer, toolbar, viewListener, [])
}
export function createSvgContainer() { return new SvgContainer([], { x: 0, y: 0 }, 1) }
export function createZoomListener() { return new ZoomListener() }
export function createPanListener<T>() { return new PanListener<T>() }
export function createKeyShortcatListener() { return new KeyShortcatListener('Digit0') }
export function createDragListener<T>(svgContainer: SvgContainer) { return new DragListener<T>(svgContainer) }
