import React, { Component } from 'react'
import './Footer.css'
import logo from '../../images/logo.png'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-container">
          <div className="footer-container-item">
            <img src={logo} alt="logo" width="100" height="100" className="d-inline-block align-top" />
            <p className="footer-container-item-name">The Wild Vet Veterinarian Clinic</p>
          </div>
          <div className="footer-container-item">
            <p className="footer-container-item-title">Address</p>
            <p>22a Bridge Road, Glebe</p>
            <p>Sydney NSW 2037</p>
            <p>Australia</p>
          </div>
          <div className="footer-container-item">
            <p className="footer-container-item-title">Contact</p>
            <p>T: 1300 945 383</p>
            <p>E: reception@thewildvet.com.au</p>
            <p>thewildvet.com.au</p>
          </div>

        </div>
      </div>
    )
  }
}

export default Footer;
