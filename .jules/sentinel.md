## 2026-11-01 - [Hardcoded Supabase Secrets]
**Vulnerability:** [Hardcoded Supabase URL and Anon Key found as fallback values in `src/services/supabase.ts`]
**Learning:** [Fallback values for environment variables can accidentally expose critical infrastructure credentials if the actual environment variables are missing.]
**Prevention:** [Always fail securely (throw an error) when required environment variables are missing instead of using insecure fallback values in code.]
