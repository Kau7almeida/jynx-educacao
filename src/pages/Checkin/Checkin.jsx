import Styles from './Checkin.module.css';

import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Checkin() {

    const [alunos, setAlunos] = useState([]);

    const getAllCheckin = async () => {
        let endpoint = 'https://universidade-jynx-back.onrender.com/call/getAllCall';
        let resp = await axios.get(endpoint);
        setAlunos(resp.data);
    }

    const [finalizado, setFinalizado] = useState(false);
    const [turmas, setTurmas] = useState([]);

    const finalizar = () => {
        setFinalizado(true);
    }

    const buscarTurmas = async () => {
        let endpoint = 'https://universidade-jynx-back.onrender.com/classe/getAllClasses'
        let resp = await axios.get(endpoint)
        let data = resp.data
        setTurmas(data)
    }

    const realizarCheckin = async () => {

        let turma = document.querySelector('#txt_unidades').value
        let aluno = document.querySelector('#txt_aluno').value

        if (!turma || !aluno) {
            alert('Preencha todos os campos')
            return
        }

        let endpoint = 'https://universidade-jynx-back.onrender.com/call/post'

        let newRegister = {
            name: aluno,
            classe_id: turma
        }

        let jaRealizados = alunos.filter(item => item.name.toLowerCase() == newRegister.name.toLowerCase());

        if(jaRealizados.length > 0){
            alert('Você já realizou a chamada');
            return
        }

        let resp = await axios.post(endpoint, newRegister)

        finalizar()

    }

    useEffect(() => {
        getAllCheckin()
        buscarTurmas();
    }, [])

    useEffect(() => {
        getAllCheckin();
    }, [alunos])

    return (
        <>
            <main>
                <div className={Styles.container}>

                    <div className={Styles.status}>
                        <h1>Sistema de Chamada</h1>
                        <div className={Styles.msg_hours}>
                            <p>Registre sua presença de forma rápida e segura e descomplicada</p>
                        </div>
                    </div>

                    <div className={Styles.content}>
                        {!finalizado && (

                            <div className={Styles.box}>

                                <div className={Styles.header}>
                                    <h2>Registrar Presença</h2>
                                </div>

                                <div className={Styles.form_control}>
                                    <div className={Styles.flex_label}>
                                        <img width="20" height="20" src="https://img.icons8.com/parakeet-line/20/group.png"
                                            alt="group" />
                                        <label for="">Selecione sua turma</label>
                                    </div>
                                    <select name="" className={Styles.txt_unidades} id='txt_unidades'>
                                        <option value="">Selecione uma unidade</option>
                                        {turmas.map(turma => (
                                            <option key={turma.classe_id} value={turma.classe_id}>{turma.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={Styles.form_control}>
                                    <div className={Styles.flex_label}>
                                        <img width="20" height="20" src="https://img.icons8.com/parakeet-line/20/user.png"
                                            alt="user" />
                                        <label for="">Seu nome completo</label>
                                    </div>
                                    <input type="text" className={Styles.txt_aluno} id='txt_aluno' />
                                </div>

                                <div className={Styles.btn}>

                                    <button onClick={realizarCheckin}>
                                        <img width="20" height="20" src="https://img.icons8.com/windows/100/FFFFFF/checked--v1.png"
                                            alt="checked--v1" />
                                        Registrar Presença
                                    </button>

                                </div>

                            </div>
                        )}
                        {finalizado && (
                            <div className={Styles.finaly}>
                                <h2>Obrigado pela sua presença, boa aula!</h2>
                            </div>
                        )}
                    </div>


                </div>
            </main>
        </>
    )
}