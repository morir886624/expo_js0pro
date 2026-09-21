## 2026-09-21 - [Hardcoded Supabase Credentials]
**Vulnerability:** [Found hardcoded Supabase production URL and Anon Key in src/services/supabase.ts as a fallback for missing environment variables.]
**Learning:** [It existed likely for developer convenience during early development to avoid setting up local environment variables, but it leaks production credentials into the client-side bundle.]
**Prevention:** [Always ensure environment variables are required and do not provide live production credentials as fallbacks in source code. Enforce .env checks during the build process.]