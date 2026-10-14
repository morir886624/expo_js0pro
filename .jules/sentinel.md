## 2024-06-25 - Hardcoded Supabase Secrets
**Vulnerability:** Found hardcoded fallback values for Supabase URL and Anon Key (`EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`) in `src/services/supabase.ts`.
**Learning:** Hardcoding fallbacks in services defeats the purpose of environment variables and risks committing sensitive keys into version control or leaking them in builds.
**Prevention:** Always rely strictly on environment variables (`process.env.EXPO_PUBLIC_*` in Expo) for secrets and throw an initialization error or provide a clear warning if they are missing, rather than using hardcoded fallbacks.
