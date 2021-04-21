import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';

import styles from './styles.module.scss';

function Header() {
  const currentDate = format(new Date(), 'EEEEEEE, d MMMM', {
    locale: pt,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"/>

      <p>O melhor para ouvires, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}

export {
  Header
} ;