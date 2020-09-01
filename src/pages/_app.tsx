import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Provider, ssrExchange } from 'urql';
import theme from '../theme';
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
        <CSSReset />
        <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>  
  )
}

export default MyApp
