import style from "./popWindowForServer.module.css"

const PopUpWindowForServer = ({player1Name, player2Name, setCurrServer, setPopUpWindowForServer}) => {
    return (
        <div className={style.window}>
            <div className={style.option} onClick={() => {
                setCurrServer(player1Name);
                setPopUpWindowForServer(false);
            }}>
                {player1Name}
            </div>
            <div className={style.option} onClick={() => {
                setCurrServer(player2Name);
                setPopUpWindowForServer(false);
            }}>
                {player2Name}
            </div>
        </div>
    )
}

export default PopUpWindowForServer;