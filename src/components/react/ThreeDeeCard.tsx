import { useTranslations } from "src/i18n/utils";
import { CardBody, CardContainer, CardItem } from "./ui/3D-Card";

export function ThreeDeeCard({ lang, title, description, icon, url }) {
  const t = useTranslations(null, lang);
  return (
    <a href={url}>
      <CardContainer className="inter-var p-2 dark-blue-1 border-white border-2 cursor-pointer ">
        <CardBody className="card dark-blue-1 ">
          <CardItem translateZ="50" className="pt-2 pb-2 dark:text-white">
            <img src={icon} alt="" width={"90px"} />
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-2xl pt-2 pb-2 font-bold dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="dark:text-white text-base max-w-sm mt-2 "
          >
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </a>
  );
}
