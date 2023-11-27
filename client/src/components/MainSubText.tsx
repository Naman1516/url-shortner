type SubTextProps = {
  subtext: string;
};

const MainSubText = (props: SubTextProps) => {
  const { subtext } = props;
  return (
    <p className="text-[#C9CED6] max-w-xs md:max-w-md lg:max-w-lg text-center text-sm">
      {subtext}
    </p>
  );
};

export default MainSubText;
