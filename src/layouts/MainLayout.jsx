// rrd
import { Outlet } from "react-router-dom";

//import layouts
import { Navbar } from "../components";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
