import { createMuiTheme } from '@material-ui/core';
import { red, lightBlue, orange } from '@material-ui/core/colors';

const Theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
    error: red,
  },
});

export { Theme };
