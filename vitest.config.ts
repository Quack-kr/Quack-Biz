/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/.eslintrc.cjs',
        '**/eslintrc.cjs',
        '.eslintrc.cjs',
        'eslintrc.cjs',
        'src/styles/**',
        'src/types/**',
        '**/index.ts'
      ],
      include: ['src/guard/**/*.{ts,tsx}'],
      // include: ['src/**/*.{ts,tsx}'], // TODO: 점진적으로 테스트 커버리지 올리기
      all: true
    },
    // 에러 바운더리 테스트를 위한 설정
    silent: false,
    reporters: ['verbose'],
    // unhandled error 처리
    onConsoleLog: (log) => {
      // 테스트 관련 에러 로그는 무시
      if (
        log.includes('Test Error') ||
        log.includes('Integration Test Error')
      ) {
        return false
      }
      return true
    }
  }
})
