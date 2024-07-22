import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {

    const auth = localStorage.getItem('user');
    console.warn(auth);
    const user = JSON.parse(auth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            <img alt="Logo" className="logo" src='https://shineinfinity.com/storage/images/general/2IscpQxPLsMaPRqmH2iQGFN7nU5qQ3HxMGsvvsvu.png' />
            {
                auth ?
                    <ul className='nav-ul'>
                        <li><Link to="/">Product</Link></li>
                        <li><Link to="/add">Add Project</Link></li>
                        {/* <li><Link to="/update">Update Project</Link></li> */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/signup" onClick={logout}>Logout ({ user.name})</Link></li>
                    </ul>
                    :
                    <ul className='nav-ul' style={{textAlign:"right"}}>
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    );
}

export default Nav;