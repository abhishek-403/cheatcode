import { Monitor } from "lucide-react";

export default function ScreeSizeAlert() {
  return (
    <div className="h-screen absolute z-[999] w-full  bg-gray-900 flex items-center justify-center p-6">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden text-center">
        <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-2xl font-light text-white mb-4">
          Please open on desktop
        </h1>
        <p className="text-gray-400 text-sm">
          This app requires a larger screen
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block text-center">
        <h1 className="text-4xl font-light text-white mb-4">Welcome</h1>
        <p className="text-gray-400">Your desktop app is ready</p>
      </div>
    </div>
  );
}
