import useLoginModal from '@/hooks/useLoginModal';
import { ChangeEvent, useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [
    {
      placeHolder: 'Email',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      value: email,
      disabled: isLoading,
    },
    {
      placeHolder: 'Name',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      value: name,
      disabled: isLoading,
    },
    {
      placeHolder: 'Username',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      value: username,
      disabled: isLoading,
    },
    {
      placeHolder: 'Password',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      value: password,
      disabled: isLoading,
    },
  ];

  const onToogle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // add register later

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  let bodyContent = (
    <div className='flex flex-col gap-4'>
      {inputs.map((input, index) => {
        return (
          <Input
            key={index}
            placeHolder={input.placeHolder}
            onChange={(e) => input.onChange(e)}
            value={input.value}
            disabled={isLoading}
          />
        );
      })}
    </div>
  );

  const footer = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        Already have an account?{' '}
        <span
          onClick={onToogle}
          className='text-white cursor-pointer hover:underline'
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footer}
    />
  );
};

export default RegisterModal;
