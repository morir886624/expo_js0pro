## 2026-10-22 - Avoid Hardcoded Fallbacks for Environment Variables
**Vulnerability:** Supabase URL and Anon Key had hardcoded fallback values in `src/services/supabase.ts` when environment variables were not set.
**Learning:** Hardcoding fallback values for sensitive environment variables like API keys, even for development purposes, is a critical security risk because they can easily leak into version control and ultimately production code.
**Prevention:** Always fail securely. If required environment variables are missing, the application should throw a clear error during startup rather than silently falling back to a potentially dangerous or leaked default value.
