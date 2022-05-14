import { useState } from 'react';
import axios from 'axios';
import {
  AddRssButton,
  AddRssContainer,
  AddRssInputField,
  AddRssInputFieldContainer,
  AddRssInputFieldHelperText,
} from './AddRss.styled';
import { useSWRConfig } from 'swr';

const AddRss = () => {
  const { mutate } = useSWRConfig();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await axios.post('/rss-feeds', {
        feedUrl: url,
      });
      mutate('/rss-feeds');
      setUrl('');
      setError('');
      alert('RSS feed added successfully');
    } catch (error: any) {
      const errorMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message[0]
        : error.response.data.message;
      setError(errorMessage);
    }
    setIsSubmitting(false);
  };
  return (
    <AddRssContainer onSubmit={handleSubmit}>
      <AddRssInputFieldContainer>
        <AddRssInputField
          placeholder="enter a rss link"
          type="url"
          required
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
        />
        <AddRssInputFieldHelperText error={error}>
          {error}
        </AddRssInputFieldHelperText>
      </AddRssInputFieldContainer>
      <AddRssButton disabled={isSubmitting}>Add</AddRssButton>
    </AddRssContainer>
  );
};

export default AddRss;
