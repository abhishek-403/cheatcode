import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/palettes/dark.system.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import RootLayout, { LayoutRoute, ProblemLayout } from "./components/layouts";
import ProblemSet from "./pages/ProblemSet";
import ProblemPage from "./pages/problempage/Problem";
import Profile from "./pages/profilepage/Profile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Routes />
    </IonReactRouter>
  </IonApp>
);

const Routes = () => (
  <IonRouterOutlet>
    <RootLayout>
      <Route exact path="/" component={Home} />
      <Route exact path="/problems" component={ProblemSet} />
      <Route exact path="/profile/:userName" component={Profile} />
    </RootLayout>
    <LayoutRoute
      component={ProblemPage}
      layout={ProblemLayout}
      path="/problem/:problemId"
      exact
    />
  </IonRouterOutlet>
);

export default App;
