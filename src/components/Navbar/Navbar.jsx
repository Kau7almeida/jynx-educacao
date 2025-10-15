import Styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <header>
            <div className={Styles.container}>
                <div className={Styles.title_header}>
                    <p className={Styles.title_jynx}>JYNX Educação</p>
                    <p className={Styles.barra}>|</p>
                    <p className={Styles.cargo}>Instrutor</p>
                </div>
                <nav>
                    <Link to={'/home'}>Dashboard</Link>
                    <Link to={'/chamada'}>Chamada</Link>
                    <Link to={'/home'}>Notebooks</Link>
                    <button className={Styles.btnLogout} onClick={logout}>Sair</button>
                </nav>
            </div>
        </header>
    )
}