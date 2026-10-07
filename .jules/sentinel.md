## 2026-10-06 - Hardcoded API Keys
**Vulnerability:** Found hardcoded Supabase URL and Anon Key in `src/services/supabase.ts`.
**Learning:** Default fallbacks in env variable declarations (`process.env.VAR || 'fallback'`) often contain actual development or production keys during initial development that never get removed.
**Prevention:** Always use placeholder strings (e.g. `'YOUR_SUPABASE_URL'`) or throw errors instead of falling back to functional secrets in code.
