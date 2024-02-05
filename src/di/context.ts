import { App } from "../app";
import { Listener } from "../listener";

export class Context {
    constructor(public app: App, public listener: Listener) {}
}