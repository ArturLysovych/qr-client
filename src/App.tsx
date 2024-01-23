import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import QrPage from './pages/QrPage';
import RedirectPage from './pages/RedirectPage';
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
				<Route path="/admin/*" element={<AdminPage />}>
					<Route path="requests" element={<></>} />
					<Route path="history" element={<></>} />
					{/* <Route path="*" element={<Navigate to="/admin/requests" replace />} /> */}
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;