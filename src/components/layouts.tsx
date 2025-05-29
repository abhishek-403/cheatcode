import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, RouteProps } from "react-router";
import Navbar from "./navbar";
import ScreeSizeAlert from "./screensize-alert";

interface ProblemLayoutProps extends RouteProps {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (window.innerWidth < 768) {
    return <ScreeSizeAlert />;
  }
  return (
    <IonPage>
      <div className="flex h-full w-full flex-col ">
        <Navbar />
        <IonContent>{children}</IonContent>
      </div>
    </IonPage>
  );
}

export function ProblemLayout({ children }: { children: React.ReactNode }) {
  return <IonRouterOutlet>{children}</IonRouterOutlet>;
}

export const LayoutRoute: React.FC<ProblemLayoutProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);
