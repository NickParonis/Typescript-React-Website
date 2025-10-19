import './ContactSection.css';
import { useState } from 'react';



const ContactSection = () => {

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const floating = value.trim().length !== 0 || focused || undefined;

    return (
        <section className='contact'>
            <div className='contactContainer'>
                <div className='contactForm'>
                </div>
            </div>
        </section>
    )
}
export default ContactSection;