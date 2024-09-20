export enum ETagTypes {
  CONDITIONAL = 'CONDITIONAL',
  INPUT = 'INPUT',
  MODEL = 'MODEL',
}

export interface ITag {
  id: string;
  name: string;
  type: ETagTypes;
}
