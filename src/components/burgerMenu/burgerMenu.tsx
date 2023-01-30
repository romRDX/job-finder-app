import React, { useState } from 'react';
import styles from "./burgerMenu.module.scss";
import Link from 'next/link';

// This buger menu is a very simple one, the layout/design of it when on mobile port is bad i know, i apologize for that, i tried to focus more on the quality of the core instead
const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.burgerMenu__burger} onClick={() => setIsOpen(prev => !prev)}>
                <span />
                <span />
                <span />
            </div>
            <nav className={ isOpen ? styles["burgerMenu__container--open"] : styles.burgerMenu__container}>
                <Link href='/test/jobs/'>JOBS</Link>
                <Link href='/test/jobs/'>CAREERS</Link>
                <Link href='/test/jobs/'>POST JOB</Link>
                <button>SIGN IN</button>
            </nav>
        </>
    );
}

export default BurgerMenu;