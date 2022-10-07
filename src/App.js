import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector, Provider } from "react-redux";
// import store from './store';
import Home from './pages/home/home';
import Layout from './layout/layout';
import Market from './pages/market/Market';
import Login from './pages/Auth/Login/Login';
import ConfirmRecoveryPhrase from "./pages/Auth/ConfirmRecoveryPhrase/ConfirmRecoveryPhrase"
import Register from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import RecoveryPhrase from './pages/Auth/RecoveryPhrase/RecoveryPhrase';
import configureStore from "./store/configureStore";
import { createBrowserHistory } from "history";
import CoinDetail from "./pages/CoinDetail/CoinDetail"
import ProfileLayout from './layout/ProfileLayout';
import Profile from './pages/Profile/Profile';
import Sequrity from './pages/Profile/Sequrity/Security';
import Wallet from './pages/Profile/Wallet/Wallet';
import WalletHistory from './pages/Profile/WalletHistory/WalletHistory';
import PrivacyPolicy from './pages/About/PrivacyPolicy/PrivacyPolicy';
import CodeOfEthics from './pages/About/CodeOfEthics/CodeOfEthics';
import CompilancePolicy from './pages/About/CompilancePolicy/CompilancePolicy';
import PersonalInformation from './pages/Auth/PersonalInformation/PersonalInformation';
import UploadIdFront from './pages/Auth/UploadId/UploadIdFront';
import UploadIdBack from './pages/Auth/UploadId/UploadIdBack';
import UploadRealPhoto from './pages/Auth/UploadId/UploadRealPhoto';
import EmailVerifycation from './pages/Auth/EmailVerifycation/EmailVerifycation';
import Admin from './pages/Admin/Admin';

const history = createBrowserHistory();
const store = configureStore(history);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='login' element={<Login />} />
            <Route exact path="confirm-recovery-phrase" element={<ConfirmRecoveryPhrase />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='ResetPassword' element={<ResetPassword />} />
            <Route exact path="RecoveryPhrase" element={<RecoveryPhrase />} />
            <Route exact path='/PersonalInformation/:id' element={<PersonalInformation />} />
            <Route exact path='/UploadIdFront' element={<UploadIdFront />} />
            <Route exact path='/UploadIdBack' element={<UploadIdBack />} />
            <Route exact path='/UploadRealPhoto' element={<UploadRealPhoto />} />
            <Route exact path='/EmailVerifycation' element={<EmailVerifycation />} />
            <Route path='/' element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/market" element={<Market />} />
              <Route exact path="detail/:tokenSymbol" element={<CoinDetail />} />
              <Route exact path='/PrivacyPolicy' element={<PrivacyPolicy />} />
              <Route exact path='/CodeOfEthics' element={<CodeOfEthics />} />
              <Route exact path='/CompilancePolicy' element={<CompilancePolicy />} />
              <Route exact path='/admin' element={<Admin />} />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='sequrity' element={<Sequrity />} />
                <Route exact path='wallet' element={<Wallet />} />
                <Route exact path="walletHistory" element={<WalletHistory />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

