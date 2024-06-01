import { resolve } from "path"
import { defineConfig } from "vite"

const BASE_URL = "http://coolpanel.ir:2525"
// const BASE_URL = "http://193.151.149.180:2525"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        signin: resolve(__dirname, "signin.html"),
        signup: resolve(__dirname, "signup.html"),
        edit: resolve(__dirname, "edit.html"),
        view: resolve(__dirname, "view.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api/signin": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/signup": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/verify": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/access": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/signout": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },

      "/api/load_all_plans": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/load_plan": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/choose_plan": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/update_plan": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/save_plan": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
      "/api/delete_plan": {
        target: BASE_URL,
        changeOrigin: true,
        methods: ["POST"],
      },
    },
  },
})
