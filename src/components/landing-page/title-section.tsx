type Props = {
  title: string;
  subheading?: string;
  pill: string;
};

const TitleSection = ({ title, subheading, pill }: Props) => {
  return (
    <>
      <section className="flex flex-col items-start justify-center gap-4 md:items-center">
        <article className="rounded-full p-[1px] text-sm dark:from-brand-primaryBlue dark:to-brand-primaryPurple">
          <div className="rounded-full px-3 py-1 dark:bg-black">{pill}</div>
          {subheading ? (
            <>
              <h2 className="text-left text-3xl font-semibold sm:max-w-[750px] sm:text-5xl md:text-center">
                {title}
              </h2>
              <p className="dark:text-washed-purple-700 sm:max-w-[450px] md:text-center">
                {subheading}
              </p>
            </>
          ) : (
            <>
              <h1 className="sm:text-6l text-left text-4xl font-semibold sm:max-w-[850px] md:text-center">
                {title}
              </h1>
            </>
          )}
        </article>
      </section>
    </>
  );
};

export default TitleSection;
