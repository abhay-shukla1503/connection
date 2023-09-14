import {Link} from "react-router-dom";
const Navigation=()=>{
    return(
        <header>
            <div className="logo">Payment Gateway</div>
            <nav>
                <ul>
                    <li>
                        <Link className="nav_link" to="/">
                          Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/transfer">
                          Transfer Amount
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/balance">
                          Check Balance
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navigation;