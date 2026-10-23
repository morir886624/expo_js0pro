## 2026-10-23 - Hardcoded Credentials Removed
**Vulnerability:** Found hardcoded fallback secrets for `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `src/services/supabase.ts`.
**Learning:** Even though they were fallbacks, hardcoding any keys can lead to unintended exposure, especially in version-controlled client-side applications.
**Prevention:** Ensured configuration always fails fast by checking required `EXPO_PUBLIC_` environment variables and throwing an error if absent, avoiding fallback to insecure constants.