import { injected } from "brandi"
import { TOKENS } from "./tokens"
import { App } from "../app"
import { SvgContainer } from '@gadaman-rm/iot-widgets'
import { KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { Listener } from "../listener"
import { ZoomPanListener } from "../listener/ZoomPanListener"
import { SelectListener } from "../listener/SelectListener"

export function registerInjections() {
    injected(App, TOKENS.appProps.appRef, TOKENS.svgContainer, TOKENS.listener, TOKENS.appProps.widgets.optional)
    injected(SvgContainer, TOKENS.svgContainerProps.widgets.optional,  TOKENS.svgContainerProps.pan.optional, TOKENS.svgContainerProps.zoom.optional)
    injected(ZoomListener, TOKENS.zoomListenerProps.container.optional)
    injected(PanListener, TOKENS.panListenerProps.container.optional)
    injected(KeyShortcatListener, TOKENS.keyShortcatListenerProps.key, TOKENS.keyShortcatListenerProps.container.optional)
    injected(ZoomPanListener, TOKENS.svgContainer, TOKENS.panListener, TOKENS.zoomListener, TOKENS.keyShortcatListener)
    injected(SelectListener, TOKENS.svgContainer)
    injected(Listener, TOKENS.zoomPanListener, TOKENS.selectListener)
}
