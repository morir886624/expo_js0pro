## 2024-10-25 - Hardcoded Supabase Credentials
**Vulnerability:** Found hardcoded `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `src/services/supabase.ts`.
**Learning:** Developers sometimes hardcode secrets during development as fallbacks when environment variables are missing, which can accidentally be committed to version control and exposed in the build.
**Prevention:** Always use environment variables for sensitive configuration. If a fallback is necessary to prevent compilation errors, use a clearly invalid string (e.g., `'MISSING_API_KEY'`) and throw an error or log a warning if the required environment variable is missing at runtime.
