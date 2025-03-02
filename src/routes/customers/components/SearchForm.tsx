import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotField from '@/components/ui/SpotField';
import Button from '@/routes/customers/components/elements/Button';
import { css } from '../../../../styled-system/css';

interface SearchFormProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: boolean;
  setSearchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
}

export default function SearchForm({
  searchString,
  setSearchString,
  searchTrigger,
  setSearchTrigger,
  placeholder = '',
}: SearchFormProps): JSX.Element {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/customers');
    setSearchTrigger(!searchTrigger);
  };

  return (
    <form onSubmit={handleSubmit} className={css({ display: 'flex', alignItems: 'center' })}>
      <SpotField
        inputText={searchString}
        setInputText={setSearchString}
        placeholder={placeholder}
        mergeWrapperStyles={css.raw({ minW: '30rem' })}
      />
      <Button type="submit" className={css({ minW: '3.5rem', ml: '0.25rem' })}>
        検索
      </Button>
    </form>
  );
}
