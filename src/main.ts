import './reset.scss'
import './app.scss'
import { Store } from './store'
import { Container, Slider } from '@gadaman-rm/iot-widgets'
import { startTest } from './test'

const app = document.querySelector<HTMLDivElement>("#app")!
const containerMain = document.createElement('main')
const container = new Container({ x: 0, y: 0 }, 1)
container.appendChild(containerMain)
const store = new Store(app, container, [new Slider("1", 700, 70, 0, 0)])

startTest(store, 500)
