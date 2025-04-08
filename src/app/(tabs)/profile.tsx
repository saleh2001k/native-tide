import React from 'react';
import { Image, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function ProfileTab() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>125</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1.2K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>348</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About</Text>
        <Text style={styles.infoText}>
          Frontend developer with a passion for creating beautiful and
          functional user interfaces. Love working with React Native and
          exploring new technologies.
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 3,
  },
  avatar: {
    width: 114,
    height: 114,
    borderRadius: 57,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
  },
  infoContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
}));
