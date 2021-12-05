import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : 'https://res.cloudinary.com/rfinkley82/image/upload/v1638728185/thumbnail_event_default_96d6959a2a.png'
          }
          alt="event"
          width="170"
          height="100"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} @ {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
export default EventItem;
