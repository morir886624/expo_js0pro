## 2025-02-18 - Hardcoded Supabase Secrets in Config

**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallback values in `src/services/supabase.ts`. Although Anon Keys are meant to be public in clients, hardcoding them (especially project URLs) in source control can expose environments inappropriately and make rotating keys difficult, leading to potential unauthorized access or API abuse.
**Learning:** Developers often hardcode secrets as a quick fallback during development without realizing they will be committed. Relying exclusively on `.env` ensures keys are securely injected only at build or runtime.
**Prevention:** Always use environment variables (`process.env.EXPO_PUBLIC_*`) without hardcoded fallback strings. Implement a validation check or warning if the required environment variables are missing during app initialization.
