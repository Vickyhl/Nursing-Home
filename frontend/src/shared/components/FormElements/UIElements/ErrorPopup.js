import { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorPopup({ message }) {
  useEffect(() => {
    console.log("Message:", message);
    if (message) {
      // Display the error message in a toast notification
      toast.error(message);
    }
  }, [message]);

  return null;
}

export default ErrorPopup;
