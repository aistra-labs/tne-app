import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import "./App.css";
import { Suspense, lazy } from "react";
import LoginPage from './pages/login';
import ExpenseDetailsView from './pages/expense-details';

const Home = lazy(() => import('./pages/home'));
const Expenses = lazy(() => import('./pages/expenses'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/expense-approvals" element={<Expenses />} />
            <Route path="/expense-details/:id" element={<ExpenseDetailsView />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
