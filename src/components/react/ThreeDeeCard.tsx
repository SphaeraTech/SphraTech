import { useTranslations } from "src/i18n/utils";
import { CardBody, CardContainer, CardItem } from "./ui/3D-Card";

export function ThreeDeeCard({ lang, title, description, icon, url }) {
  const t = useTranslations(null, lang);
  return (
    <a href={url} className="w-full">
      <CardContainer className=" rounded-md cursor-pointer">
        <CardBody className="dark-blue-2 flex flex-col justify-between p-6 rounded-2xl">
        <CardItem translateZ="50" className=" text-white ">
  <img src={icon} alt=""  />
</CardItem>
          <CardItem
            translateZ="50"
            className="text-2xl  font-bold text-white "
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-white text-base max-w-sm "
          >
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </a>
  );
}
