import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { fonts, palette, typeScale } from '../tokens';

type Variant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'lead'
  | 'body'
  | 'bodyL'
  | 'caption'
  | 'micro'
  | 'mono'
  | 'label'
  | 'italic';

type Tone = 'ink' | 'inkSoft' | 'inkMuted' | 'inkFaint' | 'ochre' | 'paper';

type Props = TextProps & {
  variant?: Variant;
  tone?: Tone;
  uppercase?: boolean;
  tracking?: number;
  center?: boolean;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
};

const variants: Record<Variant, TextStyle> = {
  display: { fontFamily: fonts.display, fontSize: typeScale.display, lineHeight: typeScale.display * 1.02, letterSpacing: -2 },
  h1: { fontFamily: fonts.display, fontSize: typeScale.h1, lineHeight: typeScale.h1 * 1.05, letterSpacing: -1.2 },
  h2: { fontFamily: fonts.display, fontSize: typeScale.h2, lineHeight: typeScale.h2 * 1.08, letterSpacing: -0.8 },
  h3: { fontFamily: fonts.display, fontSize: typeScale.h3, lineHeight: typeScale.h3 * 1.12, letterSpacing: -0.4 },
  h4: { fontFamily: fonts.serifMedium, fontSize: typeScale.h4, lineHeight: typeScale.h4 * 1.2, letterSpacing: -0.2 },
  h5: { fontFamily: fonts.serifMedium, fontSize: typeScale.h5, lineHeight: typeScale.h5 * 1.25 },
  lead: { fontFamily: fonts.serif, fontSize: typeScale.lead, lineHeight: typeScale.lead * 1.45 },
  body: { fontFamily: fonts.sans, fontSize: typeScale.body, lineHeight: typeScale.body * 1.55 },
  bodyL: { fontFamily: fonts.sans, fontSize: typeScale.bodyL, lineHeight: typeScale.bodyL * 1.5 },
  caption: { fontFamily: fonts.sans, fontSize: typeScale.caption, lineHeight: typeScale.caption * 1.4 },
  micro: { fontFamily: fonts.mono, fontSize: typeScale.micro, letterSpacing: 0.8 },
  mono: { fontFamily: fonts.mono, fontSize: typeScale.caption, letterSpacing: 0.4 },
  label: { fontFamily: fonts.sansMedium, fontSize: typeScale.caption, letterSpacing: 1.4 },
  italic: { fontFamily: fonts.displayItalic, fontSize: typeScale.lead, lineHeight: typeScale.lead * 1.4 },
};

const tones: Record<Tone, string> = {
  ink: palette.ink,
  inkSoft: palette.inkSoft,
  inkMuted: palette.inkMuted,
  inkFaint: palette.inkFaint,
  ochre: palette.ochre,
  paper: palette.paper,
};

export function Text({
  variant = 'body',
  tone = 'ink',
  uppercase,
  tracking,
  center,
  style,
  children,
  ...rest
}: Props) {
  const base = variants[variant];
  const extra: TextStyle = {
    color: tones[tone],
    ...(uppercase ? { textTransform: 'uppercase' } : {}),
    ...(tracking !== undefined ? { letterSpacing: tracking } : {}),
    ...(center ? { textAlign: 'center' } : {}),
  };
  return (
    <RNText
      {...rest}
      style={[base, extra, style] as TextStyle[]}
      allowFontScaling={false}
    >
      {children}
    </RNText>
  );
}
