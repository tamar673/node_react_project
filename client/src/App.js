
import Home from './routes/home.jsx'

import { Route, Routes } from 'react-router-dom'
import Gallery from './routes/gallery.jsx';
import DaveningTimes from './routes/daveningTimes.jsx';
import ReferenceSources from './routes/referenceSources.jsx';

export const baseURL = 'http://localhost:0011/api/';

function App() {
    return (
        <div className="App">
            <Home />
            <Routes>
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/daveningTimes' element={<DaveningTimes />} />
                <Route path='/referenceSources' element={<ReferenceSources />} />
            </Routes>
        </div>);
}

export default App;

