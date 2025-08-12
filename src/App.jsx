import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main style={{  display: "flex", flexDirection: "column" }}>
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
