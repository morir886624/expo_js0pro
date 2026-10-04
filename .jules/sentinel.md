## 2026-10-04 - Remove Hardcoded API Keys
**Vulnerability:** Hardcoded API keys (Supabase URL and Anon Key) were found as fallbacks in `src/services/supabase.ts`.
**Learning:** These fallback keys could be extracted from the source code or version control, potentially leading to unauthorized access to the Supabase backend.
**Prevention:** Always rely on environment variables (`process.env.EXPO_PUBLIC_SUPABASE_URL`, etc.) for sensitive configuration values. Do not provide raw string fallbacks in the code.
