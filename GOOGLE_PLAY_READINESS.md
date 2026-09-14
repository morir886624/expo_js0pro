# Google Play Store Readiness & Publishing Guide

This guide details all configuration, policy compliance steps, and Google Play Console declarations for **JS0pro**.

---

## 1. App Identifiers & Build Configurations

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **App Name** | `JS0pro` | Configured in `app.json` |
| **Android Application ID** | `com.js0pro.app` | Unique package identifier for Google Play |
| **Version Code** | `1` | Increment by `+1` with every subsequent Play Store release |
| **Version Name** | `1.0.0` | Semantic release version |
| **Build Artifact** | `.aab` (Android App Bundle) | Configured in `eas.json` under `production` |
| **Target Architecture** | 64-bit (`arm64-v8a`, `x86_64`) | Handled automatically by Expo / EAS Build |
| **Declared Permissions** | Minimal (`permissions: []`) | No dangerous runtime permissions requested |

---

## 2. Google Play Policy Compliance Implemented

### A. Account Deletion & User Data (Mandatory Policy)
Google Play requires any app that allows user registration to provide an in-app account deletion mechanism AND an external web-based request URL:
1. **In-App Account Deletion**:
   - Located in **Profile → Account & Security → Delete Account & Data**.
   - Also available in **Profile → Privacy & Legal → Request Account Deletion**.
   - Triggers confirmation alert and executes the `delete_user_account` procedure, wiping auth credentials and cascading user progress, badges, and scores.
2. **Database RPC Trigger**:
   - Defined in `supabase_schema.sql` (`delete_user_account()`). Run this SQL in Supabase SQL editor if not already executed.
3. **Web-based Deletion Resource**:
   - URL to provide in Google Play Console: `https://js0pro.com/delete-account` (or `mailto:privacy@js0pro.com`).

### B. In-App Legal & Privacy Transparency
- Accessible directly inside the app under **Profile → Privacy & Legal**.
- Features full, scrollable reading views for:
  - **Privacy Policy**: Discloses data collected (email, display name, XP, streaks, game progress), security encryption (TLS + SecureStore), third parties (Supabase, Google OAuth), no ad networks/trackers, and children's privacy statement.
  - **Terms of Service**: Educational use license, user account responsibility, copyright, and service terms.

### C. Android Hardware Back Button & Gesture Navigation
- Integrated via `BackHandler` in `src/navigation/RootNavigator.tsx`.
- Pressing back smoothly dismisses active modals (`Privacy`, `Notifications`, `Badges`, `Lesson Player`, `Game Play`, `Premium`) and returns from secondary tabs to `Home` before exiting, conforming to Android design guidelines.

---

## 3. Google Play Console Data Safety Questionnaire Answers

When completing the **Data Safety** section in Google Play Console:

### Overview:
- **Does your app collect or share any of the required user data types?** -> **Yes**
- **Is all of the user data collected by your app encrypted in transit?** -> **Yes**
- **Do you provide a way for users to request that their data be deleted?** -> **Yes** (Provide deletion URL: `https://js0pro.com/delete-account`)

### Data Types Collected:
1. **Personal Info -> Name**:
   - *Collected*: Yes
   - *Shared*: No
   - *Purpose*: App functionality, Account management
   - *Ephemeral*: No
   - *Required or Optional*: Optional / User choice
2. **Personal Info -> Email address**:
   - *Collected*: Yes
   - *Shared*: No
   - *Purpose*: App functionality, Account management
   - *Ephemeral*: No
   - *Required or Optional*: Required for account login/registration
3. **Personal Info -> User IDs / Account IDs**:
   - *Collected*: Yes (Supabase UUID)
   - *Shared*: No
   - *Purpose*: App functionality, Account management
4. **App Activity -> In-app actions (Learning Progress)**:
   - *Collected*: Yes (XP, quiz scores, lessons completed, streak count)
   - *Shared*: No
   - *Purpose*: App functionality, Personalization

---

## 4. Google Play Store Listing & Content Rating

### Target Audience & Content:
- **Target Age**: Select **13 and older** (13-15, 16-17, 18+).
- **Could this app appeal to children under 13?**: Select **No**. *(Selecting No avoids complex COPPA and Google Play Families policy requirements).*
- **News / Government / Financial**: Select **No** for all specialized categories.

### Required Graphical Assets:
1. **App Icon**: `512 x 512 px`, 32-bit PNG with alpha, max 1MB (Generated from `assets/icon.png`).
2. **Feature Graphic**: `1024 x 500 px`, PNG or JPEG, max 15MB.
3. **Phone Screenshots**:
   - Minimum 2 screenshots (recommended 4–6).
   - Aspect ratio 16:9 or 9:16 (e.g. 1080 x 1920 or 1080 x 2400).
   - Capture: Home tab, Learn syllabus, Interactive Lesson Player, Arcade Coding Games, Profile screen.

---

## 5. Building the Production Android App Bundle (.aab)

Google Play strictly requires `.aab` format (APKs are no longer accepted for new apps).

### Step 1: Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### Step 2: Log into your Expo account
```bash
eas login
```

### Step 3: Configure project credentials
```bash
eas credentials --platform android
```
*(EAS can generate and manage your Android keystore automatically).*

### Step 4: Build production App Bundle
```bash
eas build --platform android --profile production
```
When finished, EAS will provide a direct download link to your signed `production.aab` ready for upload to Google Play Console.

### Step 5: (Optional) Local Build via EAS
If you have Android Studio & Android SDK configured locally:
```bash
eas build --platform android --profile production --local
```

### Step 6: Submit to Google Play
```bash
eas submit --platform android --profile production
```
*(Requires a Google Service Account JSON key configured on EAS).*

