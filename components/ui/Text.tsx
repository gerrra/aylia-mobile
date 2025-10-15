import { Text as RNText, TextProps } from 'react-native';
import { theme } from '@/src/theme';

type Props = TextProps & {
  variant?: 'title' | 'subtitle' | 'body' | 'muted' | 'button';
};

export default function Text({ variant = 'body', style, ...rest }: Props) {
  const base = {
    color: theme.colors.text,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fontFamily: theme.font.regular as any,
    fontSize: 16,
    lineHeight: 22,
  };

  const map = {
    title: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontFamily: theme.font.bold as any,
      fontSize: 28,
      lineHeight: 34,
    },
    subtitle: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontFamily: theme.font.semi as any,
      fontSize: 20,
      lineHeight: 26,
      color: theme.colors.muted,
    },
    body: {},
    muted: { color: theme.colors.muted },
    button: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontFamily: theme.font.semi as any,
      fontSize: 16,
      lineHeight: 20,
    },
  } as const;

  return <RNText style={[base, map[variant], style]} {...rest} />;
}
