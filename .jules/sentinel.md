## 2025-02-20 - [Hardcoded Configuration Secrets]
**Vulnerability:** Supabase API keys and URL had hardcoded fallback values in the event that environment variables were not loaded.
**Learning:** Developers often add fallback strings to test configuration keys or handle environment loading errors silently. This bypasses secure configuration management and can easily lead to keys being committed to version control and exposed to attackers.
**Prevention:** Always use fail-secure principles for configuration. Rather than silently falling back to a hardcoded default, explicitly check for the presence of the environment variable and throw an error to crash the app predictably if missing.
