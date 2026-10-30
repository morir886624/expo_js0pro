## 2024-05-18 - Hardcoded Supabase Secrets in Config
**Vulnerability:** Supabase URL and ANON_KEY were hardcoded as fallback values in `src/services/supabase.ts`.
**Learning:** Hardcoded fallback values for environment variables bypass the security intention of environment variables and can leak sensitive credentials if the environment is misconfigured.
**Prevention:** Always enforce the presence of required environment variables for sensitive credentials by throwing an error rather than silently falling back to a default value.
