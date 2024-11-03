import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "../components/auth/Login";
import PageContainer from "../components/shared/PageContainer";
import NotFound from "./NotFound";
import Signup from "../components/auth/Signup";
import useSession from "../hooks/useSession";
import { appRoutes } from "../config";
import { useEffect } from "react";

export default function Auth() {
  const push = useNavigate();
  const [query] = useSearchParams();
  const session = useSession();

  const ref = query.get("ref");

  if (!ref || (ref !== "login" && ref !== "signup")) return <NotFound />;

  useEffect(() => {
    if (session) push(appRoutes.home);
  }, [session, push]);

  return (
    <PageContainer className="bg-gray-100 justify-center">
      {ref === "login" && <Login />}
      {ref === "signup" && <Signup />}
    </PageContainer>
  );
}
