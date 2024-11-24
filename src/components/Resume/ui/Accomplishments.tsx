import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

interface Achievement {
  title: string;
  description: string;
}

const Achievements:React.FC<SectionProps> = ({setsection,index}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    { title: "", description: "" },
  ]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateAchievementsHTML(achievements) } : section
    ));
 }, [achievements,index,setsection])
  // Handle input change for each achievement
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
  };

  // Add a new achievement entry
  const addAchievement = () => {
    setAchievements([...achievements, { title: "", description: "" }]);
  };

  // Generate HTML for the achievements section
  const generateAchievementsHTML = (achievementData: Achievement[]) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Key Achievements</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2"/>
        <div class="grid grid-cols-1 gap-2">
          ${achievementData
            .map(
              (achievement) => {
                achievement.description = achievement.description.replace(/\n/g,"<br/>")
                 return`
              <div class="p-2 border border-gray-200 rounded-md">
                <h3 class="text-md font-semibold text-gray-800">
                  ${achievement.title}
                </h3>
                <p class="text-gray-600 mt-1">
                  ${achievement.description}
                </p>
              </div>
            `}
            )
            .join("")}
        </div>
      </section>
    `;
  };

  return (
    <Box>
            <Stack spacing={6}>
              {achievements.map((achievement, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Input
                    placeholder="Achievement Title"
                    value={achievement.title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Achievement Description"
                    value={achievement.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addAchievement}>Add Another Achievement</Button>
            </Stack>
         
    </Box>
  );
};

export default Achievements;
