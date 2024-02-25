export const handleClose = (navigation) => {
  return () => {
    navigation.goBack();
  };
};
