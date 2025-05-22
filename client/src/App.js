
import { Route, Routes } from 'react-router-dom'
import Gallery from './routes/gallery.jsx'
import DaveningTimes from './routes/daveningTimes.jsx';
import ReferenceSources from './routes/referenceSources.jsx';
import Home from './routes/Home.jsx';
import Users from './routes/users.jsx';
import Achievemens from './routes/achievemens.jsx'
import Plans from './routes/plans.jsx'
// export const baseURL = 'http://localhost:0011/api/';

function App() {
    return (
        <div className="App">
            <Home />
            <Routes>
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/daveningTimes' element={<DaveningTimes />} />
                <Route path='/referenceSources' element={<ReferenceSources />} />
                <Route path='/users' element={<Users />}/>
                <Route path='/plans' element={<Plans />}/>
                <Route path='/achievemens' element={<Achievemens />}/>
            </Routes>
        </div>);
}

export default App;

