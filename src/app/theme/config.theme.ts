import { createMuiTheme } from '@material-ui/core';
import { red, lightBlue, orange } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: { ...orange, main: orange['600'], contrastText: '#fff' },
    secondary: { ...lightBlue, main: lightBlue['900'], contrastText: '#fff' },
    error: red,
  },
});

export { Theme };
