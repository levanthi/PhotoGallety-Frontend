import axios from 'axios';
import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Loading from './Components/Loading';
import PhotoItems from './Components/PhotoItem';
function App() {
   const [photos, setPhotos] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      setIsLoading(true);
      axios
         .get('http://localhost:3001')
         .then((res) => {
            const apiPhotos = res.data;
            apiPhotos.forEach((photo) => {
               photo.data = new Buffer(photo.data).toString('base64');
            });
            setPhotos(apiPhotos);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, []);
   return (
      <>
         <Header setPhotos={setPhotos} photos={photos}></Header>
         <div className="row body">
            {isLoading && <Loading position="absolute" />}
            {photos.map((item, index) => {
               return <PhotoItems src={item.data} key={item._id} />;
            })}
         </div>
      </>
   );
}

export default App;
