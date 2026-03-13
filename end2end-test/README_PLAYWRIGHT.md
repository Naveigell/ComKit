# End-to-End Testing dengan Playwright

## Deskripsi

TestAlurPengguna.js adalah test automation script untuk menguji skenario lengkap alur pengguna di aplikasi ComKit, mencakup:

1. **Fase 1**: Registrasi User1
2. **Fase 2**: Login User1 dan verifikasi item kosong
3. **Fase 3**: Membuat 30 items
4. **Fase 4**: Registrasi User2 dan explorasi items
5. **Fase 5**: Navigasi pagination halaman 2
6. **Fase 6**: Request item dari User1
7. **Fase 7**: Login User1 dan lihat incoming request
8. **Fase 8**: Approve request

## Persyaratan

- Node.js 18+ 
- Docker (untuk running backend)
- Playwright (akan diinstall via npm)

## Setup

### 1. Install Dependencies

```bash
# Install Playwright di direktori testing
cd sourcecode/end2end-test
npm install -D @playwright/test
```

### 2. Setup Backend dan Frontend

```bash
# Ensure Docker containers running
docker-compose up -d

# Wait for backend healthy check (30-40 seconds)
# Check status: docker-compose ps

# Frontend akan auto-start on http://localhost:8001
```

### 3. Verifikasi URLs

- Backend API: `http://localhost:8000`
- Frontend UI: `http://localhost:8001`

## Menjalankan Tests

### Run All Tests

```bash
cd sourcecode/end2end-test
npx playwright test
```

### Run ke Server yang Sudah Berjalan

Gunakan mode ini jika frontend/backend sudah Anda jalankan manual, agar Playwright tidak mencoba start `npm run dev` lagi.

```bash
cd sourcecode/end2end-test

# Semua test tanpa start webServer dari Playwright
npm run test:running-server

# Atau test file tertentu
PLAYWRIGHT_SKIP_WEB_SERVER=1 npx playwright test TestAlurPengguna.js --project=chromium
```

### Run Specific Test File

```bash
npx playwright test TestAlurPengguna.js
```

### Run Specific Phase/Test

```bash
cd sourcecode/end2end-test

# Menjalankan hanya Fase 1 (Registrasi)
npx playwright test -g "Fase 1: User1 Registrasi dan Setup"

# Menjalankan hanya test item creation
npx playwright test -g "Fase 3"
```

### Run dengan Debug Mode

```bash
cd sourcecode/end2end-test

# Interactive mode dengan UI
npx playwright test --ui

# Headed mode (visible browser)
npx playwright test --headed

# Single test dengan debug
npx playwright test TestAlurPengguna.js -g "Fase 1" --debug
```

### Run pada Browser Spesifik

```bash
cd sourcecode/end2end-test

# Hanya Chrome
npx playwright test --project=chromium

# Hanya Firefox
npx playwright test --project=firefox

# Hanya Safari
npx playwright test --project=webkit

# Mobile testing
npx playwright test --project="Mobile Chrome"
```

## Output dan Reporting

### HTML Report

```bash
cd sourcecode/end2end-test

# Generate HTML report
npx playwright test

# View report
npx playwright show-report
```

Reports akan tersimpan di `playwright-report/` directory.

### Junit Report

Test results akan tersimpan di `test-results/junit.xml` untuk CI/CD integration.

## Environment Variables

Anda dapat mengatur variabel berikut:

```bash
cd sourcecode/end2end-test

# Custom base URL
BASE_URL=http://localhost:8001 npx playwright test

# Debug mode untuk semua tests
DEBUG=pw:api npx playwright test
```

## Test Data

Test script secara otomatis generate data unik untuk setiap run:

```javascript
const user1 = {
  name: 'User Satu',
  username: 'user1_' + Date.now(),  // Unique per run
  address: 'Jl. Merdeka No. 1, Jakarta Pusat',
  password: 'Password123!'
};
```

## Troubleshooting

### Test Timeout

Jika test timeout:
- Pastikan backend healthy: `docker-compose ps`
- Increase timeout di config: `timeout: 60000`
- Check if UI is loading: `http://localhost:8001`

### Selector Not Found

Jika selector error:
- Verify UI element exists pada actual UI
- Check if class names/IDs sesuai dengan aplikasi
- Update selector di test file

### Item Creation Fails

- Verify form fields match dengan actual form di register.vue/mypage component
- Check modal muncul setelah klik "Tambah Item Baru"
- Add wait time: `await page.waitForTimeout(1000)`

### Database State

Jika database penuh atau error:
```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Wait for healthy status
```

## Performance Tips

1. **Parallelisasi tests** (default): Workers = true
2. **Single worker untuk debugging**: `--workers=1`
3. **Skip video recording** untuk speed: Remove `video` line di config
4. **Reuse context** untuk faster execution

## Extending Tests

### Tambah Test Baru

```javascript
test('Fase 9: Custom Test', async ({ page }) => {
  await page.goto(`${BASE_URL}/dashboard`);
  // Your test steps
});
```

### Menggunakan Fixtures

```javascript
test.beforeEach(async ({ page }) => {
  // Setup sebelum test
  await page.goto(`${BASE_URL}/login`);
});

test.afterEach(async ({ page }) => {
  // Cleanup setelah test  
  await page.context().clearCookies();
});
```

## CI/CD Integration

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
        working-directory: sourcecode/end2end-test
      - run: docker-compose up -d
        working-directory: sourcecode
      - run: npx playwright test
        working-directory: sourcecode/end2end-test
```

## References

- [Playwright Documentation](https://playwright.dev)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [Debugging](https://playwright.dev/docs/debug)
- [Best Practices](https://playwright.dev/docs/best-practices)
