## 2024-05-18 - Remove Hardcoded Supabase Secrets
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallbacks in `src/services/supabase.ts`.
**Learning:** Hardcoded fallbacks for environment variables often leak sensitive keys directly into source control, exposing access to backend systems.
**Prevention:** Only configure environment variable fallbacks with dummy placeholders (or throw runtime warnings/errors) instead of real live credentials.
