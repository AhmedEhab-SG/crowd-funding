import SectionContainer from "../../shared/SectionContainer";
import { trim } from "../../../utils/functions/general";
import ButtonStyled from "../../shared/ButtonStyled";
import { useState } from "react";
import GoogleReCAPTCHA from "./GoogleReCAPTCHA";
import Form from "./Form";
import en from "../../../locales/en.json";
import Switcher from "../shared/Switcher";
import { appRoutes } from "../../../config";

const { title, notify, notifyDetails, or, sginUp } = en.pages.auth.login;
const { more, less } = en.pages.shared.read;

const Login = () => {
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
        <h1 className="text-responsive-2lg">{title}</h1>

        <Form />

        <h5
          className={trim(`
            flex
            items-center
            justify-center
            text-center
            before:content-['']
            before:flex-1
            before:border-b
            before:border
            before:mr-4
            before:mt-0.5
            after:content-['']
            after:flex-1
            after:border-b
            after:border
            after:ml-4
            after:mt-0.5`)}
        >
          {or}
        </h5>

        <div
          className={trim(`
            flex 
            flex-col 
            text-gray-500 
            text-responsive-3xs`)}
        >
          <p>{notify}</p>
          {showMore && <p className="mt-2">{notifyDetails}</p>}
          <ButtonStyled
            size="xs"
            className="p-0 text-blue-600 self-start hover:underline font-medium"
            title={showMore ? less : more}
            onClick={() => setShowMore(!showMore)}
          />
        </div>

        <Switcher
          title={sginUp.new}
          btn={{ title: sginUp.title, link: `${appRoutes.auth}?ref=signup` }}
        />
        <GoogleReCAPTCHA />
      </div>
    </SectionContainer>
  );
};

export default Login;
