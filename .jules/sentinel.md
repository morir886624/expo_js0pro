## 2025-02-09 - Remove hardcoded environment variable fallbacks

**Vulnerability:** The codebase had hardcoded strings (Supabase URL and Anon Key) acting as fallbacks for the `EXPO_PUBLIC_` environment variables, which exposes sensitive information in the source control.
**Learning:** Never use hardcoded strings for security-sensitive environment variables in Expo applications. Even if they are intended to only be used in development, they run the risk of leaking secrets.
**Prevention:** Instead of falling back to a string, explicitly throw an error if the expected environment variables are missing during startup or module execution. This provides a clear, "fail-safe" error without exposing secrets.
