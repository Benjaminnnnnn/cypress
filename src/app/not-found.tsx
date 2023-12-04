type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground">
      <div className="flex gap-2 text-xl">
        <span className="font-semibold">404</span>
        <span className="border-r border-foreground"></span>
        <span className="text-lg font-light">Page Not Found</span>
      </div>
    </div>
  );
};

export default NotFound;
