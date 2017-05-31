import {
    grey100,
    fullWhite, fullBlack, darkBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function getTheme() {
  return getMuiTheme({
    spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: '#333e50',
      primary2Color: '#27c79a',
      primary3Color: '#df8671',
      accent1Color: '#f5f7f9',
      accent2Color: grey100,
      accent3Color: '#f6df80',
      textColor: fullWhite,
      secondaryTextColor: (0, fade)(fullWhite, 0.7),
      alternateTextColor: '#27c79a',
      canvasColor: '#333e50',
      borderColor: (0, fade)(fullWhite, 0.3),
      disabledColor: (0, fade)(fullWhite, 0.3),
      pickerHeaderColor: (0, fade)(fullWhite, 0.12),
      clockCircleColor: (0, fade)(fullWhite, 0.12),
      shadowColor: fullBlack,
    },
    drawer: {
      width: 256,
    },
    slider: {
      handleColorZero: darkBlack,
      selectionColor: darkBlack,
      rippleColor: darkBlack,
    },
  });
}

export default getTheme();
