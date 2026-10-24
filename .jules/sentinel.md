## 2024-05-24 - Remove Hardcoded Secrets from Environment Variables Fallback
**Vulnerability:** Hardcoded API keys (Supabase URL and Anon Key) were used as fallbacks for missing environment variables.
**Learning:** Hardcoded secrets as fallbacks in configuration files are a major security risk if environment variables fail to load or aren't set in CI/CD pipelines. This can leak sensitive credentials in source code.
**Prevention:** Never use hardcoded secrets as fallbacks. Always throw a clear error or fail fast during runtime/initialization if required environment variables containing secrets are missing.
