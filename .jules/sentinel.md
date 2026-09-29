## 2024-05-24 - [Remove Hardcoded API Key]
**Vulnerability:** Hardcoded API key found in source code
**Learning:** The supabase url and anon key were hardcoded in src/services/supabase.ts instead of using environment variables properly.
**Prevention:** Use environment variables for sensitive keys and configuration.
