type TaglineProps = {
  tagline: string;
};

const MainTagline = (props: TaglineProps) => {
  const { tagline } = props;
  return (
    <h2 className="text-2xl lg:text-4xl font-bold">
      {tagline}
    </h2>
  );
};

export default MainTagline;
