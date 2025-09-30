import Styles from './Actions.module.css';

export default function Actions(props) {

    const chamada = () => {
        console.log('Clicou na ação de chamada');
        window.location.href = '/chamada';
    }

    return (
        <>
            <div className={Styles.action} onClick={props.onClick}>
                <div className={Styles.content}>
                    <img width="25" height="25"
                        src={props.icon}
                        alt="" />
                    <strong>{props.title}</strong>
                    <p>{props.description}</p>
                </div>
            </div>
        </>
    )
}