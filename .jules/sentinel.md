## 2024-05-18 - Hardcoded Supabase API Keys Fallback
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallback values in `src/services/supabase.ts`.
**Learning:** Hardcoding API keys, even as fallbacks, exposes them in the compiled code/repository and poses a critical security risk.
**Prevention:** Always rely strictly on environment variables (`process.env.EXPO_PUBLIC_...`) for sensitive keys. If keys are missing, the application should fail securely (e.g., throw an error) rather than using hardcoded values.
