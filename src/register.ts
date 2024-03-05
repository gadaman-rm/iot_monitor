import { Container, injected } from 'brandi'
import { createApp, createDragListener, createKeyShortcatListener, createPanListener, createSvgContainer, createZoomListener } from './create'
import { App, DragListener, DrawListener, EditListener, EventEmitter, KeyShortcatListener, Listener, PanListener, RootContainer, SelectListener, Sidebar, SvgContainer, ZoomListener, ZoomPanListener } from './tokens'
import { ISidebar, IEditListener, IListener, ISelectListener, IZoomPanListener, IDrawListener, IEventEmitter } from './types'

export function registerBindings(container: Container) {
    container.bind(RootContainer).toConstant(container)

    container.bind(App).toInstance(createApp).inSingletonScope()
    container.bind(SvgContainer).toInstance(createSvgContainer).inSingletonScope()
    container.bind(ZoomListener).toInstance(createZoomListener).inSingletonScope()
    container.bind(PanListener).toInstance(createPanListener).inSingletonScope()
    container.bind(KeyShortcatListener).toInstance(createKeyShortcatListener).inSingletonScope()
    container.bind(DragListener).toInstance(createDragListener).inTransientScope()
    
    container.bind(ZoomPanListener).toInstance(IZoomPanListener).inSingletonScope()
    container.bind(SelectListener).toInstance(ISelectListener).inSingletonScope()
    container.bind(DrawListener).toInstance(IDrawListener).inSingletonScope()
    container.bind(EditListener).toInstance(IEditListener).inSingletonScope()
    container.bind(Listener).toInstance(IListener).inSingletonScope()
    container.bind(EventEmitter).toInstance(IEventEmitter).inTransientScope()

    // ********************** core components **********************
    container.bind(Sidebar).toInstance(ISidebar).inSingletonScope()
}

export function registerInjections() {
    injected(createApp, SvgContainer, Sidebar, Listener)
    injected(IZoomPanListener, SvgContainer, PanListener, ZoomListener, KeyShortcatListener)
    injected(createDragListener, SvgContainer)
    injected(ISelectListener, SvgContainer, EditListener, DragListener, EventEmitter)
    injected(IDrawListener, SvgContainer, EditListener, SelectListener, DragListener as any)
    injected(IEditListener, SvgContainer, EventEmitter)
    injected(IListener, SvgContainer, ZoomPanListener, SelectListener, EditListener)

    // ********************** core components **********************
    injected(ISidebar, EventEmitter, EditListener, DrawListener)
}
