import React from 'react';
import {Link} from 'react-router-dom'

const Navbaruser = () => {
    return(
        <>
        <nav className="navbaruser">
                
                <ul className="navbaruser-nav">
                  <li className="navuser-item">
                    <Link className="navuser-link " aria-current="page" to="/"></Link>
                  </li>
                  <li className="navuser-item">
                    <Link className="navuser-link" to="/Login">Login</Link>
                    
                  </li>
                  <li className="navuser-item">
                    <Link className="navuser-link" to="/Signup">Signup</Link>
                  </li>
                  
                </ul>
          </nav>
       
        </>
    )
}



export default Navbaruser;