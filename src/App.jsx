import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddExpense />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;