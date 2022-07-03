import React from 'react'
import Link from 'next/link';
import Image from "next/image";
import { watchInterface } from '../interfaces/watchInterface';

interface Props {
	item: watchInterface
}


const HistoryItem = ({ item }: Props) => {
  return (
        <>
            { item.episode &&
                <Link href={ `/show/${ item.show_trakt_id }/season/${ item.episode.season }/episode/${ item.episode.number }/` }>
                    <a href={ `/show/${ item.show_trakt_id }/season/${ item.episode.season }/episode/${ item.episode.number }/` }>
                        {/* TODO: replace all link+a combos with custom component */}
                        <div className="history-item">
                            <div className="history-item-floating">
                                {/* { year && <div className="show-item-year">{year}</div> } */}
                            </div>
                            
                            <div className="show-item-poster-container">
                                <Image
                                    src={ item.poster }
                                    alt="Picture of the author"
                                    height={ 400 }
                                    width={ 400 }
                                    objectFit="contain"
                                    quality="100"
                                />
                            </div>

                            <div className="result-item-textuals">
                                <div className="show-item-title"><span>{`${item.episode.season}x${item.episode.number}`}</span> {`${item.episode.title}`}</div>
                            </div>
                        </div>
                    </a>
                </Link>
            }

            {/* TODO: Support movies */}
        </>
  )
}

export default HistoryItem