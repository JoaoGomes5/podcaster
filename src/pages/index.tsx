import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format , parseISO} from 'date-fns';
import { pt } from 'date-fns/locale';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';

type Episode = {
  id: string,
  title: string,
  thumbnail: string, 
  members: string,
  duration: number,
  durationAsString: string,
  url: string ,
  publishedAt: string,
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes } : HomeProps) {
  
  return (
    <div className={styles.homePage}>

      <section className={styles.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>
        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                 <Image 
                    objectFit="cover"
                    width={192} 
                    height={192} 
                    src={episode.thumbnail} 
                    alt={episode.title}
                 />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}> 
                     {episode.title}
                    </Link>

                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="Reproduzir episodio"/>
                  </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episodios</h2>
          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>

            <tbody>
                {allEpisodes.map(episode => {
                  return (
                    <tr key={episode.id}>
                        <td style={{ width: 70 }}> 
                          <Image 
                            width={120}
                            height={120}
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                          />
                        </td>
                        <td>
                          <Link href={`/episodes/${episode.id}`}>
                            {episode.title} 
                          </Link>
                        </td>
                        <td>{episode.members}</td>
                        <td style={{ width: 100 }}>{episode.publishedAt}</td>
                        <td>{episode.durationAsString}</td>
                        <td>
                          <button type="button">
                            <img src="/play-green.svg" alt="Reproduzir episodio"/>
                          </button>
                        </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
      </section>

    </div>
  )
}

export  const  getStaticProps: GetStaticProps = async ()  => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt:  format(parseISO(episode.published_at), 'd MMM yy', {locale: pt}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
      
    }
  })

  const latestEpisodes = episodes.slice(0,2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}
