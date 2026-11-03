## 2024-05-18 - Prevent Hardcoded API Keys
**Vulnerability:** Hardcoded Supabase API keys used as fallback values in configuration.
**Learning:** Hardcoding API keys as fallback values in environment variable configuration can lead to unintentional leakage of secrets if the environment variables are not set properly. Developers sometimes do this for local development convenience, but it compromises security in public repositories or client-side applications.
**Prevention:** Always fail securely by throwing an error when required environment variables are missing, instead of using insecure hardcoded fallbacks.
