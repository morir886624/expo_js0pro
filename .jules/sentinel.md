## 2024-05-24 - Hardcoded Supabase ANON KEY
**Vulnerability:** Found hardcoded fallback values for EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in `src/services/supabase.ts`.
**Learning:** Hardcoding credentials as fallbacks for environment variables is a critical security vulnerability, as these values are compiled into the application bundle and can be extracted.
**Prevention:** Remove hardcoded fallback values. Use environment variables strictly. Application should fail gracefully or prompt if environment variables are not provided.
