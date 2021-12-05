import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

function EventPage({ evt }) {

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} @ {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {/* Original code */
        /* {evt.image && (
          <div className={styles.image}>
            <Image
              src={
                evt.image.formats.medium.url
                  ? evt.image.formats.medium.url
                  : 'https://res.cloudinary.com/rfinkley82/image/upload/v1638108852/medium_event_default_7a58e1e03c.png'
              }
              width={960}
              height={600}
              alt="event"
            />
          </div>
        )} */}
        {/* My code using a default event image if none is uploaded */}
        <div className={styles.image}>
          <Image
            src={
              evt.image
                ? evt.image.formats.medium.url
                : 'https://res.cloudinary.com/rfinkley82/image/upload/v1638108852/medium_event_default_7a58e1e03c.png'
            }
            width={960}
            height={600}
            alt="event"
          />
        </div>
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/">
          <a className="styles.back">{'<'}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: { evt: events[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: { evt: events.evt[0] },
//   };
// }

export default EventPage;
