export const getPageTitle = (pageTitle: string) => {
  return [pageTitle, 'Saad Tazi'].filter((v) => !!v).join(' = ');
};
