import AppRoutes from '../routes/AppRoutes';
import './App.css'
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import UserMessage from './UserMessage/UserMessage';

const App = () => {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer />
      <UserMessage />
    </>
  );
}

export default App