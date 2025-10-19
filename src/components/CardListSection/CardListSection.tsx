import Card from './Card.tsx';
import { useState } from 'react';
import { useEffect } from 'react';
import Cardsdata from '../../data/cards.json'
import './Card.css'
import './CardListSection.css'

interface CardData {
    color: string;
    icon: string;
    title: string;
    text: string;
    buttontext: string;
    buttonURL: string;
    downloadFile: boolean;
    downloadFileName: string;
}

const CardListSection = () => {
    const [cards, setCards] = useState<CardData[]>([]);
    
    useEffect( () => {
        setCards(Cardsdata.cardsdata)
    }, []);
    return (
        <section id="cardlistSection" className='cardlist'>
            <div className='cardcontainer'>
                {cards.map( (card) => 
                    <Card
                        key={card.title}
                        title={card.title}
                        text={card.text}
                        icon={card.icon}
                        color={card.color}
                        buttontext={card.buttontext}
                        buttonURL={card.buttonURL}
                        downloadFile={card.downloadFile}
                        downloadFileName={card.downloadFileName}
                    />
                )}
            </div>
        </section>
    )
}
export default CardListSection;