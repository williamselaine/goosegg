/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors } from "../constants";
import { useState, useEffect } from "react";
import { storage } from "../firebase";

const Linkbar = ({ links, backed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [images, setImages] = useState([]);

  const styles = {
    parent: {
      display: "flex",
      width: "100%",
      backgroundColor: backed ? "unset" : colors.black,
    },
    container: {
      backgroundColor: backed ? colors.pink : "transparent",
      transition: "box-shadow 2s",
      borderRadius: "3px",
      boxShadow: backed
        ? isHovered
          ? colors.boxShadow
          : colors.boxShadowDark
        : "unset",
      padding: backed ? "10px 15px" : "unset",
      margin: "30px auto",
      width: "300px",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "space-evenly",
    },
    link: {
      opacity: 1.0,
      transition: "opacity 0.5s",
      "&:hover": {
        opacity: 0.4,
      },
    },
    image: {
      height: "32px",
      transform: "rotate(0deg)",
      transition: "transform 2s",
    },
    imageSpin: {
      height: "32px",
      transform: "rotate(720deg)",
      transition: "transform 2s",
    },
  };

  useEffect(() => {
    (async () => {
      if(links) {
        const temp_img = new Array(links.length)
        const promises = [];
        links.forEach((link, index) => {
          if(link && link.link) {
            promises.push(storage
              .child(link.img)
              .getDownloadURL()
              .then((url) => {
                const img = new Image();
                img.src = url;
                temp_img[index] = img;
            }));
          } else {
            temp_img[index] = {src: link.img};
          }
      });
      await Promise.all(promises);
      setImages(temp_img);
    }})();
  }, [links])

  return (
    <div css={styles.parent}>
      <div css={styles.container}>
        {links.map((link, index) => {
          return link && link.link ? (
            <a
              css={styles.link}
              href={link.link}
              key={index}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img css={styles.image} src={images[index]?.src} alt="link" />
            </a>
          ) : (
            <img
              css={isHovered ? styles.imageSpin : styles.image}
              src={images[index]?.src}
              alt="link"
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

Linkbar.propTypes = {
  links: PropTypes.array,
  images: PropTypes.array,
  backed: PropTypes.bool,
};

export default Linkbar;
