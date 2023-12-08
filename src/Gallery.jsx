import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const key = import.meta.env.VITE_ACCESS_KEY;

const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=cat`;

const Gallery = () => {
  const response = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const result = await axios.get(url);
      return result;
    },
  });

  if (response.isLoading) {
    return (
      <div className="image-container">
        <div className="loading"></div>
      </div>
    );
  }

  if (response.isError) {
    return (
      <div className="image-container">
        <h4>there was an error...</h4>;
      </div>
    );
  }

  if (response.data.data.results.length < 1) {
    return (
      <div className="image-container">
        <h4>no results found...</h4>
      </div>
    );
  }

  return (
    <div className="image-container">
      {response.data.data.results.map((item) => {
        const { urls, alt_description: desc, id } = item;
        return <img key={id} src={urls?.regular} alt={desc} className="img" />;
      })}
    </div>
  );
};
export default Gallery;
