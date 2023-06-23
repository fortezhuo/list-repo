import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { join } from 'path';

export default defineConfig(() => {
  const env = loadEnv('', process.cwd(), '')
  const base = env.VITE_PATH

  return {
    base,
    server: {
      open: true,
    },
    plugins: [react()],
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        components: join(__dirname, `src/components`),
        hooks: join(__dirname, "src/hooks"),
        lib: join(__dirname, "src/lib"),
        services: join(__dirname, "src/services"),
      },
    },
  }
})
