## 2024-05-18 - Hardcoded Supabase Credentials
**Vulnerability:** Found hardcoded SUPABASE_URL and SUPABASE_ANON_KEY in src/services/supabase.ts fallback values.
**Learning:** Fallback values for environment variables in source code can expose sensitive configuration in version control and client bundles. Even if they are just anon keys, they shouldn't be hardcoded into the frontend without env handling.
**Prevention:** Remove fallback hardcoded strings for credentials. Rely on strict environment variable checks.
