interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;
interface BasicResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

type Recordable<T> = Record<string, T>;

export type { BasicOption, SelectOption, TabOption, BasicResponse, Recordable };
