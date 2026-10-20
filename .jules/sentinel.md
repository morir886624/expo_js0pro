## 2024-05-01 - Remove Hardcoded Supabase Secrets
**Vulnerability:** Hardcoded fallback values for Supabase URL and anonymous key were present in the source code.
**Learning:** Hardcoded secrets, even as fallbacks for missing environment variables, can easily leak into version control and be exposed to attackers, giving unauthorized access to backend services.
**Prevention:** Always rely strictly on environment variables for sensitive configuration and implement secure "fail-fast" mechanisms by throwing errors when required variables are missing.
