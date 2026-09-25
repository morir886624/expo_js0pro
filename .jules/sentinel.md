## 2026-09-25 - Hardcoded Supabase Credentials
**Vulnerability:** Supabase URL and Anon Key were hardcoded in `src/services/supabase.ts`.
**Learning:** Hardcoding credentials in source files is a poor practice and could lead to misuse if the code is open-sourced.
**Prevention:** Always use environment variables for any credentials or configuration keys.
