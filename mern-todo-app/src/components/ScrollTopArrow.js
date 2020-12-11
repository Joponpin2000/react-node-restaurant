import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollTopArrow() {
const [showScroll, setShowScroll] = useState(false);

useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => {
        window.removeEventListener('scroll', checkScrollTop)
    }
}, []);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if(showScroll && window.pageYOffset <= 400){
setShowScroll(false)
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <FontAwesomeIcon icon={faArrowCircleUp} className="scrollTop" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />

    )
}
