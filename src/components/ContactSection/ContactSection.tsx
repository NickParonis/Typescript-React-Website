import './ContactSection.css';
import { useState } from 'react';
import { FloatingLabelInput } from './FloatingLabelInput.tsx';
import classes from './FloatingLabelInput.module.css';



const ContactSection = () => {

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const floating = value.trim().length !== 0 || focused || undefined;

    return (
        <section className='contact'>
            <div className='contactContainer'>
                <div className='contactForm'>
                <FloatingLabelInput    />
                </div>
            </div>
        </section>
    )
}
export default ContactSection;