// router.ts
interface Route {
  path: string;
  componentName: string;
}

class Router {
  private routes: Route[] = [];

  public addRoute(path: string, componentName: string): void {
    this.routes.push({ path, componentName });
  }

  public init(): void {
    window.addEventListener("hashchange", this.handleRoute.bind(this));
    this.handleRoute();
  }

  private handleRoute(): void {
    console.log("route change");
    console.log(window.location.pathname);
    const path = window.location.pathname;
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      this.renderComponent(route.componentName);
    } else {
      console.log("Page not found");
    }
  }

  private renderComponent(componentName: string): void {
    const outlet = document.querySelector("router-outlet");
    if (outlet) {
      outlet.innerHTML = `<${componentName}></${componentName}>`;
    }
  }
}

export { Router };
