import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom'
import {auth, provider} from "../firebase";


const Navigation = ({ account, setAccount}, props) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
    }

    const history = useNavigate();
    const signout = () => {
        auth.signOut().then(()=>{
            history('/');
        });
    }
    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0 my-0">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto nav__links">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/buy">Buy</Link>
                    </li>
                </ul>
            </div>

            <div className='collapse navbar-collapse nav__brand'>
                    <img src={logo} alt="Logo" />
                    <h1>HomeScope</h1>
            </div>

            <div className=" collapse navbar-collapse btn">
                {account ? (
                    <button
                        type="button"
                        className='btn nav__connect'
                    >
                        {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    </button>
                ) : (
                    <button
                        type="button"
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
                )}

                <Link className='btn nav__loginBtn' to="/login" role='button'>Login</Link>
                <Link className='btn nav__loginBtn' to="/" role='button' onClick={signout}>Signout</Link>

            </div>
        </nav>
        </>
    );
}

export default Navigation;