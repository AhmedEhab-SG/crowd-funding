import { useSearchParams } from "react-router-dom";
import Login from "../components/auth/Login";
import PageContainer from "../components/shared/PageContainer";
import NotFound from "./NotFound";
import Signup from "../components/auth/Signup";

export default function Auth() {
  const [query] = useSearchParams();

  const ref = query.get("ref");

  if (!ref || (ref !== "login" && ref !== "signup")) return <NotFound />;

  return (
    <PageContainer className="bg-gray-100 justify-center">
      {ref === "login" && <Login />}
      {ref === "signup" && <Signup />}
    </PageContainer>
  );
}
