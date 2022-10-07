import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthLogo = () => {
    return(
        <div className="logo">
            <Link to="/">
                <img alt="" src="/image/logo.png" />
                <p>ECF Crypto</p>
            </Link>
        </div>
    )
}

export default AuthLogo;