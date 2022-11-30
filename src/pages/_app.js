import '../styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.body.className = 'bg-gradient-to-r from-rose-100 to-teal-100 bg-fixed';
  });

  return <Component {...pageProps} />;
}
