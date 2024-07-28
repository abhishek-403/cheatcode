import { IonIcon, useIonRouter } from "@ionic/react";
import { flashOutline } from "ionicons/icons";
import { Typewriter } from "react-simple-typewriter";
import { PrimaryButton } from "../components/custom-ui/button";
const Home: React.FC = () => {
  const navigate = useIonRouter();
  return (
    <div className=" bg-neutral-90 flex h-full  items-center justify-center">
      <div className="text-white  flex gap-5 flex-col items-center justify-center">
        <div className="font-rubik text-8xl font-bold ">
          <span className="text-[#8770fd]  ">CHEAT</span>
          <span className="text-white">CODE</span>
        </div>
        <div className="font-salsa text-4xl flex gap-[9px] ">
          <div className="text-white">You can </div>
          <div className="text-pink-300 ">
            <Typewriter
              words={["cheat while you learn!", "learn while you cheat!"]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={25}
            />
          </div>
        </div>
        <div className="mt-5" onClick={() => navigate.push("/problems")}>
          <PrimaryButton
            title="Get Started"
            icon={
              <IonIcon icon={flashOutline} style={{ height: 24, width: 24 }} />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
