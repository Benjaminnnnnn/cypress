import TitleSection from "@/components/landing-page/TitleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { CLIENTS } from "@/lib/constants";
import AppBanner from "../../../public/appBanner.png";
import Calendar from "../../../public/calendar.png";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
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
        </div>
        <div className="relative ml-[-50px] mt-[-40px] flex w-[750px] items-center justify-center sm:ml-0 sm:w-full md:mt-[-90px]">
          <Image src={AppBanner} alt="Application banner"></Image>
          <div className="absolute bottom-0 left-0 right-0 top-1/2 z-10 bg-gradient-to-t dark:from-background"></div>
        </div>
      </section>

      <section className="relative mx-auto max-w-screen-2xl">
        <div
          className="
          flex
          overflow-hidden
          before:absolute
          before:bottom-0
          before:left-0
          before:top-0
          before:z-10
          before:w-20
          before:bg-gradient-to-r
          before:from-background
          before:to-transparent
          before:content-['']
          after:absolute

          after:bottom-0
          after:right-0
          after:top-0
          after:z-10
          after:w-20
          after:bg-gradient-to-l
          after:from-background
          after:to-transparent
          after:content-['']
        "
        >
          {[...Array(2)].map((arr, idx) => (
            <div
              key={arr}
              className="animate-slide
                flex
                flex-nowrap
          "
              aria-hidden={idx > 0}
            >
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className=" relative
                    m-20
                    flex
                    w-[200px]
                    shrink-0
                    items-center
                  "
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    className="max-w-none object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="absolute -z-10 h-32 w-[30%] rounded-full bg-brand-primaryPurple/50 blur-[120px]"></div>
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
          pill="Features"
        ></TitleSection>
        <div className="relative mt-10 flex max-w-[450px] items-center justify-center rounded-2xl border-8 border-washed-purple-300 border-opacity-10 sm:ml-0">
          <Image src={Calendar} alt="Banner" className="rounded-2xl"></Image>
        </div>
      </section>

      <section className="relative">
        <div className="absolute top-56 -z-10 h-32 w-full rounded-full bg-brand-primaryPurple/50 blur-[120px]"></div>
        <div className="mt-20 flex flex-col overflow-visible overflow-x-hidden px-4 sm:px-6"></div>
        <TitleSection
          title="Truested by all"
          subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."
          pill="Testimonials"
        ></TitleSection>
      </section>
    </>
  );
};

export default HomePage;
