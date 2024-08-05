import {
  checkmarkCircleOutline,
  chevronDownOutline,
  closeOutline,
} from "ionicons/icons";
import useLocalStorage from "../../hooks/useLocation";
import { IonIcon } from "@ionic/react";
import { EDITOR_FONT_SIZES_OPTIONS, LS_SETTINGS } from "../constants/constants";

const CodeEditorSettingModal = ({ setSettings, settings }: any) => {
  const [fontSize, setFontSize] = useLocalStorage(LS_SETTINGS.fontSize, "16px");

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSettings({
      ...settings,
      dropdownIsOpen: !settings.dropdownIsOpen,
    });
  };
  return (
    <div className="text-white z-40 absolute">
      <div
        aria-modal="true"
        role="dialog"
        className="fixed inset-0 overflow-y-auto z-modal"
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          {/* overlay */}
          <div
            className="opacity-100"
            onClick={() =>
              setSettings({ ...settings, settingsModalIsOpen: false })
            }
          >
            <div className="fixed inset-0 bg-gray-8 opacity-60"></div>
          </div>

          <div className="my-8 inline-block min-w-full transform rounded-[13px] text-left transition-all bg-overlay-3 md:min-w-[420px] shadow-level4 shadow-lg border border-neutral-70 p-0 bg-[rgb(40,40,40)] w-[600px] !overflow-visible opacity-100 scale-100">
            {/* setting header */}
            <div className="flex font-bold items-center border-b px-5 py-3 text-lg   border-dark-divider-border-2">
              Settings
              <button
                className="ml-auto cursor-pointer rounded transition-all"
                onClick={() =>
                  setSettings({ ...settings, settingsModalIsOpen: false })
                }
              >
                <IonIcon icon={closeOutline} />
              </button>
            </div>

            <div className="px-6 pt-4 pb-6">
              <div className="mt-6 flex justify-between first:mt-0">
                <div className="w-[340px]">
                  <h3 className=" text-base font-semibold">Font size</h3>
                  <h3 className="mt-1 text-neutral-30 text-sm">
                    Choose your preferred font size for the code editor.
                  </h3>
                </div>
                <div className="w-[170px]">
                  <div className="relative">
                    <button
                      onClick={handleClickDropdown}
                      className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between"
                      type="button"
                    >
                      {fontSize}
                      <IonIcon icon={chevronDownOutline} />
                    </button>
                    {settings.dropdownIsOpen && (
                      <ul
                        className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1"
                        style={{
                          filter:
                            "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
                        }}
                      >
                        {EDITOR_FONT_SIZES_OPTIONS.map((fontSize, idx) => (
                          <SettingsListItem
                            key={idx}
                            setSettings={setSettings}
                            fontSize={fontSize}
                            selectedOption={settings.fontSize}
                            handleFontSizeChange={(fontSize: any) => {
                              setFontSize(fontSize);
                              setSettings({ ...settings, fontSize: fontSize });
                            }}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsListItemProps {
  fontSize: string;
  selectedOption: string;
  setSettings: any;
  handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem = ({
  fontSize,
  selectedOption,
  setSettings,
  handleFontSizeChange,
}: any) => {
  return (
    <li className="relative flex h-8 cursor-pointer select-none py-2 pl-2 text-label-2  hover:bg-dark-fill-3 rounded-lg">
      <div
        className={`flex h-5 flex-1 items-center pr-2 ${
          selectedOption === fontSize ? "font-medium" : ""
        }`}
        onClick={() => {
          handleFontSizeChange(fontSize);
          setSettings((prev: any) => ({ ...prev, dropdownIsOpen: false }));
        }}
      >
        <div className="whitespace-nowrap">{fontSize}</div>
      </div>
      <span
        className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
          selectedOption === fontSize ? "visible" : "invisible"
        }`}
      >
        <IonIcon icon={checkmarkCircleOutline} />
      </span>
    </li>
  );
};

export default CodeEditorSettingModal;
