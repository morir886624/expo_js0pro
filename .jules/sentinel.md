## 2026-11-04 - [CRITICAL] Hardcoded Fallback API Keys
**Vulnerability:** Found hardcoded fallback values for Supabase URL and Anon Key in `src/services/supabase.ts` when environment variables were missing.
**Learning:** Hardcoding fallback values for sensitive credentials, even if for development convenience, poses a significant risk if the code is deployed or shared, as it exposes the keys to anyone with access to the source code.
**Prevention:** Always rely strictly on environment variables for sensitive configuration. If required environment variables are not provided, the application should securely fail or throw an error indicating the missing configuration rather than falling back to hardcoded secrets.
