import './reset.scss'
import './app.scss'
import { startTest } from './test'
import { container } from '../container'
import { App } from '../tokens'

const app = container.get(App)
startTest(app, 500)
