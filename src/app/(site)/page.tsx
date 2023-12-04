import TitleSection from "@/components/landing-page/TitleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import CustomCard from "@/components/landing-page/CustomCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { randomUUID } from "crypto";
import AppBanner from "../../../public/appBanner.png";
import Calendar from "../../../public/calendar.png";
import CheckIcon from "../../../public/icons/check.svg";
import Diamond from "../../../public/icons/diamond.svg";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <section className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        ></TitleSection>
        <div className="to-brand-primary-blue from-brand-primary-purple mt-6 rounded-xl bg-gradient-to-r p-[2px] sm:w-[300px]">
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

      <section className="relative mx-auto max-w-full lg:max-w-[70%]">
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
              key={idx}
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
        <div className="bg-brand-primary-purple/50 absolute -z-10 h-32 w-[30%] rounded-full blur-[120px]"></div>
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
        <div className="bg-brand-primary-purple/50 absolute top-56 -z-10 h-32 w-full rounded-full blur-[120px]"></div>
        <div className="mt-20 flex flex-col overflow-visible overflow-x-hidden px-4 sm:px-6">
          <TitleSection
            title="Truested by all"
            subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."
            pill="Testimonials"
          ></TitleSection>
          {[...Array(2)].map((arr, idx) => (
            <div
              className={cn(
                "mt-10 flex flex-nowrap gap-6 self-start",
                {
                  "flex-row-reverse": idx === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": idx === 1,
                  "ml-[100vw]": idx === 1,
                },
                "hover:paused",
              )}
              key={randomUUID()}
              aria-hidden={idx > 0}
            >
              {USERS.map((user, idx) => (
                <CustomCard
                  key={user.name}
                  className="w-[500px] shrink-0 rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background "
                  cardHeader={
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/avatars/${idx + 1}.png`}
                        ></AvatarImage>
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>

                      <div>
                        <CardTitle className="text-foreground">
                          {user.name}
                        </CardTitle>
                        <CardDescription className="dark:text-washed-purple-800">
                          {user.name.toLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="dark:text-washed-purple-800">
                      {user.message}
                    </p>
                  }
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 px-4 pb-6 sm:px-6 sm:pb-10">
        <TitleSection
          title="The Perfect Plan For You"
          subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        ></TitleSection>
        <div className="mt-10 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:items-stretch">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={cn(
                "relative w-[300px] rounded-2xl backdrop-blur-3xl dark:bg-black/40",
                {
                  "border-brand-primary-purple/70":
                    card.planType === PRICING_PLANS.proplan,
                },
              )}
              cardHeader={
                <CardTitle className="text-2xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div className="bg-brand-primary-purple/80 absolute top-0 -z-10 hidden h-32 w-full rounded-full blur-[120px] dark:block"></div>
                      <Image
                        src={Diamond}
                        alt="Pro Plan Icon"
                        className="absolute right-6 top-6"
                      ></Image>
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0">
                  <span className="text-2xl font-normal">${card.price}</span>
                  {+card.price > 0 ? (
                    <span className="ml-1 dark:text-washed-purple-800">
                      /mo
                    </span>
                  ) : (
                    ""
                  )}
                  <p className="dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Button
                    variant="btn-primary"
                    className="mt-4 w-full whitespace-nowrap"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get Started"}
                  </Button>
                </CardContent>
              }
              cardFooter={
                <ul className="mb-2 flex flex-col gap-4 font-normal">
                  <small>{card.highlightFeature}</small>
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Image src={CheckIcon} alt="Check icon"></Image>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              }
            ></CustomCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
