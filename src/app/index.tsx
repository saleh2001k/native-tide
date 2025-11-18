import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Column } from '@/components/ui';
import { Text } from '@/components/ui/Text';

export default function HomeScreen() {
  const handleGetStarted = () => {
    router.push('/about');
  };

  const handleLearnMore = () => {
    router.push('/about');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="absolute top-4 right-6 z-10">
        <LanguageSwitcher />
      </View>

      <View className="flex-1 justify-center items-center px-6">
        <Column alignItems="center" gap={48}>
          <Column alignItems="center" gap={16}>
            <Text
              tx="welcome.title"
              className="text-4xl font-bold text-black dark:text-white mb-4 text-center"
            />
            <Text
              tx="welcome.subtitle"
              className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed text-center"
            />
          </Column>

          <Column gap={16} className="w-full">
            <TouchableOpacity
              className="bg-black dark:bg-white py-4 px-8 rounded-lg items-center"
              onPress={handleGetStarted}
            >
              <Text
                tx="buttons.getStarted"
                className="text-white dark:text-black text-lg font-semibold"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 dark:bg-gray-700 py-4 px-8 rounded-lg items-center border border-gray-200 dark:border-gray-700"
              onPress={handleLearnMore}
            >
              <Text
                tx="buttons.learnMore"
                className="text-black dark:text-white text-lg font-medium"
              />
            </TouchableOpacity>
          </Column>
        </Column>
      </View>
    </SafeAreaView>
  );
}
