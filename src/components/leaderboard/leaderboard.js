import style from "./Leaderboard.module.css"
import { getDocs, collection } from "@firebase/firestore"
import { firestore } from "../firestore"
import { useState } from "react";

const Leaderboard = () => {
    const DOCUMENT_NAME = "player_base";
    const [players, setPlayers] = useState([]);
    const getAllDocuments = async () => {
        const collectionRef = collection(firestore, DOCUMENT_NAME) 
        const querySnapshot = await getDocs(collectionRef);
        let documents = [];
        querySnapshot.forEach(element => {
            console.log(element._document);
            documents.push(element._document);
        });
        setPlayers(documents)
    }

    return (
        <div className={style.leaderboard} onClick={() => {
            getAllDocuments();
        }}>
            Leaderboard
            {players.map((element, index) => {
                return (
                    <div key={index}>
                        {element.data.value.mapValue.fields.username.stringValue} : {element.data.value.mapValue.fields.num_of_wins.integerValue} wins with {element.data.value.mapValue.fields.cumulative_score.integerValue} cumulative score 
                    </div>
                )
            })}
        </div>
    )
}

export default Leaderboard;