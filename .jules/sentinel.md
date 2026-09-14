## 2026-09-14 - [Remove hardcoded Supabase secrets]
**Vulnerability:** Hardcoded Supabase URL and Anon Key found in src/services/supabase.ts fallbacks.
**Learning:** Hardcoding credentials as fallbacks for environment variables exposes them in source control.
**Prevention:** Always use environment variables for secrets and throw an error or handle gracefully if they are missing, rather than providing real keys as defaults.
