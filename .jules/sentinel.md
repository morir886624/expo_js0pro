## 2025-01-20 - Hardcoded Supabase Credentials
**Vulnerability:** Supabase URL and anonymous key were hardcoded in `src/services/supabase.ts` as fallback values.
**Learning:** Even as fallbacks, hardcoding secrets in client-side code exposes them to anyone analyzing the bundled application, which could lead to unauthorized access to the database.
**Prevention:** Always rely strictly on environment variables (`process.env`) without fallback strings for sensitive configurations like API keys and URLs.
