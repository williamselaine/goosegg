/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { jsx, css } from "@emotion/react";
import { colors, type, breakpoints } from "../constants";
import burger from "../assets/burger.svg";

const Navbar = ({ width, height }) => {
  const [isMobile, setIsMobile] = useState(width < breakpoints.tablet);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setIsMobile(width < breakpoints.tablet);
  }, [width]);

  const navbarMobile = css`
    margin: 0px;
    list-style-type: none;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    animation-delay: 1.25s;
    z-index: 5;
    padding: 0px;
  `;
  const styles = {
    modal: {
      position: 'absolute',
      top: '0px',
      width: '100%',
      height: '100%',
      pointerEvents: 'unset',
      backgroundColor: colors.black,
      zIndex: 9999,
      opacity: '1.0',
      transition: 'opacity 0.5s',
      padding: '0px'
    },
    modalHide: {
      position: 'absolute',
      top: '0px',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      transition: 'opacity 0.5s',
      opacity: '0.0',
    },
    navbar: {
      margin: "0px",
      listStyleType: "none",
      display: "flex",
      flexDirection: "horizontal",
      justifyContent: "flex-end",
      zIndex: "5",
    },
    navbarMobileHide:{
      margin: "0px",
      listStyleType: "none",
      display: "flex",
      flexDirection: "horizontal",
      transition: "transform 1s, opacity 1s",
      transform: "translate(-385px, 0px)",
      opacity: "0.0",
    },
    navItem: {
      margin: "10px",
      display: 'inline-block',
      width: '70px',
      textAlign: 'center',
      backgroundColor: "transparent",
      transition: "background-color 1s",
      a: {
        color: colors.purple,
        font: type.h3,
        transition: "color 1s",
      },
      "&:hover": {
        backgroundColor: colors.purple,
        a: {
          color: colors.pink,
          transition: "color 1s",
        },
        transition: "background-color 0.5s",
      },
    },
    button: {
      marginTop: "10px",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
      opacity: "1.0",
      transition: "opacity 0.5s",
      float: "right",
      "&:hover": {
        opacity: "0.4",
        transition: "opacity 0.5s",
      },
    },
  };

  return (
    <React.Fragment>
      {isMobile && (
        <button css={styles.button} onClick={() => setShowNav((nav) => !nav)}>
          <img src={burger} alt="menu"></img>
        </button>
      )}
      {isMobile ? 
        <div css={showNav ? styles.modal : styles.modalHide} onClick={() => setShowNav(false)}>
          <ul
            css={
              navbarMobile
            }
          >
            <li css={styles.navItem}>
              <Link to="/">home</Link>
            </li>
            <li css={styles.navItem}>
              <Link to="/about">about</Link>
            </li>
            <li css={styles.navItem}>
              <Link to="/catalog">catalog</Link>
            </li>
          </ul>
        </div> : 
        <ul
          css={
            isMobile
              ? showNav
                ? navbarMobile
                : styles.navbarMobileHide
              : styles.navbar
          }
        >
          <li css={styles.navItem}>
            <Link to="/">home</Link>
          </li>
          <li css={styles.navItem}>
            <Link to="/about">about</Link>
          </li>
          <li css={styles.navItem}>
            <Link to="/catalog">catalog</Link>
          </li>
        </ul>
      }
        
    
    </React.Fragment>
  );
};

Navbar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Navbar;
