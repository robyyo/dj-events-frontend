import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from 'components/Pagination';

export default function EventsPage({ events, page, totalEvents }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={totalEvents} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  console.log(page);
  //Calculate start page
  const start = parseInt(page) === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetch evevnts
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  //Fetch count of events
  const eventCountRes = await fetch(`${API_URL}/events/count`);
  const totalEvents = await eventCountRes.json();

  return {
    props: { events, page: +page, totalEvents: totalEvents },
  };
}
