"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/hooks/useOnboarding";
import { StepIndicator } from "./StepIndicator";
import { StepProfile } from "./StepProfile";
import { StepSearches } from "./StepSearches";
import { StepChannel } from "./StepChannel";
import { Button } from "@/components/ui/Button";

export function OnboardingWizard() {
  const router = useRouter();
  const onboarding = useOnboarding();

  const handleComplete = () => {
    // In a real app, we'd save the onboarding data here
    router.push("/feed");
  };

  const canContinue =
    (onboarding.step === 1 && onboarding.isStep1Valid) ||
    (onboarding.step === 2 && onboarding.isStep2Valid) ||
    onboarding.step === 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-6">
        <StepIndicator
          currentStep={onboarding.step}
          totalSteps={onboarding.totalSteps}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={onboarding.step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {onboarding.step === 1 && (
              <StepProfile
                profile={onboarding.profile}
                onUpdate={onboarding.updateProfile}
              />
            )}

            {onboarding.step === 2 && (
              <StepSearches
                searches={onboarding.searches}
                onUpdate={onboarding.updateSearch}
                onAdd={onboarding.addSearch}
                onRemove={onboarding.removeSearch}
                onAddZip={onboarding.addZipCode}
                onRemoveZip={onboarding.removeZipCode}
                onTogglePropertyType={onboarding.togglePropertyType}
              />
            )}

            {onboarding.step === 3 && (
              <StepChannel
                channel={onboarding.channel}
                onSelect={onboarding.setChannel}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {onboarding.step > 1 ? (
            <Button variant="ghost" onClick={onboarding.goBack}>
              &larr; Back
            </Button>
          ) : (
            <div />
          )}

          {onboarding.step < onboarding.totalSteps ? (
            <Button onClick={onboarding.goNext} disabled={!canContinue}>
              Continue &rarr;
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              Start Finding Deals &rarr;
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
