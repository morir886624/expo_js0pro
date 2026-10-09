## 2024-03-22 - Hardcoded Secrets in Source Code
**Vulnerability:** Supabase URL and Anon Key were hardcoded as fallbacks in `src/services/supabase.ts` for when environment variables were absent.
**Learning:** Hardcoding connection details or secrets, even as fallbacks, can leak critical backend infrastructure information when code is committed to version control or bundled for client-side applications.
**Prevention:** Strictly enforce the use of environment variables for all secrets and connection details. Ensure the application fails fast and explicitly (e.g., throwing errors) when required environment variables are not provided, instead of relying on insecure hardcoded defaults.
