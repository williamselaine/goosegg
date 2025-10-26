/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx, css, keyframes } from "@emotion/react";
import { colors, type, breakpoints } from "../constants";
import { useTypewriter } from "../hooks";
import { useEffect, useState } from 'react';

const MAX_CIRCLE_SIZE = "120px";
const MIN_CIRCLE_SIZE = "64px";
const BASE_CIRCLE_SIZE = "16px";

const AnimationConstants = {
  offset: 800,
  period: 2500,
  loadingMS: 3000,
  fadeOutMS: 1500,
};

/**
 * Shared style traits among all three circles
 */
const circle = {
  borderRadius: "50%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "0%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const grow = keyframes`
  0% {
    width: ${MIN_CIRCLE_SIZE};
    height: ${MIN_CIRCLE_SIZE};
    opacity: 0.0;
  }
  20% {
      opacity: 1.0;
  }
  100% {
    width: ${MAX_CIRCLE_SIZE};
    height: ${MAX_CIRCLE_SIZE};
    opacity: 0.0;
  }
`;

const animatedCircle = css`
  background-color: ${colors.pink};
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: ${MIN_CIRCLE_SIZE};
  height: ${MIN_CIRCLE_SIZE};
  animation: ${grow} ${AnimationConstants.period}ms infinite;
  animation-timing-function: cubic-bezier(0.46, 0.73, 1, 0.6);
  opacity: 1;
`;

const delayedAnimatedCircle = css`
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background-color: ${colors.pink};
  width: ${MIN_CIRCLE_SIZE};
  height: ${MIN_CIRCLE_SIZE};
  animation: ${grow} ${AnimationConstants.period}ms infinite;
  animation-timing-function: cubic-bezier(0.46, 0.73, 1, 0.6);
  opacity: 0;
  animation-delay: ${AnimationConstants.offset}ms;
`;

const Loading = ({ show, width }) => {
  const styles = {
    container: {
      position: "absolute",
      left: "0px",
      top: "0px",
      height: "100%",
      width: "100%",
      backgroundColor: colors.black,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "opacity 1s",
      opacity: `${show ? "1.0" : "0.0"}`,
      zIndex: "1",
    },
    title: {
      color: colors.purple,
      font: type.h1,
      margin: "110px 10px 10px 10px",
      display: "flex",
      justifyContent: "center",
      maxWidth: "100%",
      overflow: "hidden",
      textAlign: "center",
    },
    parent: {
      position: "absolute",
      top: "calc(50% - 90px)",
      margin: "75px",
      width: MAX_CIRCLE_SIZE,
      height: MAX_CIRCLE_SIZE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    baseCircle: {
      ...circle,
      position: "absolute",
      backgroundColor: 'transparent',
      width: BASE_CIRCLE_SIZE,
      height: BASE_CIRCLE_SIZE,
      fontSize: '24px',
    },
  };
  const isMobile = window.innerWidth < breakpoints.mobile;
  const fullName = isMobile ? "goosegg" : "goosegg studios";
  const name = useTypewriter(fullName, 35, 1500);

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{name}</h1>
      <div css={styles.parent}>
        <div css={animatedCircle} />
        <div css={delayedAnimatedCircle} />
        <div css={styles.baseCircle}>🪿</div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
};

export default Loading;
