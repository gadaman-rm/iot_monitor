import './reset.scss'
import './app.scss'
import { Store } from './store'
import { Slider } from 'iot-widgets'
import { startTest } from './test'

const app = document.getElementById("app")! as HTMLDivElement
const store = new Store(app, [new Slider()])

startTest(store, 500)