interface InputProps {
  placeHolder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeHolder,
  value,
  type,
  disabled,
}) => {
  return (
    <input
      placeholder={placeHolder}
      disabled={disabled}
      value={value}
      type={type}
      className=' w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed'
    ></input>
  );
};

export default Input;
