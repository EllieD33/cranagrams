import "./App.css";
import { TileStateProvider } from "./context/TileStateContext";
import Board from "./Board/Board";

function App() {
  return (
    <TileStateProvider>
      <h1>Cranagrams</h1>
      <Board />
    </TileStateProvider>
  );
}

export default App;
