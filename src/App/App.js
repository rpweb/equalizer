import logo from './logo.svg';
import './App.css';
import CalculatorView from '../components/CalculatorView/CalculatorView';

function App() {
  return (
    <>
      <header>
        <img src={logo} className="logo" alt="Equalizer" />
      </header>
      <main>
        <CalculatorView />
      </main>
    </>
  );
}

export default App;
