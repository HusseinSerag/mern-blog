import { useNavigate } from "react-router-dom";

export default function useGo() {
  const navigate = useNavigate();

  function go(destination: string | number | undefined) {
    if (destination) {
      if (typeof destination === "string") navigate(destination);
      else navigate(destination);
    } else navigate(-1);
  }

  return go;
}
