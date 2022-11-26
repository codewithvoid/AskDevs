import "../styles/globals.css";

// calling app components
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
