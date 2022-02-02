import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: { 'process.env.VITE_NAME': `"${process.env.VITE_NAME}"` },
});
