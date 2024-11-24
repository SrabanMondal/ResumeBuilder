import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Textarea
} from "@chakra-ui/react";
import {  SectionProps } from "../Single";

const Summary:React.FC<SectionProps> = ({setsection,index}) => {
  const [summary, setSummary] = useState("");
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateSummaryHTML(summary) } : section
    ));
 }, [summary,index,setsection])

  const generateSummaryHTML = (summaryData:string) => {
    summaryData = summaryData.replace(/\n/g,"<br />")
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Summary</h2>
        <hr class="w-full h-1 bg-black mt-2 mb-2" />
        <p class="text-gray-700 leading-snug text-sm">
          ${summaryData}
        </p>
      </section>
    `;
  };

  return (
    <Box>
            <Stack spacing={4}>
              <Textarea
                name="content"
                placeholder="Enter summary content"
                value={summary}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setSummary(e.target.value)}}
              />
            </Stack>
    </Box>
  );
};

export default Summary;
