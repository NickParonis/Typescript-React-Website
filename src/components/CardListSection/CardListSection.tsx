import Card from './Card.tsx';
import { useState } from 'react';
import { useEffect } from 'react';
import Cardsdata from '../../data/cards.json'
import './Card.css'
import './CardListSection.css'

const CardListSection = () => {
    const [cards, setCards] = useState([
            {color: "", icon: "", title: "", text: "", buttontext: "", buttonURL: ""},
    ]);
    useEffect( () => {
        setCards(Cardsdata.cardsdata)
    }, []);
    return (
        <section className='cardlist'>
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
                    />
                )}
            </div>
        </section>
    )
}
export default CardListSection;