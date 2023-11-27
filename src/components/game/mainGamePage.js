import React, {useEffect, useState} from "react";
import style from "./MainGamePage.module.css"
import PopUpWindowForServer from "./component/popWindowForServer";
import SetUpPlayer from "../setUpPlayers/setUpPlayer";
import {doc, updateDoc, getDoc, increment} from "firebase/firestore";
import { firestore } from "../firestore";

const MainGamePage = () => {
    const DOCUMENT_NAME = "player_base";
    const [popUpWindowForServer, setPopUpWindowForServer] = useState(false);
    const [isNameSetUp, setIsNameSetUp] = useState(false);

    const [player1Name, setPlayer1Name] = useState("default-player-1");
    const [player2Name, setPlayer2Name] = useState("default-player-2");

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const [currServer, setCurrServer] = useState(null); 

    const increaseScorePlayer1 = () => {
        setPlayer1Score(player1Score + 1)
    }
    const increaseScorePlayer2 = () => {
        setPlayer2Score(player2Score + 1)
    }
    const changeToPlayer1Turn = () => {
        setCurrServer(player1Name)
    }
    const changeToPlayer2Turn = () => {
        setCurrServer(player2Name)
    }

    const handlePlayer1ScoreChange = () => {
        increaseScorePlayer1();
        if (currServer === player1Name) changeToPlayer2Turn();
        else if (currServer === player2Name) changeToPlayer1Turn();
    }
    const handlePlayer2ScoreChange = () => {
        increaseScorePlayer2();
        if (currServer === player1Name) changeToPlayer2Turn();
        else if (currServer === player2Name) changeToPlayer1Turn();
    }

    const handleSetNewServer = () => {
        setPopUpWindowForServer(!popUpWindowForServer);
    }

    const handleCancel = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
        setCurrServer(null);
        setIsNameSetUp(false);
        setPlayer1Name("default-player-1");
        setPlayer2Name("default-player-2");
    }

    const updateUserInfo = async ( name, newScore, win ) => {
        const docRef = doc(firestore, DOCUMENT_NAME, name);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            try {
                if (win) {
                    await updateDoc(docRef, {
                        username: name,
                        cumulative_score: increment(newScore),
                        num_of_wins: increment(1),
                    })
                } else {
                    await updateDoc(docRef, {
                        username: name,
                        cumulative_score: increment(newScore),
                        num_of_wins: increment(0),
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }

    }

    useEffect(() => {
        if (Math.abs(player1Score - player2Score) >= 2
        && (player1Score > 10 || player2Score > 10)
        ) {
            //TODO: update the leaderboard here
            player1Score > player2Score ? (
                setTimeout(() => alert("Player 1 wins"),1000)
            )
            : (
                setTimeout(() => alert("Player 2 wins"),1000)
            );

            updateUserInfo(player1Name, player1Score, player1Score > player2Score);
            updateUserInfo(player2Name, player2Score, player2Score > player1Score);
        }
    }, [player1Score, player2Score])

    return (
        <div className={style.mainGamePage}>
            { !isNameSetUp ?
                <SetUpPlayer 
                    player1Name = {player1Name}
                    setPlayer1Name = {setPlayer1Name}
                    player2Name = {player2Name}
                    setPlayer2Name = {setPlayer2Name}
                    setIsNameSetUp = {setIsNameSetUp}
                ></SetUpPlayer>
                :
                <div className={style.gamePageContainer}>
                    { popUpWindowForServer ? 
                        <PopUpWindowForServer
                            player1Name = {player1Name}
                            player2Name = {player2Name}
                            setCurrServer = {setCurrServer}
                            setPopUpWindowForServer = {setPopUpWindowForServer}
                        />
                        :
                        null
                    } 
                    
                    Game Page

                    { currServer ?
                        <div className={style.serverContainer} onClick={handleSetNewServer}>
                            Current Server: {currServer}
                        </div>
                        :
                        <div className={style.serverContainer} onClick={handleSetNewServer}>
                            Set new server
                        </div>
                    }

                    <div className={style.currScoreContainer}>
                        <div className={style.player1Score} onClick={handlePlayer1ScoreChange}>
                            <div className={style.nameContainer}>
                                {player1Name}:
                            </div>
                            {player1Score}
                        </div>
                        <div className={style.player2Score} onClick={handlePlayer2ScoreChange}>
                            <div className={style.nameContainer}>
                                {player2Name}:
                            </div>    
                            {player2Score}
                        </div>
                    </div>

                    <div onClick={handleCancel}>
                        Cancel the current game
                    </div>

                    <div onClick={() => setIsNameSetUp(false)}>
                        Change name
                    </div>
                </div>
            }
        </div>
    )
}

export default MainGamePage;