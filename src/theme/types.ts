export type Theme = {
  colors: {
    bg: string;
    text: string;
    muted: string;
    primary: string;
    border: string;
  };
  spacing: (x: number) => number; // шаговая сетка
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
  font: {
    regular: string;
    medium: string;
    semi: string;
    bold: string;
  };
};
