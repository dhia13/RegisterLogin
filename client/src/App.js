import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import EmailConfirmation from "./Pages/Register/EmailConfirmation";
import Register from "./Pages/Register/Register";
import ConfirmEmail from './Pages/Register/ConfirmEmail'
import Login from './Pages/Login/Login'
import RequestPasswordReset from "./Pages/Login/RequestPasswordReset";
import ChangePassword from "./Pages/Login/ChangePassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ConfirmEmail' element={<ConfirmEmail />} />
        <Route path='/EmailConfirmation/:token' element={<EmailConfirmation />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/RequestPasswordReset' element={<RequestPasswordReset />} />
        <Route path='/ChangePassword/:token' element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
