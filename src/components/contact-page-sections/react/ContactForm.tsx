import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TailwindButton from "../../react/ui/Button";
import { Input } from "../../react/ui/input";
import { Label } from "../../react/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../react/ui/select";
import { Textarea } from "../../react/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../react/ui/alert-dialog";
import { Button } from "../../react/ui/FormButton";

// The form data types
export interface FormData {
  clientType: string;
  budget: string;
  services: string;
  projects: string;
  name: string;
  email: string;
  phone: string;
}

// The steps of the form
const steps = [
  {
    id: 1,
    name: "Qui êtes vous ? ",
    fields: ["clientType"],
  },
  {
    id: 2,
    name: "Qu'est ce qu'on peut faire pour vous ? ",
    fields: ["services"],
  },
  {
    id: 3,
    name: "Racontez-nous votre projet en quelques mots...",
    fields: ["project"],
  },
  {
    id: 4,
    name: "Quel est votre budget ? ",
    fields: ["budget"],
  },
  {
    id: 5,
    name: "Comment vous contacter ?",
    fields: ["name", "email", "phone"],
  },
  {
    id: 6,
    name: "C'est parti ! On s'en occupe 💼",
    fields: [],
  },
];

export default function ContactForm() {
  // Managing the current step, form submission status, and alert dialog with useState
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: "onChange",
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await fetch("/api/email.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        handleNext();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  // Handle navigation to the next step
  const handleNext = async () => {
    const currentFields = steps[currentStep].fields;
    const isStepValid = await trigger(currentFields as Array<keyof FormData>);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Handle navigation to the previous step
  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Get the fields for the current step
  const currentStepFields = steps[currentStep].fields;

  // Check if the next button should be disabled
  const isNextDisabled = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.some((field) => !!errors[field as keyof FormData]);
  };

  return (
    <div className="flex justify-center flex-col items-center w-full h-screen   bg-[url('/public/blue-red-blue-background.png')] bg-cover bg-center">
      <h1 className="text-4xl sm:text-7xl font-bold relative mb-10 z-20 bg-clip-text text-white w-2/4 text-left ml-5">
        Contact us
      </h1>
      <div className="bg-black/20 border-2 border-white z-10  shadow-md rounded-2xl p-6 w-full md:w-1/2 backdrop-blur-lg">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.slice(0, -1).map((step, index) => (
              <div key={step.id} className="flex items-center justify-space">
                <div
                  className={`p-2 w-full rounded-full flex items-center justify-center text-[20px] md:text-base ${
                    index <= currentStep
                      ? "bg-[#ff2121]/70 text-white"
                      : " text-white border-white border-2 "
                  }`}
                >
                  <span className="hidden md:block">Step {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Animated container for each step */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep < steps.length - 1 ? (
              // Form fields for each step
              <div className="flex flex-col items-center gap-4 md:block">
                <h3 className="text-xl font-[600] text-white mb-4">
                  <span className="text-[#ff2121]/70">{currentStep + 1}.</span>{" "}
                  {steps[currentStep].name}
                </h3>
                {currentStepFields.includes("clientType") && (
                  <div className="mb-4 w-[90%]  md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("clientType", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Une entreprise / Collectivité",
                          "Un particulier",
                          "Indépendant / Artiste / Créateur",
                          "Une association / ONG",
                        ].map((clienType, i) => (
                          <SelectItem key={i} value={clienType}>
                            {clienType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.clientType && (
                      <p className="text-sm text-red-500 mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("services") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("services", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Vidéo / Photo",
                          "Site web",
                          "Réseaux sociaux",
                          "Graphisme",
                          "Stratégie",
                          "Autre",
                        ].map((service, i) => (
                          <SelectItem key={i} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.services && (
                      <p className="text-sm text-red-500 mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("features") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Label className="text-black">
                      Donnez-nous le maximum de détails ( sur vous, la
                      prestation attendu, les delais, le nombre de photos, la
                      longueur de la vidéo, Etc...)
                    </Label>
                    <Textarea
                      {...register("projects")}
                      placeholder="Votre message..."
                    />
                    {errors.projects && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.projects.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("budget") && (
                  <div className="mb-4 w-[90%] rounde md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("budget", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "1 000 € à 2 000 €",
                          "2 000 € à 5 000 €",
                          "5 000 € à 10 000 €",
                          "+ 10 000 €",
                        ].map((budget, i) => (
                          <SelectItem key={i} value={budget}>
                            {budget}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-sm text-red-500 mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("name") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      placeholder="Votre nom*"
                      id="name"
                      {...register("name", {
                        required: "Le nom est obligatoire",
                      })}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("email") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      placeholder="Votre adresse email*"
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "L'adresse email est obligatoire",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Adresse email invalide",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("phone") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      id="phone"
                      placeholder="Votre numéro de téléphone*"
                      type="tel"
                      {...register("phone", {
                        required: "Le numéro de téléphone est obligatoire",
                        pattern: {
                          value: /^\+?[0-9]\d{9,14}$/,
                          message: "Numéro de téléphone invalide",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Final step content
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  C&apos;est parti !<br /> On s&apos;en occupe 💼{" "}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Vous recevrez un devis dans moins de 24h. Vous voulez une
                  réponse express ? programmez un rendez-vous téléphonique :
                </p>
              </div>
            )}
          </motion.div>
          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep < steps.length - 1 ? (
              <>
                <Button
                  className="text-black bg-white border-2 hover:bg-black hover:text-white rounded-full text-[10px] md:text-base"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < steps.length - 2 ? (
                  <Button
                    className="text-white bg-[#ff2121]/70 hover:bg-[#ff2121]/50 hover:text-white rounded-full text-[10px] md:text-base"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="text-[#D33E6B] bg-white border-[#D33E6B] border-2 hover:bg-[#D33E6B] hover:text-white rounded-full text-[10px] md:text-base"
                    type="submit"
                    disabled={isNextDisabled()}
                  >
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <Button type="button" className="mx-auto">
                <a href="https://calendly.com/yanis-vanitycorp/30min">
                  ☕ Programmer un rendez-vous{" "}
                </a>
              </Button>
            )}
          </div>
        </form>
      </div>
      {/* Alert Dialog for notifications */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
