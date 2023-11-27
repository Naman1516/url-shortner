type TaglineProps = {
  tagline: string;
};

const MainTagline = (props: TaglineProps) => {
  const { tagline } = props;
  return (
    <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#144ee3] via-[#eb568e] to-[#144ee3] text-transparent bg-clip-text">
      {tagline}
    </h2>
  );
};

export default MainTagline;
