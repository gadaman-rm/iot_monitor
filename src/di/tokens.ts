import { Container, token } from 'brandi'
import { App } from '../app'
import { SvgContainer } from '@gadaman-rm/iot-widgets'
import { Point } from '@gadaman-rm/iot-widgets/math'
import { IWidgets } from '@gadaman-rm/iot-widgets'
import { KeyShortcatListener, PanListener, ZoomListener } from '@gadaman-rm/iot-widgets/event'
import { Listener } from '../listener'
import { ZoomPanListener } from '../listener/ZoomPanListener'
import { Context } from './context'
import { SelectListener } from '../listener/SelectListener'

export const TOKENS = {
    Root: token<Container>('root-container'),

    app: token<App>('app'),
    context: token<Context>('context'),
    appProps: {
        appRef: token<HTMLDivElement>('app: appRef'),
        widgets: token<IWidgets[]>('app: widgets'),
    },

    svgContainer: token<SvgContainer>('svgContainer'),
    svgContainerProps: {
        widgets: token<IWidgets[]>('svgContainer: widgets'),
        zoom: token<number>('svgContainer: zoom'),
        pan: token<Point>('svgContainer: pan'),
    },

    zoomListener: token<ZoomListener>('zoomListener'),
    zoomListenerProps: {
        container: token<HTMLElement | Document>('zoomListener: container'),
    },

    panListener: token<PanListener<{ clientX: number, clientY: number }>>('panListener'),
    panListenerProps: {
        container: token<HTMLElement | Document>('panListener: container'),
    },
    
    keyShortcatListener: token<KeyShortcatListener>('keyShortcatListener'),
    keyShortcatListenerProps: {
        key: token<string>('keyShortcatListener: key'),
        container: token<HTMLElement | Document>('keyShortcatListener: container'),
    },
    zoomPanListener: token<ZoomPanListener>('zoomPanListener'),
    selectListener: token<SelectListener>('selectListener'),
    listener: token<Listener>('listener'),
}
