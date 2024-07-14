import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

function Navbar() {
  const { user, dispatch } = useGlobalContext();
  const signOutProfile = async () => {
    await signOut(auth);
    toast.success(`Хайр жаноб ${user.displayName}!`);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DILMUROD</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
          <li>
            <NavLink to="/todos">TODOS</NavLink>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-80 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Исмингиз
                <span className="badge">{user.displayName}</span>
              </a>
            </li>
            <li>
              <a>
                Э-почта
                <span className="badge">{user.email}</span>
              </a>
            </li>
            <li>
              <button onClick={signOutProfile} className="btn btn-warning">
                ЧИҚИШ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
