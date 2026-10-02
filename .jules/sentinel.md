## 2024-05-24 - [CRITICAL] Fix hardcoded API key
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallback values in `src/services/supabase.ts`.
**Learning:** Hardcoded credentials should never be present in the source code as they can be easily extracted and abused by attackers.
**Prevention:** Always load sensitive configuration variables from secure environment variables using `process.env`. Avoid using fallback strings for sensitive values in production code.