import Styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const abrirModal = () => {
        setOpenModal(true)
    }

    const fecharModal = () => {
        setOpenModal(false)
    }

    return (
        <>
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
                        {/* <Link to={'/home'}>Notebooks</Link> */}

                    </nav>
                    <div className={Styles.flex}>
                        {/* <div onClick={abrirModal}>
                            <img width="30" height="30" src="https://img.icons8.com/material-sharp/24/FFFFFF/user.png" alt="user" />
                        </div> */}
                        <button className={Styles.btnLogout} onClick={logout}>Sair</button>
                    </div>
                </div>
            </header>


            {openModal == false ? '' :

                <div className={Styles.containerModal}>

                    <div className={Styles.card}>
                        <div className={Styles.headerModal}>
                            <h3>Editar Perfil</h3>
                            <img width="30" height="30" src="https://img.icons8.com/sf-black-filled/64/multiply.png" alt="multiply" onClick={fecharModal} />
                        </div>
                        <div className={Styles.main}>
                            <div className={Styles.formControl}>
                                <p>Nome</p>
                                <input type="text" />
                            </div>
                            <div className={Styles.formControl}>
                                <p>Senha</p>
                                <input type="text" />
                            </div>
                            <div className={Styles.formControl}>
                                <button>Atualizar</button>
                            </div>
                        </div>
                    </div>

                </div>

            }
        </>
    )
}