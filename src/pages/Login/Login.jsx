import Styles from './Login.module.css'

import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {

    const navigate = useNavigate();

    const login = async () => {

        let login = document.querySelector('#txt_login').value
        let password = document.querySelector('#txt_password').value

        let obj = {
            email: login,
            password: password
        }

        let endpoint = 'https://universidade-jynx-back.onrender.com/users/login'

        let resp = await axios.post(endpoint, obj)
        let data = resp.data

        if (data == 'nao foi possivel encontrar usuário') {
            alert('Usuário inválido')
            return
        }

        if (data == 'senha incorreta') {
            alert('Senha inválida')
            return
        }

        let meuStorage = localStorage;
        meuStorage.setItem('user', JSON.stringify(data[1]))

        navigate('/home')

    }

    return (
        <>
            <div className={Styles.body}>
                <div className={Styles.container}>

                    <h1>JYNX Educação</h1>

                    <div className={Styles.form_control}>

                        <div className={Styles.form_group}>
                            <label for="">Login</label>
                            <input type="email" name="txt_login" id="txt_login" placeholder="Digite seu login" />
                        </div>

                        <div className={Styles.form_group}>
                            <label for="">Senha</label>
                            <div className={Styles.password}>
                                <input type="password" name="txt_password" id="txt_password" placeholder="Digite sua senha" className={Styles.txt_password} />
                            </div>
                        </div>

                    </div>

                    <button onClick={login}>Entrar</button>

                </div>
            </div>
        </>
    )

}