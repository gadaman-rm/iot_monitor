import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { App } from "./edit/app"
import { Listener } from "./edit/listener"
import { DragListener, KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { ContextMenu, Sidebar, Toolbar } from "./edit/components"

export function createApp(
	contextMenu: ContextMenu,
	svgContainer: SvgContainer,
	sidebar: Sidebar, 
	toolbar: Toolbar,
	listener: Listener
	) {
	return new App(document.querySelector<HTMLDivElement>("#app")!, contextMenu, svgContainer, sidebar, toolbar, listener, [])
}
export function createSvgContainer() { return new SvgContainer([], { x: 0, y: 0 }, 1) }
export function createZoomListener() { return new ZoomListener() }
export function createPanListener<T>() { return new PanListener<T>() }
export function createKeyShortcatListener() { return new KeyShortcatListener('Digit0') }
export function createDragListener<T>(svgContainer: SvgContainer) { return new DragListener<T>(svgContainer) }
