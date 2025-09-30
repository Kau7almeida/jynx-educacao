import Styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <div class={Styles.container}>
                <div className={Styles.title_header}>
                    <p className={Styles.title_jynx}>Universidade JYNX</p>
                    <p className={Styles.barra}>|</p>
                    <p className={Styles.cargo}>Instrutor</p>
                </div>
                <nav>
                    <Link to={'/'}>Dashboard</Link>
                    <Link to={'/'}>Chamada</Link>
                    <Link to={'/'}>Notebooks</Link>
                </nav>
            </div>
        </header>
    )
}