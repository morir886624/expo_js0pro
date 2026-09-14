import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

type LegalDocType = 'none' | 'privacy' | 'terms';

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({
  onBack,
}) => {
  const { colors, isDark } = useTheme();
  const { deleteAccount } = useAuth();
  const insets = useSafeAreaInsets();
  const [activeDoc, setActiveDoc] = useState<LegalDocType>('none');

  const handleDeleteAccount = () => {
    Alert.alert(
      'Permanent Account Deletion',
      'This will permanently delete your JS0pro account and completely erase all learning records, XP points, streaks, lesson history, and saved credentials from our database. This action cannot be reversed.\n\nAre you sure you wish to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete My Account',
          style: 'destructive',
          onPress: async () => {
            const res = await deleteAccount();
            if (!res.success && res.error) {
              Alert.alert('Error', res.error);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#F8FAFC',
          paddingTop: Math.max(insets.top, 10),
        },
      ]}
    >
      <Header showBack onBack={onBack} title="Privacy & Legal" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Protection Hero Card */}
        <Card
          style={[
            styles.shieldCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.shieldIconCircle}>
            <Text style={{ fontSize: 40 }}>🛡️</Text>
          </View>
          <Text style={[styles.shieldTitle, { color: colors.text }]}>
            Your Data & Privacy
          </Text>
          <Text
            style={[styles.shieldSubtitle, { color: colors.textSecondary }]}
          >
            JS0pro is designed with privacy by default. We never sell your personal data or track your learning activity across third-party advertisers.
          </Text>
        </Card>

        {/* Legal Documents Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Legal Documents
        </Text>

        <Card
          style={[
            styles.legalCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          {/* Privacy Policy Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.legalRow}
            onPress={() => setActiveDoc('privacy')}
          >
            <View style={styles.legalLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: isDark ? '#374151' : '#EFF6FF' },
                ]}
              >
                <Ionicons name="document-text-outline" size={20} color="#3B82F6" />
              </View>
              <View>
                <Text style={[styles.docTitle, { color: colors.text }]}>
                  Privacy Policy
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  Full disclosure of data collection & retention
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Terms of Service Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.legalRow}
            onPress={() => setActiveDoc('terms')}
          >
            <View style={styles.legalLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: isDark ? '#374151' : '#FEF3C7' },
                ]}
              >
                <Ionicons name="scale-outline" size={20} color="#F59E0B" />
              </View>
              <View>
                <Text style={[styles.docTitle, { color: colors.text }]}>
                  Terms of Service
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  Educational license & terms of usage
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        {/* Google Play Data Safety & Deletion Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          User Data & Account Rights
        </Text>

        <Card
          style={[
            styles.legalCard,
            {
              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
              borderColor: isDark ? '#374151' : '#E2E8F0',
            },
          ]}
        >
          {/* In-app Data Deletion */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.legalRow}
            onPress={handleDeleteAccount}
          >
            <View style={styles.legalLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: isDark ? '#451A1A' : '#FEE2E2' },
                ]}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.docTitle, { color: '#EF4444' }]}>
                  Request Account Deletion
                </Text>
                <Text style={[styles.docSub, { color: colors.textSecondary }]}>
                  Instantly purge all account data and progress
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#EF4444" />
          </TouchableOpacity>

          {/* Web-based Deletion Resource Info */}
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={18} color="#3B82F6" />
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                Under Google Play User Data policies, if you cannot access this app, you may request complete account deletion via web at{' '}
                <Text style={{ color: '#3B82F6', fontWeight: '700' }}>
                  privacy@js0pro.com
                </Text>{' '}
                or visit{' '}
                <Text style={{ color: '#3B82F6', fontWeight: '700' }}>
                  https://js0pro.com/delete-account
                </Text>.
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Full Document Reader Modal */}
      <Modal
        visible={activeDoc !== 'none'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setActiveDoc('none')}
      >
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              paddingTop: Math.max(insets.top, 16),
            },
          ]}
        >
          {/* Modal Header */}
          <View
            style={[
              styles.modalHeader,
              { borderBottomColor: isDark ? '#374151' : '#E2E8F0' },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {activeDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </Text>
            <TouchableOpacity
              onPress={() => setActiveDoc('none')}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.modalScroll}
          >
            {activeDoc === 'privacy' && (
              <View>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  Effective Date: September 2026 • Version 1.0.0
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  1. Overview & Commitment
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  JS0pro ("we", "our", or "the app") provides an interactive educational platform for learning JavaScript. We are committed to protecting your privacy and transparently handling any data necessary to run our service.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  2. Information We Collect
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  • Account Information: When you create an account, we collect your email address and display name. If you sign in via Google OAuth, we receive your verified email and public profile name from Google.{'\n'}
                  • Learning Progress Data: We store your course progress, completed lessons, coding quiz scores, XP points, streaks, and unlocked achievement badges.{'\n'}
                  • Authentication Tokens: Encrypted session tokens are stored locally on your device using hardware-backed SecureStore to maintain your authenticated login state.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  3. How Your Information Is Used
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We use collected information solely to:{'\n'}
                  • Provide, personalize, and synchronize your JavaScript learning progress across devices.{'\n'}
                  • Authenticate your account securely and prevent unauthorized access.{'\n'}
                  • Maintain community rankings and achievement metrics.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  4. Third-Party Services
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  • Supabase Inc.: Database and authentication hosting under strict privacy protocols.{'\n'}
                  • Google LLC: Optional Google OAuth federated sign-in.{'\n'}
                  We do NOT integrate third-party advertising SDKs, sell your personal data, or track your activity across other apps and websites.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  5. Data Retention & Account Deletion
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  In full compliance with Google Play Store User Data Policies, you have the right to request deletion of your account and all associated data at any time. You can trigger immediate deletion directly in the app via Profile → Delete Account, or through our web resource at privacy@js0pro.com. Upon deletion, your profile, authentication records, and learning history are permanently erased from our database.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  6. Children’s Privacy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  JS0pro is designed for general audiences aged 13 and older. We do not knowingly collect personal data from children under the age of 13.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  7. Contact Us
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  If you have questions regarding this Privacy Policy or your data rights, please contact us at: support@js0pro.com or privacy@js0pro.com.
                </Text>
              </View>
            )}

            {activeDoc === 'terms' && (
              <View>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  Last Updated: September 2026 • Version 1.0.0
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  1. Acceptance of Terms
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  By creating an account or accessing the JS0pro mobile application, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  2. Educational Use License
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  JS0pro grants you a revocable, non-exclusive, non-transferable limited license to use the app for personal, non-commercial educational learning purposes.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  3. User Accounts
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  4. Intellectual Property
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  All educational content, interactive coding lessons, game mechanics, illustrations, graphics, and code examples provided within JS0pro are the property of JS0pro and protected under copyright laws.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  5. Disclaimers & Limitation of Liability
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  The app is provided "as is" without warranty of any kind. JS0pro shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
                </Text>

                <Text style={[styles.heading, { color: colors.text }]}>
                  6. Termination
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You may terminate this agreement at any time by deleting your account from the app settings. We reserve the right to suspend or terminate accounts that violate our fair use policies.
                </Text>
              </View>
            )}

            <View style={{ marginTop: 24, marginBottom: 32 }}>
              <Button
                title="Close"
                variant="primary"
                onPress={() => setActiveDoc('none')}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  shieldCard: {
    alignItems: 'center',
    padding: Spacing.lg,
    marginVertical: Spacing.md,
  },
  shieldIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  shieldTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: '800',
    marginBottom: 6,
  },
  shieldSubtitle: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '800',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  legalCard: {
    padding: 0,
    overflow: 'hidden',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  legalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: '700',
  },
  docSub: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  infoRow: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    padding: 12,
    borderRadius: BorderRadius.md,
  },
  infoText: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: '800',
  },
  closeButton: {
    padding: 6,
  },
  modalScroll: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 16,
    paddingBottom: 40,
  },
  metaText: {
    fontSize: Typography.sizes.xs,
    marginBottom: 16,
    fontWeight: '600',
  },
  heading: {
    fontSize: Typography.sizes.base,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: Typography.sizes.sm,
    lineHeight: 22,
  },
});


