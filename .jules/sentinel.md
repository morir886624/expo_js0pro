## 2024-10-21 - Hardcoded Supabase Keys in Config
**Vulnerability:** Supabase URL and Anonymous Key were hardcoded as fallback values in `src/services/supabase.ts`.
**Learning:** Fallbacks for environment variables in source code negate the security benefits of using environment variables, as the sensitive values still end up committed to the repository and potentially shipped in client builds.
**Prevention:** Always fail fast and securely (throw an error) when required environment variables for security-sensitive configurations are missing, rather than providing inline defaults.
