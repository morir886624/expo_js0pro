## 2026-10-27 - [CRITICAL] Fix hardcoded Supabase secrets
**Vulnerability:** Found hardcoded fallback values for `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `src/services/supabase.ts`.
**Learning:** Hardcoded fallback values were likely used during initial development but pose a major security risk as they expose backend endpoints and publishable keys. Environment variables should always be strictly required without hardcoded defaults for sensitive configurations.
**Prevention:** Avoid providing default values for sensitive keys. Fail fast by throwing an error if the required environment variables are absent.
