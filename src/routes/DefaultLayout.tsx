import { Link } from "react-router-dom";
import React from "react";
import "../styles/defaultLayout.css"

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/singup" className="nav-link">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>

    <main className="main-content">{children}</main>
  </>
  );
}