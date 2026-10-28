## 2026-10-28 - Hardcoded Supabase Secrets in Config
**Vulnerability:** Found hardcoded fallback values for SUPABASE_URL and SUPABASE_ANON_KEY in `src/services/supabase.ts` which would be used if environment variables were missing.
**Learning:** Hardcoded fallbacks undermine the environment variable configuration, creating a risk that development/production secrets could leak if `.env` fails to load or the code is shared. Applications should fail securely rather than silently falling back to potentially insecure defaults.
**Prevention:** Always validate that required environment variables are present and throw errors if missing to enforce a fail-secure architecture.
