const useCopyToClipboard = () => {
  const copyToClipboard = async (shortLink: string) => {
    try {
      await navigator.clipboard.writeText(shortLink);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return { copyToClipboard };
};

export default useCopyToClipboard;
