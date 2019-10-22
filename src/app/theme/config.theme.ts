import { createMuiTheme } from '@material-ui/core';
import { red, lightBlue, orange } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: { ...lightBlue, main: lightBlue['900'] },
    secondary: { ...orange, main: orange['600'], contrastText: '#fff' },
    error: red,
  },
});

export { Theme };
