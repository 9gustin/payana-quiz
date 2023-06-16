export interface Question {
  id: number;
  texto: string;
  options: Array<string | number>;
}

export interface Quiz {
  preguntas: Array<Question>;
}
