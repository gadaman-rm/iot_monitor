import { createContainer } from "brandi"
import { registerBindings, registerInjections } from "./register"

export const container = createContainer()
export function createChildContainer() {
  return createContainer().extend(container)
}

registerInjections()
registerBindings(container)
