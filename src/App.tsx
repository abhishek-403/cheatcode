import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import RootLayOut, { ProblemLayOut } from "./components/layouts";
import ProblemSet from "./pages/ProblemSet";
import Problem from "./pages/problempage/Problem";
import ProblemPage from "./pages/problempage/Problem";

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
    <RootLayOut>
      <Route exact path="/" component={Home} />
      <Route exact path="/problems" component={ProblemSet} />
      <Route exact path="/problem/:pid" component={ProblemPage} />
    </RootLayOut>
    {/* <ProblemLayOut>
      <Route path={"/problem/:pid"}>
        <Route exact path={"/problem/:pid"}>
          <Redirect to={"/problem/:pid/description"} />
        </Route>
      </Route>
    </ProblemLayOut> */}
  </IonRouterOutlet>
);

export default App;
