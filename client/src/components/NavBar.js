import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){

    return (
        <div>
            <NavLink class="m-4 text-green-300 font-bold" exact to="/">
                I-RATED
            </NavLink>
            <NavLink class="m-4 text-green-300" to="/movies">
                Movies
            </NavLink>
        </div>
    )
}

export default NavBar;