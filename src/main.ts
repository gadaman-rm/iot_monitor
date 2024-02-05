import './reset.scss'
import './app.scss'
import { startTest } from './test'
import { container } from './di/container'
import { TOKENS } from './di/tokens'

const app = container.get(TOKENS.app)
startTest(app, 500)
