/** @jsxRuntime classic */
/** @jsx jsx */import { jsx } from "@emotion/react";
import { colors, type } from "../../constants";

const styles = {
  imp: {
    width: '100%',
    marginTop: '50px',
    textAlign: 'center',
    color: colors.white,
    font: type.body,
  },
}

const Impressum = () => {
  return (
    <div css={styles.imp}>
        Lukas May-Floor <br />
        Karl-Elsasser-Str 19 <br />
        Berlin 12347 <br />
        +49 174 6490836 <br />
        goosegg.office@gmail.com
    </div>
  )
};

export default Impressum;