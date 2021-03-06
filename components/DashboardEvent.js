import Link from 'next/link';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';

function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
        </a>
      </Link>
      <a
        href="#"
        className={styles.delete}
        onClick={() => {
          handleDelete(evt.id);
        }}
      >
        <FaTrash />
      </a>
    </div>
  );
}
export default DashboardEvent;
