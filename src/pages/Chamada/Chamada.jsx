import Styles from './Chamada.module.css';

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar"

import qrcode from '../../assets/download.png'

export default function Actions() {

    const [turmas, setTurmas] = useState([])
    const [turmaSelecionada, setTurmaSelecionada] = useState('')

    const [alunos, setAlunos] = useState([]);

    const [userLogado, setUserLogado] = useState({})

    let meuStorage = localStorage;
    const user = JSON.parse(meuStorage.getItem("user"));

    const navigate = useNavigate();

    const capturaUser = () => {

        if (!user) {
            navigate('/')
        }

        setUserLogado(user)
    }

    const getAllCheckin = async () => {
        let endpoint = 'https://universidade-jynx-back.onrender.com/call/getAllCall';
        let resp = await axios.get(endpoint);
        setAlunos(resp.data);
    }

    const limparCheckin = async () => {
        let endpoint = `https://universidade-jynx-back.onrender.com/call/delete`;
        await axios.delete(endpoint);
        getAllCheckin();
    }

    const deleteCheckin = async (id) => {
        id.currentTarget.id;
        let endpoint = `https://universidade-jynx-back.onrender.com/call/deleteCalls/${id.currentTarget.id}`
        await axios.delete(endpoint);
        getAllCheckin();
    }

    const buscarTurmas = async () => {
        let endpoint = 'https://universidade-jynx-back.onrender.com/classe/getAllClasses'
        let resp = await axios.get(endpoint)
        let data = resp.data
        setTurmas(data)
    }

    const selecionarTurma = () => {
        let value = document.querySelector('#slc_turma').value
        setTurmaSelecionada(value)
        meuStorage.setItem('turmaSelecionada', value)
    }

    let turmaSelect = meuStorage.getItem("turmaSelecionada")

    useEffect(() => {
        capturaUser()
        getAllCheckin();
        buscarTurmas()
    }, [])

    useEffect(() => {
        getAllCheckin();
    }, [alunos])

    const exportExcel = () => {
        // Cabeçalho
        const linhas = [['Turma', 'Nome']];

        // Dados a partir do estado (sem DOM)
        for (const a of alunos ?? []) {
            linhas.push([turmaSelect ?? '', a?.name ?? '']);
        }

        if (linhas.length === 1) {
            console.warn('Nenhum dado para exportar.');
            return;
        }

        // Escape básico para CSV e BOM para Excel PT-BR
        const csvEscape = (v) => {
            const s = String(v ?? '');
            return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        };

        const csv = '\uFEFF' + linhas.map(l => l.map(csvEscape).join(';')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Nome do arquivo com data/hora
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}`;
        const a = document.createElement('a');
        a.href = url;
        a.download = `presencas_${ts}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>

            <Navbar />

            <main>
                <div className={Styles.container}>

                    <div className={Styles.status}>
                        <h1>Chamada</h1>
                        <div className={Styles.msg_hours}>
                            <p>Chamada com QR Code - Alunos podem escanear para confirmar presença</p>
                        </div>
                    </div>

                    <div className={Styles.content}>

                        {

                            turmaSelecionada == '' ?
                                <div className={Styles.qrcodeSelect}>

                                    <p>Selecione a Turma</p>
                                    <select name="slc_turma" id="slc_turma">
                                        <option value="">Selecione uma turma</option>
                                        {turmas.map(turma => (
                                            <option key={turma.classe_id} value={turma.name}>{turma.name}</option>
                                        ))}
                                    </select>


                                    <div className={Styles.buttons}>
                                        <button onClick={selecionarTurma} className={Styles.initCall}>Iniciar</button>
                                        <button id="btnExport" onClick={exportExcel} className={Styles.export}>Exportar</button>
                                        <button className={Styles.clear} onClick={limparCheckin}>Limpar</button>
                                    </div>

                                </div>

                                : ''

                        }


                        {
                            turmaSelecionada == '' ? '' :
                                <div className={Styles.qrcode}>

                                    <strong>QR Code da Chamada</strong>

                                    <div className={Styles.qr}>
                                        <img src={qrcode} alt="" />
                                    </div>

                                    <p>Escaneie o QR Code ou acesse:</p>
                                    <Link to={'/checkin'} target='_blank'>Acesse a chamada da Universidade JYNX</Link>

                                    <div className={Styles.buttons}>
                                        <button id="btnExport" onClick={exportExcel}>Exportar Presenças</button>
                                        <button className={Styles.clear} onClick={limparCheckin}>Limpar chamada</button>
                                    </div>
                                </div>
                        }


                        <div className={Styles.content_chamada}>

                            <strong>Presenças Confirmadas</strong>

                            <div className={Styles.table}>

                                <div className={Styles.thead}>
                                    <p>Turma</p>
                                    <p>Nome</p>
                                    <p></p>
                                </div>

                                <div id='tbody' className={Styles.tbody}>
                                    {alunos.length === 0 ? (<p>Nenhum aluno presente</p>) : (
                                        alunos.map(aluno => {
                                            return (
                                                <div className={Styles.tr} key={aluno.id}>
                                                    <p>{turmaSelect}</p>
                                                    <p>{aluno.name}</p>
                                                    <svg id={aluno.id} onClick={deleteCheckin} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                                        viewBox="0,0,256,256">
                                                        <g fill="#fa5252" fill-rule="nonzero" stroke="none" stroke-width="1"
                                                            stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                                            stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                                                            font-size="none" text-anchor="none">
                                                            <g transform="scale(5.33333,5.33333)">
                                                                <path
                                                                    d="M24,4c-3.29586,0 -6,2.70413 -6,6h-6.25391c-0.08901,-0.01526 -0.17922,-0.02245 -0.26953,-0.02148c-0.07269,0.0019 -0.14515,0.00908 -0.2168,0.02148h-3.75977c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.5v25.5c0,3.01977 2.48023,5.5 5.5,5.5h17c3.01977,0 5.5,-2.48023 5.5,-5.5v-25.5h2.5c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-3.75391c-0.16103,-0.02645 -0.3253,-0.02645 -0.48633,0h-6.25977c0,-3.29587 -2.70414,-6 -6,-6zM24,7c1.67413,0 3,1.32587 3,3h-6c0,-1.67413 1.32587,-3 3,-3zM13,13h22v25.5c0,1.39823 -1.10177,2.5 -2.5,2.5h-17c-1.39823,0 -2.5,-1.10177 -2.5,-2.5zM20.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM27.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </main>

        </>
    )
}