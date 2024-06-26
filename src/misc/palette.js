import VazirWoff2 from '../fonts/Vazir.woff2'


const palette = {
  mode: 'light',
  // mode: 'dark',
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
    // main: '#C7B40A',
    main:'#000'
  },
  // primary: '#C7B40A',
  secondary: {
    main: '#f50057',
  },
  background: {
    // default: '#303030',
    // default:'#7e7e7e',
    // default:'#dddddd',
    default:'#f6f7ff',

    // paper: '#eeeeee',
    paper: '#fff'
  },
  black: {
    main: '#000',
  },
  AppBarColor:{
    main: '#f6f7ff',
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