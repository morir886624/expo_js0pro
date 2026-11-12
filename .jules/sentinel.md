## 2025-01-20 - Hardcoded Supabase Credentials
**Vulnerability:** The `src/services/supabase.ts` file had fallback values for `SUPABASE_URL` and `SUPABASE_ANON_KEY`. If environment variables were missing, the app silently fell back to these potentially exposed keys instead of failing.
**Learning:** Hardcoding credentials as fallbacks completely bypasses the security benefits of using environment variables, potentially leaking sensitive access keys into source control or compiled application bundles.
**Prevention:** Always fail securely by throwing descriptive errors when critical environment variables are missing, rather than providing insecure default values.
