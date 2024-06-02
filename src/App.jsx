import Palyer from "./components/Palyer";
import GameBoard from "./components/GameBoard";
function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Palyer initialName="Palyer 1" symbol="X" />
          <Palyer initialName="Palyer 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
