import Navbar from "./components/Navbar.jsx";
import Homepage from "./screens/Homepage.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Navbar />
      <Homepage />
      <Footer></Footer>
    </>
  );
}

export default App;
