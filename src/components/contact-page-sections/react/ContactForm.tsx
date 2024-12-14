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
import { useTranslations } from "src/i18n/utils";

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

export default function ContactForm({ lang }) {
  const t = useTranslations(null, lang);
  // Managing the current step, form submission status, and alert dialog with useState
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });
  const steps = [
    {
      id: 1,
      name: t("contact").questions[0],
      fields: ["clientType"],
    },
    {
      id: 2,
      name: t("contact").questions[1],
      fields: ["services"],
    },
    {
      id: 3,
      name: t("contact").questions[2],
      fields: ["projects"],
    },
    {
      id: 4,
      name: t("contact").questions[3],
      fields: ["budget"],
    },
    {
      id: 5,
      name: t("contact").questions[4],
      fields: ["name", "email", "phone"],
    },
    {
      id: 6,
      name: t("contact").questions[5],
      fields: [],
    },
  ];

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
        {t("contact").title}
      </h1>
      <div className="bg-black/20 border-2 border-white z-10  shadow-md rounded-2xl p-6 w-full md:w-1/2 backdrop-blur-lg">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="relative w-full h-4 bg-gray-300 rounded-full">
            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 h-4 bg-[#ff2121]/70 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
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
                      {...register("clientType", {
                        required: "Client type is required",
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("contact").buttons.selectOption}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {t("contact").steps.first.map((clienType, i) => (
                          <SelectItem key={i} value={clienType}>
                            {clienType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.clientType && (
                      <p className="text-sm text-red-500 mt-1">
                        {t("contact").Label.warning}
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
                      {...register("services", {
                        required: "Please select a service",
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("contact").buttons.selectOption}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {t("contact").steps.second.map((service, i) => (
                          <SelectItem key={i} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.services && (
                      <p className="text-sm text-red-500 mt-1">
                        {t("contact").Label.warning}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("projects") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Label className="text-white">
                      {t("contact").steps.third.message}
                    </Label>
                    <br />
                    <br />
                    <Textarea
                      {...register("projects", {
                        required: "Please describe your project",
                        minLength: {
                          value: 10,
                          message:
                            "Please provide more details (min. 10 characters)",
                        },
                      })}
                      placeholder={t("contact").steps.third.placeHolder}
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
                      {...register("budget", {
                        required: "Please select a budget range",
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("contact").buttons.selectOption}
                        />
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
                        {t("contact").Label.warning}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("name") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      placeholder={t("contact").steps.final.placeHolders.name}
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
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
                      placeholder={t("contact").steps.final.placeHolders.email}
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email address",
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
                      placeholder={
                        t("contact").steps.final.placeHolders.phoneNumber
                      }
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[0-9]{9,14}$/,
                          message: "Invalid phone number format",
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
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  {t("contact").steps.final.message[0]}
                </h3>
                <p className="text-lg text-white mb-6">
                  {t("contact").steps.final.message[1]}
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
                  {t("contact").buttons.previous}
                </Button>
                {currentStep < steps.length - 2 ? (
                  <Button
                    className="text-white bg-[#ff2121]/70 hover:bg-[#ff2121]/50 hover:text-white rounded-full text-[10px] md:text-base"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                  >
                    {t("contact").buttons.next}
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
              ""
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
