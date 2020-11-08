import React from "react";

function Footer() {
  return (
    <div className="footer">
      <footer className="py-2 bg-dark fixed-bottom">
        <div className="container">
          <p className="m-0 text-center color: #b2beb5">
            Copyright &copy; Creative Complement {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;