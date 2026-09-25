## 2025-09-25 - Remove Hardcoded Supabase Secrets
**Vulnerability:** Hardcoded fallback values for EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY existed in src/services/supabase.ts.
**Learning:** Hardcoded secrets often exist as fallbacks to prevent crashes during local development when .env files are missing, but this exposes them in source control.
**Prevention:** Remove hardcoded fallbacks and enforce fail-fast validation by throwing explicit errors when required environment variables are missing.
