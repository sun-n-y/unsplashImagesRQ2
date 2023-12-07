import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const key = import.meta.env.VITE_ACCESS_KEY;

const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=cat`;

const Gallery = () => {
  const { data } = useQuery({
    queryKey: ['photos'],
    queryFn: () => axios.get(url),
  });

  if (!data) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div className="image-container">
      {data.data.results.map((item) => {
        const { urls, alt_description: desc, id } = item;
        return <img key={id} src={urls.regular} alt={desc} className="img" />;
      })}
    </div>
  );
};
export default Gallery;
