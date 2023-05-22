import { NavLink, useNavigate } from "react-router-dom";
import navData from "../data/navData";
import { useCookies } from "react-cookie";

function NavBar() {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const handleLogout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    return (
        <header className="navbar">
            <div className="navbar-child">
                <div>
                    <nav>
                        {navData.map((navLinkData, index) => {
                            return (
                                <NavLink
                                    key={navLinkData.id}
                                    to={
                                        cookies.access_token
                                            ? index === 3
                                                ? ""
                                                : navLinkData.linkPath
                                            : index === 2
                                            ? ""
                                            : navLinkData.linkPath
                                    }
                                    activeclassname="active"
                                >
                                    {cookies.access_token
                                        ? index === 3
                                            ? ""
                                            : navLinkData.linkText
                                        : index === 2
                                        ? ""
                                        : navLinkData.linkText}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
                <div>{cookies.access_token && <button onClick={handleLogout}>Logout</button>}</div>
            </div>
        </header>
    );
}

export default NavBar;
