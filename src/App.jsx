/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState, Suspense, lazy } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors } from "./constants";
import { Home } from "./pages";
import { Navbar, Loading } from "./components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useSizeListener, useDelayedUnmount } from "./hooks";
import { ContentFetchService } from "./services";
const About = lazy(() => import("./pages/about/about"));
const Catalog = lazy(() => import("./pages/catalog/catalog"));

const LOADING_DURATION = 3500;
const FADE_OUT_DURATION = 1000;

const body = {
  backgroundColor: colors.black,
  fontFamily: "Inconsolata",
  height: "100%",
  opacity: "0.0",
  transition: "opacity 0.5s",
};

const App = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, height] = useSizeListener();
  const isMounted = useDelayedUnmount(!isLoaded, FADE_OUT_DURATION);

  useEffect(() => {
    disableBodyScroll(document.body);
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
    setTimeout(() => setIsLoaded(true), LOADING_DURATION);
    setTimeout(() => enableBodyScroll(document.body), LOADING_DURATION);
  }, []);
  return (
    <div css={{ ...body, opacity: fadeIn ? "1.0" : "0.0" }} id="app">
      {isMounted && <Loading show={!isLoaded} />}
      <Router>
        {fadeIn && <Navbar width={width} height={height} />}
        <Paths width={width} />
      </Router>
    </div>
  );
};

const Paths = ({ width }) => {
  // cache images at the top level for quicker load times
  // of course for a larger project i would use Redux or Context to manage this state
  const [homeContent, setHomeContent] = useState();
  const [aboutContent, setAboutContent] = useState();
  const [catalogContent, setCatalogContent] = useState();

  useEffect(() => {
    (async () => {
      const home = await new ContentFetchService("home", "static", "photos");
      const about = await new ContentFetchService("about", "static", [
        "projects", 
        "photos",
      ], "photos");
      const catalog = await new ContentFetchService("about", "static", [
        "music", 
        "photos",
      ], "logo", [
        "video", 
        "photos",
      ]);
      setHomeContent(home);
      setAboutContent(about);
      setCatalogContent(catalog);
    })();
  }, []);

  return (
    <Suspense fallback={<Loading show={false} />}>
      <Switch>
        <Route exact path="/">
          <Home width={width} {...homeContent} />
        </Route>
        <Route path="/about">
          <About width={width} {...aboutContent} />
        </Route>
        <Route path="/catalog">
          <Catalog width={width} {...catalogContent} />
        </Route>
      </Switch>
    </Suspense>
  );
};

Paths.propTypes = {
  width: PropTypes.number,
};

export default App;
