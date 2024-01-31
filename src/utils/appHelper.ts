export const moneyFormat = (money: string | number) => {
     const formatter = new Intl.NumberFormat("en-US");
     if (!money) return "";
     return formatter.format(+money);
  };
  