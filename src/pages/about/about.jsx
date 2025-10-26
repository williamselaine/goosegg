/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type, breakpoints } from "../../constants";
import Project from "./project";

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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    font: type.body,
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
    maxWidth: '900px'
  },
  cover: {
    maxWidth: "200px",
    margin: "10px 10px",
    objectFit: "contain",
    maxHeight: 'fit-content',
    backgroundColor: colors.darkpink,
    padding: '10px',
  },
  coverMobile: {
    maxWidth: '300px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1000px',
  },
  rowMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  photoCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    maxWidth: '800px',
    padding: '20px',
    alignItems: 'center'
  },
  photoCardMobile: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    maxWidth: '400px',
    padding: '10px',
  },
  impressumTitle: {
    font: type.body,
    color: colors.purple,
  },
    impressum: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
};

const About = ({ width, content, photos, videos, icons }) => {
  let isMobile = width < breakpoints.tablet;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if(content && content.projects && content.projects.length) {
      const projects = [...content.projects];
      if(isMobile) {
        const lukasIndex = projects.findIndex(el => el.title === 'Lukas May-Floor');
        console.log('lukas index', lukasIndex);
        if(lukasIndex !== -1) {
          const lukas = {...projects[lukasIndex]};
          projects.unshift(lukas);
          projects.splice(lukasIndex+1,1);
        }
      }
      setProjects(projects);
    }
  }, [content, isMobile]);

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>about</h1>
      <div
        css={
          isMobile
            ? {
                ...styles.content,
                ...styles.contentMobile,
              }
            : styles.content
        }
      >
        {content.content?.map((p, index) => {
            return <p key={index}>{p}</p>;
        })}
        <div css={isMobile ? styles.photoCardMobile : styles.photoCard}>
          {content.photos?.map((img, index) => {
            const photo = icons && icons[img?.split('.')[0]];              
            if(photo){
              return (
                <img src={photo.src} css={styles.cover} alt={img} key={index} />
              );
              }
          })}
        </div>
        {content.content2?.map((p, index) => {
            return (
            <div>
              <h4 css={{...styles.subtitle, textAlign: index === 0 ? 'left' : 'right'}
              }>{index === 0 ? 'Audio' : 'Video'}</h4>
              <p key={index}>{p}</p>
            </div>
          );
        })}
      </div>
      <h1 css={styles.title}>posse</h1>
      <div css={isMobile ? styles.rowMobile : styles.row}>
        {projects?.map((project, index) => {
        return (
          <Project
            isMobile={isMobile}
            {...project}
            photos={
              photos &&
              photos[project.title] &&
              Object.values(photos[project.title])
            }
            video={videos && videos[project.title]}
            key={index}
            index={index}
          />
        );
      })}
      </div>
      <div css={styles.impressum}>
          <Link css={styles.impressumTitle} to="/impressum">Impressum</Link>
      </div>
    </div>
  ) : (
    <div />
  );
};

About.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
  videos: PropTypes.object,
};

export default About;
