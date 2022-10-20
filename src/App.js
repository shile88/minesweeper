import { Game } from './components/Game';
import './App.css';
import background from './assets/images/background-image.jpg';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`, backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
        <Game />
    </div>
  );
}

export default App;
