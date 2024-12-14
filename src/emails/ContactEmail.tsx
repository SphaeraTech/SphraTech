import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";
import type { FormData } from "@components/contact-page-sections/react/ContactForm";

export const ContactRequestEmail = ({
  clientType,
  budget,
  services,
  projects,
  name,
  email,
  phone,
}: FormData) => (
  <Html>
    <Head />
    <Preview>Nouvelle demande de devis de {name}</Preview>
    <Tailwind>
      <Body className="bg-gray-100 p-6">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://res.cloudinary.com/dofo65qnb/image/upload/v1734065855/mainLogo_zlwslp.webp"
              alt="Cat"
              width="100"
              height="100"
              className="my-0 mx-auto"
            />
          </Section>
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Nouvelle demande de devis
          </Heading>

          <Text className="text-base mb-4">
            Vous avez reçu une nouvelle demande de devis de{" "}
            <strong>{name}</strong>. Voici les détails :
          </Text>

          <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 border-b text-left">Question</th>
                <th class="py-2 px-4 border-b text-left">Réponse</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2 px-4">
                  <strong>1. Qui êtes-vous ?</strong>
                </td>
                <td class="py-2 px-4">{clientType}</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 px-4">
                  <strong>2. Qu’est-ce qu’on peut faire pour vous ?</strong>
                </td>
                <td class="py-2 px-4">{services}</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 px-4">
                  <strong>
                    3. Racontez-nous votre projet en quelques mots...
                  </strong>
                </td>
                <td class="py-2 px-4">{projects}</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 px-4">
                  <strong>4. Quel est votre budget ?</strong>
                </td>
                <td class="py-2 px-4">{budget}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">
                  <strong>5. Comment vous contacter ?</strong>
                </td>
                <td class="py-2 px-4">
                  Email : {email}, Téléphone : {phone}
                </td>
              </tr>
            </tbody>
          </table>

          <Hr className="border-gray-400 my-4" />
          <Text className="text-gray-600 text-xs">
            Cet email a été envoyé depuis votre application d&apos;estimation de
            devis.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactRequestEmail;
