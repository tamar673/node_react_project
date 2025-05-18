
import Home from './routes/Home.jsx'

import {BrowserRouter as Router, Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
   <Home/>
<Router>
 
 
    <Routes>
       {/* <Route path='/Users' element={<Users/>}/> */}
      
    </Routes>
    </Router>
 </div> );
}

export default App;

