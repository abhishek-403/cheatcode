import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRouterOutlet,
  IonRow,
} from "@ionic/react";
import Navbar from "./navbar";
import Home from "../pages/Home";

export default function RootLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IonPage>
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <IonContent>{children}</IonContent>
      </div>
    </IonPage>
  );
}

export function ProblemLayOut({ children }: { children: React.ReactNode }) {
  return (
    <IonPage>
      <div className="flex h-full w-full flex-col">
        <IonContent>{children}</IonContent>
      </div>
    </IonPage>
  );
}
