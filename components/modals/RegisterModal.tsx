import useLoginModal from '@/hooks/useLoginModal';
import { ChangeEvent, useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

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
      placeholder: 'Email',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      disabled: isLoading,
      value: email,
    },
    {
      placeholder: 'Name',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      disabled: isLoading,
      value: name,
    },
    {
      placeholder: 'Username',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      disabled: isLoading,
      value: username,
    },
    {
      placeholder: 'Password',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      disabled: isLoading,
      value: password,
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

      await axios.post('/api/register', { email, password, username, name });
      toast.success('Account created.');

      signIn('credentials', { email, password });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  let bodyContent = (
    <div className='flex flex-col gap-4'>
      {inputs.map((input, index) => {
        return <Input key={index} {...input} />;
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
