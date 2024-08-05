import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function ToastProvider() {
  const { toasts } = useToasterStore();
  const limit = 2;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= limit)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, limit]);

  return (
    <Toaster
      position={"top-center"}
      containerClassName="dark"
      containerStyle={{
        zIndex: 999,
      }}
      toastOptions={{
        className:
          "dark:bg-neutral-90 dark:border dark:border-neutral-70 dark:text-neutral-10 ",
      }}
    />
  );
}
