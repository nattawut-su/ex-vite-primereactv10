import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

// เพิ่มสองตัวนี้เพื่อให้ทำงานกับ Prettier
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config([
  // ไฟล์/โฟลเดอร์ที่อยากให้ ESLint มองข้าม
  globalIgnores(['dist', 'build', 'coverage']),

  // ฐานเดิมจาก Vite + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,

  // กำหนดภาษา/โกลบอล + เปิดกฎเสริม
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      // ผูก plugin ของ Prettier ให้ ESLint รันเช็คฟอร์แมตด้วย
      prettier: prettierPlugin,
    },
    rules: {
      // ค่ามาตรฐานฝั่ง Vite ชอบเพิ่ม rule นี้ (ให้ export เฉพาะ component)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ให้ Prettier เป็น error ถ้าฟอร์แมตไม่ตรง
      'prettier/prettier': 'error',
    },
  },

  // ต้องใส่ "ท้ายสุด" เพื่อปิดกฎ ESLint ที่ชนกับ Prettier
  eslintConfigPrettier,
]);
