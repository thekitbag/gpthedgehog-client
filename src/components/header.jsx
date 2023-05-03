import React from "react";
import { IonHeader } from "@ionic/react";
import './header.css'
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <Link to="/" className="btn btn-primary">
                <IonHeader >
                    <div className="logo-container">
                    </div>
                </IonHeader>
            </Link>
        )
    }
}

export default Header