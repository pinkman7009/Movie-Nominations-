import '../styles/globals.css';
import Layout from '../components/Layout';
import NomState from '../context/nominations/NomState';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NomState>
        <Component {...pageProps} />
      </NomState>
    </Layout>
  );
}

export default MyApp;
