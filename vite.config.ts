import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                "pages/signin": resolve(__dirname, 'pages/signin.html'),
                "pages/signup": resolve(__dirname, 'pages/signup.html'),
                "app": resolve(__dirname, 'app.html'),
            }
        }
    },
    server: {
        proxy: {
            '/api/signin': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/signup': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/verify': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/access': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/signout': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },

            '/api/load_all_plans': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/load_plan': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/choose_plan': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/update_plan': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            },
            '/api/save_plan': {
                target: 'https://coolpanel.ir:2525/',
                changeOrigin: true,
                methods: ['POST']
            }
        },
    },
})
