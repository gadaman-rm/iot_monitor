import { Container } from 'brandi'
import { registerInjections } from './injections'
import { TOKENS } from './tokens'
import { SvgContainer } from '@gadaman-rm/iot-widgets'
import { App } from '../app'
import { KeyShortcatListener, PanListener, ZoomListener } from '@gadaman-rm/iot-widgets/event'
import { ZoomPanListener } from '../listener/ZoomPanListener'
import { Listener } from '../listener'
import { Context } from './context'
import { SelectListener } from '../listener/SelectListener'

export const container = new Container()
export const createChildContainer = () => { return new Container().extend(container) }

registerInjections()

container.bind(TOKENS.Root).toConstant(container)

container.bind(TOKENS.appProps.appRef).toConstant(document.querySelector<HTMLDivElement>("#app")!)
container.bind(TOKENS.appProps.widgets).toConstant([])
container.bind(TOKENS.app).toInstance(App).inSingletonScope()
container.bind(TOKENS.context).toInstance(Context).inSingletonScope()

// container.bind(TOKENS.svgContainerProps.pan).toConstant({ x: 0, y: 0 })
// container.bind(TOKENS.svgContainerProps.zoom).toConstant(1)
container.bind(TOKENS.svgContainer).toInstance(SvgContainer).inSingletonScope()

container.bind(TOKENS.zoomListenerProps.container)
container.bind(TOKENS.zoomListener).toInstance(ZoomListener).inSingletonScope()

container.bind(TOKENS.panListenerProps.container)
container.bind(TOKENS.panListener).toInstance(PanListener).inSingletonScope()

container.bind(TOKENS.keyShortcatListenerProps.container)
container.bind(TOKENS.keyShortcatListenerProps.key).toConstant('Digit0')
container.bind(TOKENS.keyShortcatListener).toInstance(KeyShortcatListener).inSingletonScope()

container.bind(TOKENS.zoomPanListener).toInstance(ZoomPanListener).inSingletonScope()
container.bind(TOKENS.selectListener).toInstance(SelectListener).inSingletonScope()
container.bind(TOKENS.listener).toInstance(Listener).inSingletonScope()

