## 2026-10-15 - Remove hardcoded API key from config
**Vulnerability:** Found hardcoded SUPABASE_URL and SUPABASE_ANON_KEY with fallback values in src/services/supabase.ts.
**Learning:** Hardcoded secrets should not exist in code, even if they are 'anon' keys, as they can be exploited if the app logic assumes they are secure or if they give too much access. The codebase should solely rely on environment variables.
**Prevention:** Remove fallback values for environment variables. Ensure the app throws an error or fails gracefully if keys are missing rather than providing insecure defaults.
