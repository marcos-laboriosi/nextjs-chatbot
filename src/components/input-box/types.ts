export interface InputBoxProps {
  submit: () => void;
  onInput: (text: string) => void;
  value: string;
  id: string;
  placeholder?: string;
}
