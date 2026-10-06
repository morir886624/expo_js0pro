## 2023-10-26 - Hardcoded API Keys in Source Code
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallbacks in `src/services/supabase.ts`.
**Learning:** Hardcoding secrets as fallbacks for missing environment variables defeats the purpose of using environment variables and exposes sensitive credentials in the source code.
**Prevention:** Enforce strict validation of required environment variables at application startup, throwing errors if they are not provided, rather than supplying hardcoded defaults.
