## 2025-05-18 - Hardcoded Supabase Credentials
**Vulnerability:** Found hardcoded fallback values for EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in src/services/supabase.ts.
**Learning:** Hardcoding credentials in source code exposes backend services to unauthorized access. Fallback values are dangerous because they are still committed to version control and distributed in bundles.
**Prevention:** Always rely strictly on environment variables and fail loudly/securely at runtime if they are missing, rather than falling back to hardcoded strings.
