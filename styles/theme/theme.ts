import { createTheme } from '@mui/material';

export const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#FFA500',
  //   },
  // },
  components: {
    MuiDivider: {
      defaultProps: {
        sx: { margin: '1rem 0' },
      },
    },
  },
});

export default theme;
