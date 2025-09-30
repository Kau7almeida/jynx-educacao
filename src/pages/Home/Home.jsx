import Styles from './Home.module.css'

import Navbar from "../../components/Navbar/Navbar"
import Actions from '../../components/Actions/Actions';

export default function Home() {

    let data = new Date();
    let diaSemana = data.getDay();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();

    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const nomeDiaSemana = diasDaSemana[diaSemana];

    let nomeMes = '';
    switch (mes) {
        case '01':
            nomeMes = 'janeiro';
            break;
        case '02':
            nomeMes = 'fevereiro';
            break;
        case '03':
            nomeMes = 'março';
            break;
        case '04':
            nomeMes = 'abril';
            break;
        case '05':
            nomeMes = 'maio';
            break;
        case '06':
            nomeMes = 'junho';
            break;
        case '07':
            nomeMes = 'julho';
            break;
        case '08':
            nomeMes = 'agosto';
            break;
        case '09':
            nomeMes = 'setembro';
            break;
        case '10':
            nomeMes = 'outubro';
            break;
        case '11':
            nomeMes = 'novembro';
            break;
        case '12':
            nomeMes = 'dezembro';
            break;
        default:
            nomeMes = '';
            break;
    }

    let horas = data.getHours();
    let minutos = data.getMinutes();
    if (horas < 10) {
        horas = '0' + horas;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    return (
        <>
            <Navbar />
            <main>
                <div className={Styles.container}>

                    <div className={Styles.status}>

                        <h1>Dashboard</h1>
                        <div className={Styles.msg_hours}>
                            <p id='boasVindas'>Bem vindo(a), Instrutor - {nomeDiaSemana}, {dia} de {nomeMes} de {ano}</p>
                            <div className={Styles.flex_hours}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                    viewBox="0,0,256,256">
                                    <g fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                                        font-family="none" font-weight="none" font-size="none" text-anchor="none">
                                        {/* style="mix-blend-mode: normal" */}
                                        <g transform="translate(256,0) rotate(90) scale(4,4)">
                                            <path
                                                d="M32,10c-12.15,0 -22,9.85 -22,22c0,12.15 9.85,22 22,22c12.15,0 22,-9.85 22,-22c0,-12.15 -9.85,-22 -22,-22zM32,14c9.941,0 18,8.059 18,18c0,9.941 -8.059,18 -18,18c-9.941,0 -18,-8.059 -18,-18c0,-9.941 8.059,-18 18,-18zM32,16c-1.104,0 -2,0.895 -2,2v12h-10c-1.105,0 -2,0.896 -2,2c0,1.104 0.895,2 2,2h12c1.104,0 2,-0.895 2,-2v-14c0,-1.105 -0.896,-2 -2,-2z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                <p id='horas'>{horas}:{minutos}</p>
                            </div>
                        </div>

                    </div>

                    <div className={Styles.fast_action}>

                        <div className={Styles.title_fast}>
                            <div className={Styles.flex_title_action}>
                                <img width="30" height="30" src="https://img.icons8.com/forma-light-filled-sharp/30/graph.png"
                                    alt="graph" />
                                <h2>Ações Rápidas</h2>
                            </div>
                            <p>Acesse rapidamente as funcionalidades mais usadas</p>
                        </div>

                        <div className={Styles.container_actions}>

                            <Actions
                                onClick={() => {
                                    window.location.href = '/';
                                    // window.location.href = '/chamada';
                                }}
                                icon='https://img.icons8.com/forma-light/25/228BE6/checked-user-male.png'
                                title='Iniciar Chamada'
                                description='Gerar QR Code para presença'
                            />

                            <Actions
                                onClick={() => {
                                    window.location.href = '/';
                                    // window.location.href = '/notebooks';
                                }}
                                icon='https://img.icons8.com/fluency-systems-regular/20/FAB005/laptop--v1.png'
                                title='Registrar Notebook'
                                description='Alugar ou devolver'
                            />

                        </div>
                    </div>

                    <div>
                        <p>Em desenvolvimento....</p>
                    </div>
                </div>
            </main>
        </>
    )
}