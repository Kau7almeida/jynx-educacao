import Styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

import logo from '../../assets/Layer_1.svg'
import logo2 from '../../assets/Logo 02.svg'

export default function Navbar() {
    return (
        <header>
            <div className={Styles.container}>
                <div className={Styles.title_header}>
                    <p className={Styles.title_jynx}>Universidade JYNX</p>
                    {/* <img src={logo} alt="" /> */}
                    <p className={Styles.barra}>|</p>
                    <p className={Styles.cargo}>Instrutor</p>
                </div>
                <nav>
                    <Link to={'/'}>Dashboard</Link>
                    <Link to={'/chamada'}>Chamada</Link>
                    <Link to={'/'}>Notebooks</Link>
                </nav>
            </div>
        </header>
    )
}