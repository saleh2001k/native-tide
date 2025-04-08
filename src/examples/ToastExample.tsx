import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useToast } from '@/lib/hooks/useToast';
import {
  ApiService,
  notifyAuthError,
  notifyError,
  notifyInfo,
  notifyNetworkError,
  notifySuccess,
} from '@/lib/utils/notifications';

// eslint-disable-next-line max-lines-per-function
export const ToastExample = () => {
  const toast = useToast();

  // Show a success toast
  const showSuccessToast = () => {
    toast.success('Operation completed successfully!', {
      title: 'Success',
    });
  };

  // Show an error toast
  const showErrorToast = () => {
    toast.error('Something went wrong. Please try again.', {
      title: 'Error',
      duration: 5000,
    });
  };

  // Show an info toast
  const showInfoToast = () => {
    toast.info('This is an informational message.', {
      title: 'Info',
    });
  };

  // Show a warning toast
  const showWarningToast = () => {
    toast.warning('Be careful! This action cannot be undone.', {
      title: 'Warning',
    });
  };

  // Show a custom toast
  const showCustomToast = () => {
    toast.custom({
      message: 'This is a custom toast with custom styling.',
      title: 'Custom',
      duration: 4000,
    });
  };

  // Show all toasts in sequence
  const showAllToasts = () => {
    showSuccessToast();

    // Use setTimeout to show each toast with a delay
    setTimeout(() => {
      showErrorToast();
    }, 300);

    setTimeout(() => {
      showInfoToast();
    }, 600);

    setTimeout(() => {
      showWarningToast();
    }, 900);

    setTimeout(() => {
      showCustomToast();
    }, 1200);
  };

  // Show a toast and then update it
  const showUpdatingToast = () => {
    const id = toast.info('Loading your data...', {
      title: 'Please wait',
      duration: 10000,
    });

    setTimeout(() => {
      toast.update(id, {
        message: 'Almost done...',
        status: 'info',
      });
    }, 2000);

    setTimeout(() => {
      toast.update(id, {
        message: 'Data loaded successfully!',
        status: 'success',
        title: 'Complete',
      });
    }, 4000);
  };

  // Explicitly use custom method for success style
  const showCustomSuccessToast = () => {
    toast.custom({
      message: 'Custom component with success styling!',
      title: 'Custom Success',
      status: 'success',
      duration: 4000,
    });
  };

  // Explicitly use custom method for error style
  const showCustomErrorToast = () => {
    toast.custom({
      message: 'Custom component with error styling!',
      title: 'Custom Error',
      status: 'error',
      duration: 4000,
    });
  };

  // Explicitly use custom method for info style
  const showCustomInfoToast = () => {
    toast.custom({
      message: 'Custom component with info styling!',
      title: 'Custom Info',
      status: 'info',
      duration: 4000,
    });
  };

  // Explicitly use custom method for warning style
  const showCustomWarningToast = () => {
    toast.custom({
      message: 'Custom component with warning styling!',
      title: 'Custom Warning',
      status: 'warning',
      duration: 4000,
    });
  };

  // Callbacks for the direct API examples
  const showDirectSuccessToast = useCallback(() => {
    notifySuccess('This is a success message from a utility function!');
  }, []);

  const showDirectErrorToast = useCallback(() => {
    notifyError('This is an error message from a utility function!');
  }, []);

  const showDirectInfoToast = useCallback(() => {
    notifyInfo('This is an info message from a utility function!');
  }, []);

  const showDirectWarningToast = useCallback(() => {
    notifyAuthError();
  }, []);

  const showApiExample = useCallback(async () => {
    try {
      await ApiService.fetchData();
    } catch (error) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      // Error already handled in ApiService
    }
  }, []);

  const showNetworkErrorExample = useCallback(() => {
    notifyNetworkError();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Toast Examples</Text>
        <Text style={styles.description}>
          Tap the buttons below to see different types of toast notifications.
        </Text>

        <View style={styles.buttonsContainer}>
          <Text style={styles.sectionTitle}>Standard Toasts</Text>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccessToast}
          >
            <Text style={styles.buttonText}>Success Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showErrorToast}
          >
            <Text style={styles.buttonText}>Error Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfoToast}
          >
            <Text style={styles.buttonText}>Info Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showWarningToast}
          >
            <Text style={styles.buttonText}>Warning Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showCustomToast}
          >
            <Text style={styles.buttonText}>Custom Toast</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.marginTop]}>
            Custom Component Toasts
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.successButton, styles.outlineButton]}
            onPress={showCustomSuccessToast}
          >
            <Text style={[styles.buttonText, styles.darkText]}>
              Custom Success
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton, styles.outlineButton]}
            onPress={showCustomErrorToast}
          >
            <Text style={[styles.buttonText, styles.darkText]}>
              Custom Error
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton, styles.outlineButton]}
            onPress={showCustomInfoToast}
          >
            <Text style={[styles.buttonText, styles.darkText]}>
              Custom Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton, styles.outlineButton]}
            onPress={showCustomWarningToast}
          >
            <Text style={[styles.buttonText, styles.darkText]}>
              Custom Warning
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.marginTop]}>
            Direct API (Non-Hook)
          </Text>
          <Text style={styles.directApiDescription}>
            These toasts use the direct Toast API which can be called from
            anywhere, not just React components
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.successButton, styles.dashedButton]}
            onPress={showDirectSuccessToast}
          >
            <Text style={styles.buttonText}>Utility Success</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton, styles.dashedButton]}
            onPress={showDirectErrorToast}
          >
            <Text style={styles.buttonText}>Utility Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton, styles.dashedButton]}
            onPress={showDirectInfoToast}
          >
            <Text style={styles.buttonText}>Utility Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton, styles.dashedButton]}
            onPress={showDirectWarningToast}
          >
            <Text style={styles.buttonText}>Auth Session Expired</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton, styles.dashedButton]}
            onPress={showNetworkErrorExample}
          >
            <Text style={styles.buttonText}>Network Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.updateButton, styles.dashedButton]}
            onPress={showApiExample}
          >
            <Text style={styles.buttonText}>API Service Example</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.marginTop]}>
            Special Features
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.allButton]}
            onPress={showAllToasts}
          >
            <Text style={styles.buttonText}>Show All Toasts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={showUpdatingToast}
          >
            <Text style={styles.buttonText}>Updating Toast</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  allButton: {
    backgroundColor: '#673AB7',
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
    padding: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  customButton: {
    backgroundColor: '#9E9E9E',
  },
  darkText: {
    color: '#333333',
  },
  dashedButton: {
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  directApiDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#E53935',
  },
  infoButton: {
    backgroundColor: '#2196F3',
  },
  marginTop: {
    marginTop: 20,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: 'currentColor',
    borderWidth: 2,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#43A047',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: '#FF9800',
  },
  warningButton: {
    backgroundColor: '#FFB300',
  },
});
