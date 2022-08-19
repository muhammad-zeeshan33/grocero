import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Product from './Components/Product';
import Offers from './Components/Offers'
import Coupons from './Components/Coupons'
import Login from './Components/Login';
import Users from './Components/User';
import Category from './Components/Category';


function App() {




  return (
    <>
      <div className='flex '>
        <Navbar />

        <div className='w-full'>
          <Router>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='/Dashboard' element={<Dashboard />} />
              <Route exact path='/Products' element={<Product />} />
              <Route exact path='/Category' element={<Category />} />
              <Route exact path='/Offers' element={<Offers />} />
              <Route exact path='/Coupons' element={<Coupons />} />
              <Route exact path='/User' element={<Users />} />
            </Routes>
          </Router>

        </div>
      </div>

    </>
  );
}

export default App;
