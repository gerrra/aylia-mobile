import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/src/theme';

export default function Screen({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
        gap: 12,
      }}
    >
      {children}
    </View>
  );
}
