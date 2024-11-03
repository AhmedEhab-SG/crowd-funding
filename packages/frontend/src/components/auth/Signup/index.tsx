import { appRoutes } from "../../../config";
import { trim } from "../../../utils/functions/general";
import SectionContainer from "../../shared/SectionContainer";
import Switcher from "../shared/Switcher";
import en from "../../../locales/en.json";
import ButtonStyled from "../../shared/ButtonStyled";
import { useState } from "react";
import Form from "./Form";
const { title, tos, tosDetails } = en.pages.auth.singup;
const { more, less } = en.pages.shared.read;
const { bySigning, privacyPolicy, cookiePolicy, and, termsOfUse } = tos;

const Signup = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <SectionContainer className="items-center">
      <div
        className={trim(`
          flex 
          flex-col
          bg-white
          gap-4 
          border 
          w-full 
          max-w-[400px] 
          p-7 
          rounded-sm`)}
      >
        <Switcher
          title="Have an account?"
          className="border-y-0 border-b pt-0"
          btn={{ title: "Log in", link: `${appRoutes.auth}?ref=login` }}
        />
        <h1 className="text-responsive-2lg">{title}</h1>

        <Form />
        <div
          className={trim(`
            flex 
            flex-col 
            text-gray-500 
            text-responsive-3xs`)}
        >
          <p>
            {bySigning}{" "}
            <ButtonStyled
              size="xs"
              className="p-0 text-blue-600 hover:underline"
              title={privacyPolicy}
              href={appRoutes.home}
            />
            ,{" "}
            <ButtonStyled
              size="xs"
              className="p-0 text-blue-600 hover:underline"
              title={cookiePolicy}
              href={appRoutes.home}
            />
            , {and}{" "}
            <ButtonStyled
              size="xs"
              className="p-0 text-blue-600 hover:underline"
              title={termsOfUse}
              href={appRoutes.home}
            />
            .
          </p>
          {showMore && <p className="mt-2">{tosDetails}</p>}
          <ButtonStyled
            size="xs"
            className="p-0 text-blue-600 self-start hover:underline font-medium"
            title={showMore ? less : more}
            onClick={() => setShowMore(!showMore)}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default Signup;
