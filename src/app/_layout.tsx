import '../../global.css';

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { CustomStack } from '../components/CustomStack'; // Use your custom stack
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';

if (process.env.NODE_ENV === 'development') {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  import('../devtools/ReactotronConfig');
}

function StackNavigator() {
  const { isRTL } = useLanguage();

  return (
    <CustomStack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerRight: () => {
          if (isRTL) {
            return (
              <TouchableOpacity
                style={{ marginRight: '10%' }}
                onPress={() => router.back()}
              >
                <MaterialIcons
                  name={'arrow-forward-ios'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
        headerLeft: () => {
          if (isRTL) {
            return null;
          } else {
            return (
              <TouchableOpacity
                style={{ marginLeft: '10%' }}
                onPress={() => router.back()}
              >
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            );
          }
        },
        gestureDirection: isRTL ? 'horizontal-inverted' : 'horizontal',
      }}
    >
      <CustomStack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => {
            return null;
          },
          headerLeft: () => {
            return null;
          },
        }}
      />
      <CustomStack.Screen
        name="about"
        options={{
          title: 'About',
          headerShown: true,
        }}
      />
    </CustomStack>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StackNavigator />
    </LanguageProvider>
  );
}
