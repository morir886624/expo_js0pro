## 2024-05-18 - Hardcoded Supabase Credentials
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallback strings in `src/services/supabase.ts`.
**Learning:** Hardcoded credentials (even if they are anon keys) pose a security risk as they can be extracted by malicious actors and used maliciously if the key gets leaked in source control. Even if intended to be public, putting them in code limits key rotation capability and violates security best practices.
**Prevention:** Always load API keys and URLs exclusively from environment variables. Do not provide hardcoded string fallbacks in the source code.
