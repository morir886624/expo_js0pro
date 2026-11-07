## 2025-02-28 - Hardcoded Supabase Secrets in Source Code
**Vulnerability:** Hardcoded Supabase API URL and Anon Key fallbacks were found in `src/services/supabase.ts`.
**Learning:** Fallbacks were used for convenience if environment variables were missing, but they exposed potentially sensitive access configurations directly in the codebase.
**Prevention:** Instead of providing hardcoded fallbacks, throw an explicit error at runtime if required secrets (like `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`) are missing, to fail securely and ensure developers manage their own environment variables.
