import headshot from '../../assets/headshot.jpg';
import './ContactMeWidget.scss';

import {useState, useCallback} from "react";

export const ContactMeWidget = () => {
    const [isActive, setActive] = useState<boolean>(false);

    const handleOnMouseEnter = useCallback(() => {
        setActive(true);
    }, []);

    const handleOnMouseLeave = useCallback(() => {
        setActive(false);
    }, []);

    return (
        <div className="widget__wrapper"
             onMouseEnter={handleOnMouseEnter}
             onMouseLeave={handleOnMouseLeave}
        >
            <img src={headshot} alt='headshot'/>

            {isActive &&
                <div className="widget__info">
                    <a href='mailto:lefterkour@hotmail.com"'>
                        <h3>Get in touch!</h3>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 2H24M24 2V25M24 2L1.69697 24.303" stroke="white" strokeWidth="4"/>
                        </svg>
                    </a>
                </div>
            }
        </div>
    );
};

export default ContactMeWidget;