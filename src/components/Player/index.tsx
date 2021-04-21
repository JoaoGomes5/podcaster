
import styles from './styles.module.scss';

function Player() {
 return (
   <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Em reprodução"/>
        <strong>Em reprodução</strong>
      </header>

      <div className={styles.emptyPlayer}>
          <strong>Escolhe um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}> 
          <span>00:00</span>

          <div className={styles.slider}>
            <div className={styles.emptySlider} />  
          </div>

          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Ativar modo aleatório"/>
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="Anterior"/>
          </button>

          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Reproduzir"/>
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Seguinte"/>
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir"/>
          </button>

        </div>
      </footer>
   </div>
 )
}

export {
  Player
} ;