import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                "sign-in": resolve(__dirname, 'sign-in.html'),
                "sign-up": resolve(__dirname, 'sign-up.html'),
                "app": resolve(__dirname, 'app.html'),
            }
        }
    }
})
