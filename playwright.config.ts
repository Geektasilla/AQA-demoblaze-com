import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Папка, где агент будет искать и запускать тесты (включая ваш seed.spec.ts)
  testDir: './tests',
  
  // Запускать тесты в файлах параллельно?
  fullyParallel: true,
  
  // Количество ретраев (повторных запусков) при падении теста
  retries: 0,
  
  // Сколько воркеров использовать (ИИ-агентам проще работать в 1 воркер)
  workers: 1,
  
  // Формат отчетов (html-отчет откроется автоматически при падении в браузере)
  reporter: 'html',
  
  use: {
    // Базовый URL вашего сайта, чтобы в тестах писать просто page.goto('/')
    baseURL: 'https://www.demoblaze.com',

    // Собирать трассировку (скриншоты, логи, видео) при первом падении теста
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Настройка браузеров, в которых ИИ-агент может проверять тесты */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});