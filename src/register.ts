import { Container, injected } from 'brandi'
import { createApp, createDragListener, createKeyShortcatListener, createPanListener, createSvgContainer, createZoomListener } from './create'
import { App, DragListener, EditListener, KeyShortcatListener, Listener, PanListener, RootContainer, SelectListener, SvgContainer, ZoomListener, ZoomPanListener } from './tokens'
import { IEditListener, IListener, ISelectListener, IZoomPanListener } from './types'

export function registerBindings(container: Container) {
    container.bind(RootContainer).toConstant(container)

    container.bind(App).toInstance(createApp).inSingletonScope()
    container.bind(SvgContainer).toInstance(createSvgContainer).inSingletonScope()
    container.bind(ZoomListener).toInstance(createZoomListener).inSingletonScope()
    container.bind(PanListener).toInstance(createPanListener).inSingletonScope()
    container.bind(KeyShortcatListener).toInstance(createKeyShortcatListener).inSingletonScope()
    container.bind(DragListener).toInstance(createDragListener).inSingletonScope()
    
    container.bind(ZoomPanListener).toInstance(IZoomPanListener).inSingletonScope()
    container.bind(SelectListener).toInstance(ISelectListener).inSingletonScope()
    container.bind(EditListener).toInstance(IEditListener).inSingletonScope()
    container.bind(Listener).toInstance(IListener).inSingletonScope()
}

export function registerInjections() {
    injected(createApp, SvgContainer, Listener)
    injected(IZoomPanListener, SvgContainer, PanListener, ZoomListener, KeyShortcatListener)
    injected(ISelectListener, SvgContainer, DragListener)
    injected(IEditListener, SvgContainer)
    injected(IListener, SvgContainer, ZoomPanListener, SelectListener, EditListener)
}
