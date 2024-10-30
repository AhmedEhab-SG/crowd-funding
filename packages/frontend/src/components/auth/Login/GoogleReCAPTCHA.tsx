import ButtonStyled from "../../shared/ButtonStyled";
import en from "../../../locales/en.json";

const { privacyPolicy, termsOfService, and, apply, protectedBy } =
  en.pages.shared.googleReCAPTCHA;

const GoogleReCAPTCHA = () => {
  return (
    <small className="text-gray-400">
      {protectedBy}{" "}
      <ButtonStyled
        className="text-blue-600 hover:underline"
        target="_blank"
        size="custom"
        href="https://policies.google.com/privacy"
        title={privacyPolicy}
      />{" "}
      {and}{" "}
      <ButtonStyled
        className="text-blue-600 hover:underline"
        target="_blank"
        size="custom"
        href="https://policies.google.com/terms"
        title={termsOfService}
      />{" "}
      {apply}
    </small>
  );
};

export default GoogleReCAPTCHA;
