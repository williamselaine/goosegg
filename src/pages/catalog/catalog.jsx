/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type } from "../../constants";
import { useEffect, useState } from 'react';

const styles = {
  parent: {
    padding: "0px 0px 30px",
    backgroundColor: colors.black,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: colors.purple,
    font: type.h1,
    margin: "0px 0px 20px",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
  },
  subtitle: {
    color: colors.purple,
    font: type.h3,
    width: "100%",
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    display: "flex",
    flexDirection: "column",
    font: type.bodySemibold,
    color: colors.white,
    padding: "0px 100px",
  },
  contentMobile: {
    padding: "0px 30px",
  },
  covers: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    maxWidth: '800px',
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    maxWidth: "180px",
    margin: "10px 10px",
    objectFit: "contain",
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: '0.6',
    }
  },
  videoCover: {
    maxHeight: "180px",
    margin: "10px 10px",
    objectFit: "contain",
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: '0.6',
    }
  },
  button: {
    marginTop: "10px",
    backgroundColor: "transparent",
    color: colors.white,
    border: "none",
    font: type.bodyL,
    outline: "none",
    cursor: "pointer",
    opacity: "0.5",
    transition: "opacity 0.5s",
    transition: 'color 0.5s',
    float: "right",
    "&:hover": {
      opacity: "0.4",
      transition: "opacity 0.5s",
    },
  },
  activeButton: {
    textDecoration: 'underline',
    color: colors.white,
    opacity: '1.0',
  },
  logo: {
    maxWidth: '300px',
  },
  egg: {
    maxWidth: '200px',
    marginTop: '50px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  videoTitle: {
    font: type.bodyXS,
    color: colors.white,
    maxWidth: '180px',
    textAlign: 'center',
  }
};

const Catalog = ({ content, photos, icons, videos }) => {
  const [tab, setTab] = useState(0);

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>catalog</h1>
      <div css={styles.tabs}>
        <button css={tab === 0 ? {...styles.button,...styles.activeButton} : styles.button} onClick={() => setTab(0)}>music</button>
        <button css={tab === 1 ? {...styles.button,...styles.activeButton} : styles.button} onClick={() => setTab(1)}>video</button>
      </div>
      {tab === 0 && <div css={styles.covers}>
        {content.music?.map((release, index) => {
            const photo = photos && photos[release.title];
            
            if(photo && Object.values(photo)?.length){
            return (
              <a
                css={styles.link}
                href={release.link}
                target="_blank"
                key={index}
                >
                  <img src={Object.values(photo)[0].src} css={styles.cover} alt={release.title} key={index} />
              </a>
            );
            }
        })}
      </div>}
      {tab === 1 && <div css={styles.covers}>
        {content.video?.map((release, index) => {
            const photo = videos && videos[release.title];
            
            if(photo && Object.values(photo)?.length){
            return (
              <div css={styles.column}>
                <a
                  css={styles.link}
                  href={release.link}
                  target="_blank"
                  key={index}
                  >
                  <img src={Object.values(photo)[0].src} css={styles.videoCover} alt={release.title} key={index} />
              </a>
              <span css={styles.videoTitle}>{release.title}</span>
              </div>
            );
            }
        })}
      </div>}
    {icons && <img css={styles.egg} src={Object.values(icons)[1]?.src} />}
    {icons && <img css={styles.logo} src={Object.values(icons)[0]?.src} />}
    </div>
  ) : (
    <div />
  );
};

Catalog.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
  videos: PropTypes.object,
};

export default Catalog;
