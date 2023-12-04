type Props = {
  title: string;
  subheading?: string;
  pill: string;
};

const TitleSection = ({ title, subheading, pill }: Props) => {
  return (
    <>
      <section className="flex flex-col items-start justify-center gap-4 px-4 md:items-center">
        <article className="dark:from-brand-primary-blue dark:to-brand-primary-purple rounded-full p-[1px] text-sm dark:bg-gradient-to-r">
          <div className="max-w-max rounded-full px-3 py-1 dark:bg-black">
            {pill}
          </div>
        </article>

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
            <h1 className="text-left text-4xl font-semibold sm:max-w-[850px] sm:text-6xl md:text-center">
              {title}
            </h1>
          </>
        )}
      </section>
    </>
  );
};

export default TitleSection;
