import "../styles/globals.css";
import { AuthProvider } from "../lib/AuthContext";
import Layout from '../components/shared/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
