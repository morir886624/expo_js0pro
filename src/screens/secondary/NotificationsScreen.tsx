import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { NOTIFICATIONS_DATA, AppNotification } from '../../data/mockData';

interface NotificationsScreenProps {
  onBack: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS_DATA);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const todayNotifs = notifications.slice(0, 2);
  const earlierNotifs = notifications.slice(2);

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
      <Header
        showBack
        onBack={onBack}
        title="Notifications"
        rightAction={
          <TouchableOpacity activeOpacity={0.7} onPress={markAllAsRead}>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today Section */}
        <Text style={[styles.sectionHeading, { color: colors.textSecondary }]}>
          TODAY
        </Text>

        <View style={styles.list}>
          {todayNotifs.map((item) => (
            <Card
              key={item.id}
              style={[
                styles.notifCard,
                {
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  borderColor: isDark ? '#374151' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.notifRow}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: isDark
                        ? '#374151'
                        : 'rgba(250, 204, 21, 0.15)',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={styles.notifHeaderRow}>
                    <Text style={[styles.notifTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text
                    style={[styles.notifMessage, { color: colors.textSecondary }]}
                  >
                    {item.message}
                  </Text>
                  <Text style={[styles.notifTime, { color: colors.textMuted }]}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Earlier Section */}
        <Text
          style={[
            styles.sectionHeading,
            { color: colors.textSecondary, marginTop: Spacing.xl },
          ]}
        >
          EARLIER
        </Text>

        <View style={styles.list}>
          {earlierNotifs.map((item) => (
            <Card
              key={item.id}
              style={[
                styles.notifCard,
                {
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  borderColor: isDark ? '#374151' : '#E2E8F0',
                  opacity: 0.85,
                },
              ]}
            >
              <View style={styles.notifRow}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: isDark ? '#374151' : '#F1F5F9',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={styles.notifHeaderRow}>
                    <Text style={[styles.notifTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text
                    style={[styles.notifMessage, { color: colors.textSecondary }]}
                  >
                    {item.message}
                  </Text>
                  <Text style={[styles.notifTime, { color: colors.textMuted }]}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markReadText: {
    color: '#FACC15',
    fontWeight: '700',
    fontSize: Typography.sizes.sm,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  list: {
    gap: 10,
  },
  notifCard: {
    padding: Spacing.md,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notifTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: '800',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FACC15',
  },
  notifMessage: {
    fontSize: Typography.sizes.xs,
    lineHeight: 18,
    marginTop: 2,
  },
  notifTime: {
    fontSize: 10,
    marginTop: 6,
    fontWeight: '500',
  },
});

