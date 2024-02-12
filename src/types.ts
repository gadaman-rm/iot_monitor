import { MoveDragInit } from "./core/listener/SelectListener"
import { createApp, createDragListener, createKeyShortcatListener, createPanListener, createSvgContainer, createZoomListener } from "./create"

export type CreateAppFn = ReturnType<typeof createApp>
export type CreateSvgContainerFn = ReturnType<typeof createSvgContainer>
export type CreateZoomListenerFn = ReturnType<typeof createZoomListener>
export type CreatePanListenerFn = ReturnType<typeof createPanListener<{ clientX: number, clientY: number }>>
export type CreateKeyShortcatListenerFn = ReturnType<typeof createKeyShortcatListener>
export type CreateDragListenerFn = ReturnType<typeof createDragListener<MoveDragInit>>

export { Listener as IListener } from './core/listener'
export { EditListener as IEditListener } from './core/listener/EditListener'
export { SelectListener as ISelectListener } from './core/listener/SelectListener'
export { ZoomPanListener as IZoomPanListener } from './core/listener/ZoomPanListener'
export {
    DragListener as IDragListener,
    KeyShortcatListener as IKeyShortcatListener,
    PanListener as IPanListener,
    ZoomListener as IZoomListener
} from '@gadaman-rm/iot-widgets/event'
