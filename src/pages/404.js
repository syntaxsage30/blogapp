import Layout from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="error-container">
        <h1>404 - Page Not Found</h1>
        <p>That page doesn&rsquo;t exist</p>
      </div>
    </Layout>
  );
}