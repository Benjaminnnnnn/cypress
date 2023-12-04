"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/cypresslogo.svg";

type Props = {};

const routes = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Resources",
    href: "#resources",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = (props: Props) => {
  const [path, setPath] = useState("#products");
  return (
    <header className="flex items-center justify-center px-2 py-6 sm:px-6">
      <Link href="/" className="flex w-full items-center justify-start gap-2">
        <Image src={Logo} alt="Cypress" width={25} height={25}></Image>
        <span className="text-xl font-semibold dark:text-white">cypress.</span>
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-2 lg:gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn(
                {
                  "dark:text-white/80": path === "#resources",
                  "dark:text-white/40": path !== "#resources",
                },
                "font-normal",
                "text-xl",
              )}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-6 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <span
                    className="from-brand-primary-purple to-brand-primary-blue flex h-full w-full
                    select-none flex-col justify-center rounded-md
                    bg-gradient-to-br p-6 no-underline outline-none focus:shadow-md"
                  >
                    Welcom To cypress.
                  </span>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#pricing")}
              className={cn(
                {
                  "dark:text-white/80": path === "#pricing",
                  "dark:text-white/40": path !== "#pricing",
                },
                "font-normal",
                "text-xl",
              )}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:grid-rows-2">
                <ListItem title="Pro Plan" href={"#"}>
                  Unlock full power with collaboration.
                </ListItem>
                <ListItem title={"Free Plan"} href={"#"}>
                  Great for teams just starting out.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#features")}
              className={cn(
                {
                  "dark:text-white/80": path === "#features",
                  "dark:text-white/40": path !== "#features",
                },
                "font-normal",
                "text-xl",
              )}
            >
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"#"} legacyBehavior passHref>
              <NavigationMenuLink
                onClick={() => setPath("#testimonials")}
                className={cn(
                  navigationMenuTriggerStyle(),
                  {
                    "dark:text-white/80": path === "#testimonials",
                    "dark:text-white/40": path !== "#testimonials",
                  },
                  "font-normal",
                  "text-xl",
                )}
              >
                Testimonials
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <aside className="flex w-full items-center justify-end gap-2">
        <Link href="/login">
          <Button variant="btn-secondary" className="p-1">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="btn-primary">Sign Up</Button>
        </Link>
      </aside>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 font-medium leading-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-white/40 group-hover:text-white/80">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
