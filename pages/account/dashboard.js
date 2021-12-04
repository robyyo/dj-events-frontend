import { parseCookies } from '@/helpers/index.js';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

function DashboardPage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  return {
    props: { events },
  };
}
export default DashboardPage;
