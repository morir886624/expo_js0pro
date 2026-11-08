## 2024-05-24 - [CRITICAL] Hardcoded API Keys
**Vulnerability:** Supabase URL and Anon Key fallbacks were hardcoded in `src/services/supabase.ts`.
**Learning:** Expo env vars shouldn't have hardcoded fallbacks in production files as they can be bundled into the app, exposing secrets.
**Prevention:** Throw an error if required environment variables are missing instead of using fallbacks.
