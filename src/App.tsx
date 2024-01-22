import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QrPage from './pages/QrPage';
import RedirectPage from './pages/RedirectPage';
import NotFound from './pages/NotFound';
import UsersPage from './pages/UsersPage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<QrPage />} />
				<Route path="/user/:id" element={<RedirectPage />} />
				<Route path="/users" element={<UsersPage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;