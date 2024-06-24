import VazirWoff2 from '../fonts/Vazir.woff2'


const palette = {
  mode: 'light',
  typography:{
    fontFamily: 'Vazirmatn'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Vazirmatn';
          src: local('Vazir'), url(${VazirWoff2}) format('woff2');
        }
      `,
    },
  },
  primary: {
    main: '#ededed  ',
  },
  secondary: {
    main: '#f50057',
  },
  black: {
    main: '#000',
  },
  AppBarButtonColor:{
    main: '#777',
  },
  HomePage:{
    changeUp: '#4daf4a',
    changeDown: '#e3342f',
  },
  ContactPage:{
    text:{
      main:"#333"
    },
    icon:{
      default:"#666"
    }
  },
  DashboardButtonColor:{
    main: '#444',
  },
  DashboardMobileButton:{
    main:'#7fc8af'
  },
  Dashboard:{
    button:{
      main:"#7fc8ef",
    },
    text:{
      main:"#333"
    },
    icon:{
      default:"#666"
    }
  }
}

export default palette;