import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <main>
        <Header/>
        <Outlet />
        <footer>footer</footer>
      </main>
    </>
  );
}

export default App;
