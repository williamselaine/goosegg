/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import deployment from "../../assets/link.png";
import { colors, type } from "../../constants";
import PropTypes from "prop-types";
import MediaColumn from "./mediaColumn";
import ReactMarkdown from "react-markdown";

const styles = {
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
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: colors.boxShadow,
    backgroundColor: colors.gray,
    borderRadius: "4px",
    margin: "0px 20px",
    transition: "box-shadow 1s",
    maxWidth: "300px",
    textAlign: "center",
    "&:hover": {
      transition: "box-shadow 1s",
      boxShadow: colors.boxShadowLight,
    },
  },
  projectMobile: {
    margin: "0px 30px 20px",
  },
  ghLink: {
    cursor: "pointer",
    width: "32px",
    margin: "4px 0px 0px 20px",
  },
  projectHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "10px",
    alignItems: "center",
  },
  projectBody: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
  },
  projectBodyMobile: {
    flexDirection: "column",
    alignItems: "center",
  },
  para: {
    margin: "0px 0px 12px 0px",
    textAlign: 'start'
  },
  content: {
    display: "flex",
    flexDirection: "column",
    font: type.body,
    padding: "0px 100px",
  },
  contentMobile: {
    padding: "0px 30px",
  },
};

const Project = ({
  isMobile,
  title,
  info,
  photos,
  repo_link,
  link,
  audio,
  video,
  index,
}) => {
  return (
    <div
      css={
        isMobile
          ? {
              ...styles.project,
              ...styles.projectMobile,
            }
          : styles.project
      }
    >
      <div css={styles.projectHeader}>
        <h1 css={styles.subtitle}>{title}</h1>
      </div>
      <div
        css={
          isMobile
            ? {
                ...styles.projectBody,
                ...styles.projectBodyMobile,
              }
            : styles.projectBody
        }
      >
        {index % 2 === 1 && (
          <MediaColumn
            isMobile={isMobile}
            audio={audio}
            photos={photos}
            title={title}
            video={video}
          />
        )}
        <div
          css={{
            ...styles.content,
            ...styles.contentMobile,
          }}
        >
          {info &&
            info.map((p, index) => {
              return (
                <ReactMarkdown css={styles.para} key={index}>
                  {p.replaceAll("\\n", "\n\n")}
                </ReactMarkdown>
              );
            })}
        </div>
        {index % 2 === 0 && (
          <MediaColumn
            isMobile={isMobile}
            audio={audio}
            photos={photos}
            title={title}
            video={video}
          />
        )}
      </div>
    </div>
  );
};

Project.propTypes = {
  isMobile: PropTypes.bool,
  title: PropTypes.string,
  info: PropTypes.array,
  photos: PropTypes.array,
  repo_link: PropTypes.string,
  link: PropTypes.string,
  audio: PropTypes.object,
  index: PropTypes.number,
  video: PropTypes.object,
};

export default Project;
