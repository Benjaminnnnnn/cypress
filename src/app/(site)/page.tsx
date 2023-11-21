import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <section className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
      <TitleSection
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      ></TitleSection>
      <div className="mt-6 rounded-xl bg-gradient-to-r from-brand-primaryPurple to-brand-primaryBlue p-[2px] sm:w-[300px]">
        <Button
          variant="secondary"
          className="w-full rounded-[10px] bg-background p-6 text-2xl"
        >
          Get Cypress Free
        </Button>
        {/* <div className="relative ml-[-50px] mt-[-40px] flex w-[750px] items-center justify-center sm:ml-0 sm:w-full md:mt-[-90px]"></div> */}
      </div>
    </section>
  );
};

export default HomePage;
