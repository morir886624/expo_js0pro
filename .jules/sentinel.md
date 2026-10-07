## 2023-10-27 - Hardcoded API Keys in Service Configuration
**Vulnerability:** Found hardcoded production Supabase API keys (URL and anon key) used as fallbacks in `src/services/supabase.ts`.
**Learning:** Fallback values in environment variable configuration can inadvertently expose sensitive credentials in the source code if not properly managed. It exposes the keys to anyone with access to the source code or bundle.
**Prevention:** Always use environment variables for sensitive keys and throw an error during initialization if required keys are missing, rather than providing fallback values in the source code.
