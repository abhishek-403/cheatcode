import React from "react";
import PropTypes from "prop-types";
import { cn } from "@nextui-org/react";

type LoadingVariants = "default" | "dots" ;

const Spinner = ({
  isOpen = true,
  variant = "default",
  size = 20,
}: {
  isOpen?: boolean;
  variant?: LoadingVariants;
  size?: number;
}) => {
  function loader() {
    switch (variant) {
      case "default":
        return (
          <div
            style={{
              height: size,
              width: size,
            }}
            className={`border-neutral-60  animate-spin rounded-full border-4 border-t-neutral-10`}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <div
              style={{
                height: size,
                width: size,
              }}
              className={`bg-white rounded-full animate-bounce [animation-delay:-0.3s]`}
            ></div>
            <div
              style={{
                height: size,
                width: size,
              }}
              className={`bg-white rounded-full animate-bounce [animation-delay:-0.15s]`}
            ></div>
            <div
              style={{
                height: size,
                width: size,
              }}
              className={`bg-white rounded-full animate-bounce`}
            ></div>
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
