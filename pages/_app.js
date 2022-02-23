import DateContextProvider from "../context/DateContext"

function MyApp({ Component, pageProps }) {
  return (
    <DateContextProvider>
      <Component {...pageProps} />
    </DateContextProvider>
  )
}

export default MyApp
