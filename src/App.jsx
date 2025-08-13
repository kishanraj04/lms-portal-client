import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalContext } from "./context/globalcontext";
import { useContext } from "react";

function App() {
  const { theam, setTheam } = useContext(GlobalContext);
  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: `${theam ? "#1E1E1E" : "white"}`,
        }}
      >
        <Header />
        <div style={{ flexGrow: 1, overflow: "hidden" }}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
