## 2024-10-17 - Hardcoded API Keys in Config
**Vulnerability:** Found hardcoded fallback values for Supabase API URL and Anon Key in `src/services/supabase.ts` configuration.
**Learning:** Hardcoded fallback values can expose production keys if environment variables fail to load properly or are absent. This poses a severe risk of data exposure or account takeover if the code is public or accessible.
**Prevention:** Remove fallback hardcoded secret keys. Require environment variables, using validation or throwing errors at startup to fail securely if these keys are missing.
