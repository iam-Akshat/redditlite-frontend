import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Provider, createClient } from 'urql';
import theme from '../theme'
const Client = createClient({
  url:'http://localhost:3100/graphql',
  fetchOptions:{
    credentials:'include',
  }
})
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={Client}>
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
        <CSSReset />
        <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
    </Provider>
  )
}

export default MyApp
