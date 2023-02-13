import {
	BrowserRouter as AppRouter,
	Routes,
	Route
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Product from './pages/Product';
import Cart from './pages/Cart';


function App() {
	return (
		<AppRouter>
			<Routes>
				<Route path='/' exact element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</AppRouter>
	);
}

export default App;
