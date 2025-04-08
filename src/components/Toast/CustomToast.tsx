import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { ToastStatus } from '@/lib/services/toast';
import { toastStyles } from '@/lib/services/toast';
import { globalColors } from '@/theme';

// Enhanced icons for different toast types
const icons = {
  success: (
    <Ionicons name="checkmark-circle" size={24} color={globalColors.success} />
  ),
  error: <Ionicons name="close-circle" size={24} color={globalColors.error} />,
  info: (
    <Ionicons name="information-circle" size={24} color={globalColors.info} />
  ),
  warning: <Ionicons name="warning" size={24} color={globalColors.warning} />,
  custom: <Ionicons name="apps" size={24} color={globalColors.gray} />,
};

// Toast props interface based on the library
interface CustomToastProps {
  /**
   * The unique identifier for the toast. Used when calling onPress.
   * @eslint-disable-next-line @typescript-eslint/no-unused-vars
   */
  id: string;
  message: string | React.ReactNode;
  onDestroy(): void;
  onPress?(id: string): void;
  open: boolean;
  data?: {
    title?: string;
    status?: ToastStatus;
    [key: string]: unknown;
  };
}

export const CustomToast = (props: CustomToastProps) => {
  const { message, data, onPress, onDestroy } = props;
  // Default to info if no status is provided
  const status = (data?.status || 'info') as ToastStatus;
  const title = data?.title;

  // Combine base container style with status-specific styles
  const containerStyle = {
    ...styles.container,
    ...toastStyles[status],
  };

  // Handle close button press
  const handleClose = () => {
    if (onDestroy) {
      onDestroy();
    }
  };

  // Handle press on the toast
  const handlePress = () => {
    if (onPress) {
      onPress(props.id);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={containerStyle}
    >
      {/* Status Icon */}
      {icons[status]}

      {/* Toast Content */}
      <View style={styles.contentContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>
          {typeof message === 'string' ? message : ''}
        </Text>
      </View>

      {/* Close Button */}
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="#757575" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Local styles for the toast component
const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginLeft: 8,
    width: 24,
  },
  container: {
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  message: {
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
