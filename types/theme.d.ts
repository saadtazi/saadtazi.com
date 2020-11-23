import 'styled-components';
import {
  PaletteColorOptions,
  ThemeOptions,
  TypeBackground,
} from '@material-ui/core/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeOptions {
    palette: {
      primary: PaletteColorOptions;
      secondary: PaletteColorOptions;
      background: TypeBackground;
    };
  }
}
