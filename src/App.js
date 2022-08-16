import { MainAppProvider } from './context/MainAppContext';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Resolution from './Pages/Resolution';

function App() {
  return (
    <div>
      <div>
        <MainAppProvider>
          <Routes>
            <Route path='/' element={<Resolution/>} />
          </Routes>
        </MainAppProvider> 
      </div>
    </div>
  );
}

export default App;
