import Palyer from "./components/Palyer";
function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Palyer name="Palyer 1" symbol="X" />
          <Palyer name="Palyer 2" symbol="O" />
        </ol>
        game Borad LOg
      </div>
    </main>
  );
}

export default App;
