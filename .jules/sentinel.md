## 2025-03-05 - Hardcoded Supabase Secrets in Source Code
**Vulnerability:** Found hardcoded fallback values for `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `src/services/supabase.ts`. This could leak project credentials if the environment variables are not correctly set, or if the code is pushed to a public repository.
**Learning:** These values were likely added as fallbacks to prevent runtime errors during local development when `.env` is missing, prioritizing development convenience over secure configuration.
**Prevention:** Never use hardcoded secrets or production URLs as fallbacks. Instead, throw a clear error to fail securely if required environment variables are not provided, forcing developers to configure their `.env` files correctly.
