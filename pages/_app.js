import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { StoreProvider } from '@/context/StoreContext';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Header />
      <main className="min-h-[60vh]">
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toast />
    </StoreProvider>
  );
}
