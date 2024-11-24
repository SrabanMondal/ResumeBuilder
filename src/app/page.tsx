import Nav from "@/components/Home/Nav"
import Section from "@/components/Home/Section"
import Feature from "@/components/Home/Feature"
import Footer from "@/components/Home/Footer"
import Join from "@/components/Home/Join"
import { Box } from "@chakra-ui/react"
export default function Component() {
  return (
    <Box className="flex flex-col min-h-screen" bgColor={'black'} minW={'-webkit-fill-available'}>
      <Nav/>
      <main>
        <Section/>
        <Feature/>
        <Join/>
        <Footer/>
      </main>
    </Box>
  )
}
