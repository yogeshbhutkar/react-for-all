import { navigate } from "raviger";
import { useCallback, useEffect } from "react";

export default function About() {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.shiftKey === true) {
      if (event.key === "H") {
        console.log("navigating to /");
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <div>About Page</div>;
}
