## 2023-10-27 - [Hardcoded Secrets Fallback]
**Vulnerability:** Supabase URL and Anon Key were using hardcoded fallback values if environment variables were missing.
**Learning:** Hardcoding fallback values for sensitive environment variables can lead to deploying the app with developer/test credentials or exposing them in source control.
**Prevention:** Always require sensitive environment variables to be explicitly set. If they are missing, the application should fail fast (throw an error) securely instead of silently falling back to a hardcoded string.
