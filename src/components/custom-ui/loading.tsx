import React from "react";
import PropTypes from "prop-types";
import { cn } from "@nextui-org/react";

type LoadingVariants = "default" | "dots" | "yellow" | "green";

const Spinner = ({
  isOpen,
  variant = "default",
}: {
  isOpen: boolean;
  variant?: LoadingVariants;
}) => {
  if (!isOpen) return null;

  function loader() {
    switch (variant) {
      case "default":
        return (
          <div className="border-neutral-60 h-8 w-8 animate-spin rounded-full border-4 border-t-neutral-10" />
        );
      case "dots":
        return (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
          </div>
        );
    }
  }

  return <div className="flex justify-center items-center  ">{loader()}</div>;
};

Spinner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(["default", "red", "green", "yellow"]),
};

export default Spinner;
