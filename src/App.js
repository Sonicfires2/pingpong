import './App.css';
import MainGamePage from './components/game/mainGamePage';
import Leaderboard from './components/leaderboard/leaderboard';

function App() {
  return (
    <div className="App">
      <MainGamePage></MainGamePage>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default App;
