export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mois = 0-11
  const year = String(date.getFullYear()).slice(-2); // on garde les 2 derniers chiffres

  return `${day}/${month}/${year}`;
};
