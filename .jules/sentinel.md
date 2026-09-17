## 2024-10-24 - [CRITICAL] Fix hardcoded Supabase keys
**Vulnerability:** Hardcoded Supabase URL and Anon Key were found as fallbacks in `src/services/supabase.ts` when environment variables were missing.
**Learning:** Hardcoding API keys or configuration secrets, even for testing or as fallbacks, exposes them directly to anyone with access to the source code (and potentially the bundle if shipped without the env vars).
**Prevention:** Never use hardcoded strings for secrets as fallbacks in code. Ensure they are always fetched from environment variables or secure configuration mechanisms. If missing, fail securely or gracefully fallback to safe/empty defaults depending on application requirements.
