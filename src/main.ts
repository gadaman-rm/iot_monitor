import './reset.scss'
import './app.scss'
import { Store } from './store'
import { Container, Slider } from 'iot-widgets'
import { startTest } from './test'

const app = document.querySelector<HTMLDivElement>("#app")!
const containerMain = document.createElement('main')
const container = new Container({x: 200, y: 200}, 1.4)
container.appendChild(containerMain)
const store = new Store(app, container, [new Slider()])

startTest(store, 500)