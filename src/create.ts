import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { App } from "./core/app"
import { Listener } from "./core/listener"
import { DragListener, KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { Sidebar } from "./core/components"

export function createApp(
	svgContainer: SvgContainer,
	sidebar: Sidebar, listener: Listener) {
	return new App(document.querySelector<HTMLDivElement>("#app")!, svgContainer, sidebar, listener, [])
}
export function createSvgContainer() { return new SvgContainer([], { x: 0, y: 0 }, 1) }
export function createZoomListener() { return new ZoomListener() }
export function createPanListener<T>() { return new PanListener<T>() }
export function createKeyShortcatListener() { return new KeyShortcatListener('Digit0') }
export function createDragListener<T>(svgContainer: SvgContainer) { return new DragListener<T>(svgContainer) }
