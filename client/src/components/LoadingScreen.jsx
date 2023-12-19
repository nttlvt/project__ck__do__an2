import { useContext, useEffect } from "react";
import Spinner from "./Admin/Spinner";
import { Context } from "../context";

export default function LoadingScreen() {
  const context = useContext(Context);
  useEffect(() => {
    if (context.loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [context.loading]);
  return context.loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 opacity-70">
      <Spinner number={2} />
    </div>
  ) : null;
}
