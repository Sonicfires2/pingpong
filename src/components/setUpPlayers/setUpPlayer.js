import style from "./setUpPlayer.module.css"
import React, {useState, useEffect} from "react"
import { addDoc, collection } from "@firebase/firestore"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firestore"

const SetUpPlayer = ({player1Name, setPlayer1Name, player2Name, setPlayer2Name, setIsNameSetUp}) => {
    const DOCUMENT_NAME = "player_base";

    const handlePlayer1NameChange = (e) => {
        setPlayer1Name(e.target.value);
    }
    const handlePlayer2NameChange = (e) => {
        setPlayer2Name(e.target.value);
    }
    const handleSubmit = async (name1, name2) => {
        const ref = collection(firestore, DOCUMENT_NAME) // Firebase creates this automatically
        // let tempRef1 = firestore.ref( `${DOCUMENT_NAME}/${name1}`);
        // let tempRef2 = firestore.ref( `${DOCUMENT_NAME}/${name2}`);

        const docRef1 = doc(firestore, DOCUMENT_NAME, name1);
        const docSnap1 = await getDoc(docRef1);

        const docRef2 = doc(firestore, DOCUMENT_NAME, name2);
        const docSnap2 = await getDoc(docRef2);
        
        let data1 = {
            username: name1,
            cumulative_score: 0,
            num_of_wins: 0,
        }
        let data2 = {
            username: name2,
            cumulative_score: 0,
            num_of_wins: 0,
        }

        if (!docSnap1.exists()) {
            try {
                await setDoc(docRef1, data1)
            } catch(err) {
                console.log(err)
            }
        } 
        if (!docSnap2.exists()) {
            try {
                await setDoc(docRef2, data2)
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <div className={style.overallContainer}>
            <div className={style.inputPlayerNameForm}>   
                <div className={style.player1NameInputField}>
                    <label>Input name of player 1</label>
                    <input onChange={handlePlayer1NameChange} value={player1Name}></input>
                </div>
                <div className={style.player1NameInputField}>
                    <label>Input name of player 2</label>
                    <input onChange={handlePlayer2NameChange} value={player2Name}></input>
                </div>
            </div>
            <div className={style.submitButton} onClick={() => {
                setIsNameSetUp(true);
                handleSubmit(player1Name, player2Name)
            }}
            >
                Submit
            </div>
        </div>
    )
}

export default SetUpPlayer;