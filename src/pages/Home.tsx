import { IonIcon, useIonRouter } from "@ionic/react";
import { flashOutline } from "ionicons/icons";
import { PrimaryButton } from "../components/custom-ui/button";
const Home: React.FC = () => {
  const navigate = useIonRouter();
  return (
    <div className="flex flex-col h-full bg-gradient-to-tr from-neutral-90 via-[#121212] to-black items-center justify-center">
      <div className="text-white  flex gap-2 flex-col  items-center justify-center">
        <div className="font-rubik text-8xl font-bold ">
          <span className="text-white  ">CHEAT</span>
          <span className="text-multi">CODE</span>
        </div>
        <div className="font-inter text-3xl font-bold flex gap-[9px] ">
          {/* <div className="text-white">You can </div> */}
          <div className="text-red-300 ">
            {/* <Typewriter
              words={["cheat while you learn!", "learn while you cheat!"]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={25}
            /> */}
          </div>
        </div>
        <Card />

        <div className="mt-2" onClick={() => navigate.push("/problems")}>
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
function Card() {
  return (
    <div className="flex items-center justify-center  m-4">
      <div className="bg-gradient-to-bl from-neutral-90  to-neutral-95  p-4 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-neutral-0 mb-4">
          One Place for All the DSA Sheets
        </h1>
        <p className="text-neutral-40 ">
          Access all your DSA sheets at one convenient platform.
        </p>
      </div>
    </div>
  );
}

export default Home;
