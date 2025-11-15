"use client";

import React, { useState } from "react";
// We'll keep useRouter, but we won't call it immediately
import { useRouter } from "next/navigation"; 

// This is your existing premium UI component
// import { BackgroundBeams } from "@/components/ui/background-beams";

// Define the Template type
type Template = {
  id: number;
  name: string;
  image: string; // This should be the path to your image, e.g., /resume1.jpg
};

// --- TEMPLATE DATA ---
// Using your original data.
const templates: Template[] = [
  { id: 1, name: "Single Layout", image: "/resume1.jpg" },
  { id: 2, name: "Dual Layout", image: "/resume2.jpg" },
  { id: 3, name: "Triple Layout", image: "/resume3.jpg" },
  // Let's add more to show how the grid handles it
//   { id: 4, name: "Modern Chrono", image: "https://placehold.co/400x560/1a1a2e/ffffff?text=Modern+Chrono" },
//   { id: 5, name: "Academic", image: "https://placehold.co/400x560/2a2a3e/ffffff?text=Academic" },
//   { id: 6, name: "Creative", image: "https://placehold.co/400x560/3a3a4e/ffffff?text=Creative" },
   ];

// --- MAIN COMPONENT ---
export default function TemplateSelector() {
  const router = useRouter();
  
  // This state is now crucial. We select FIRST, then navigate.
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  /**
   * This function ONLY sets the state. It doesn't navigate.
   */
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  /**
   * This function handles the final navigation.
   * It's called by the "Continue" button.
   */
  const handleContinue = () => {
    if (!selectedTemplate) return; // Guard clause

    // Navigate to the resume builder page with the selected template name
    router.push(`/resume/${selectedTemplate.name.split(' ')[0]}`); 
    console.log(`Navigating to /resume/${selectedTemplate.name.split(' ')[0]}`); // Placeholder
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden bg-gray-950 text-gray-100 p-4 md:p-8">
      {/* BackgroundBeams is now a subtle, full-screen effect */}
      {/* <BackgroundBeams className="absolute inset-0 z-0 opacity-30" /> */}
      
      {/* All content is on a higher z-index to be above the beams */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto my-12 md:my-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Choose Your Template
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Select a professionally designed template to get started.
          </p>
        </div>

        {/* --- TEMPLATE GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {templates.map((template) => {
            const isSelected = selectedTemplate?.id === template.id;

            return (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={isSelected}
                onSelect={() => handleTemplateSelect(template)}
              />
            );
          })}
        </div>

        {/* --- ACTION BUTTON --- */}
        <div className="mt-16 md:mt-24 text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`
              w-full sm:w-auto px-12 py-4 text-lg font-semibold rounded-lg shadow-lg
              transition-all duration-300 ease-in-out
              ${!selectedTemplate
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white transform hover:scale-105 hover:shadow-blue-500/50'
              }
            `}
          >
            {selectedTemplate
              ? `Use ${selectedTemplate.name}`
              : 'Select a Template to Continue'}
          </button>
        </div>

      </div>
    </div>
  );
}


// --- Template Card Component ---
// Breaking the card into its own component makes the code much cleaner.
type TemplateCardProps = {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
};

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative rounded-xl bg-gray-900 border 
        transition-all duration-300 ease-in-out cursor-pointer group
        ${isSelected
          ? 'ring-2 ring-blue-500 border-transparent shadow-2xl shadow-blue-500/30' // --- SELECTED STATE
          : 'border-gray-800 hover:border-gray-700 hover:shadow-lg' // --- DEFAULT STATE
        }
      `}
    >
      {/* --- Checkmark Icon --- */}
      <div
        className={`
          absolute top-4 right-4 z-10 p-1 bg-blue-500 rounded-full
          transition-all duration-30S0 ease-in-out
          ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      {/* --- Image Container --- */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={template.image}
          alt={`${template.name} template`}
          
          className={`
            w-full h-auto aspect-[3/4] object-cover object-top
            transition-transform duration-500 ease-in-out
            ${isSelected ? 'scale-105' : 'group-hover:scale-105'}
          `}
        />
      </div>

      {/* --- Name --- */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          {template.name}
        </h3>
      </div>
    </div>
  );
}