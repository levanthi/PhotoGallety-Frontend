import axios from 'axios';
import { Buffer } from 'buffer';
import { useEffect, useState, createContext } from 'react';
import Header from './Components/Header';
import Loading from './Components/Loading';
import PhotoItems from './Components/PhotoItem';

const Context = createContext();

function App() {
   const [photos, setPhotos] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [notiList, setNotiList] = useState([]);
   useEffect(() => {
      setIsLoading(true);
      axios
         .get('https://photogallerybackend.herokuapp.com/')
         // .get('http://localhost:3001')
         .then((res) => {
            const apiPhotos = res.data || [];
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
      <Context.Provider value={{ notiList, setNotiList, photos, setPhotos }}>
         <Header setPhotos={setPhotos} photos={photos}></Header>
         <div className="row body">
            {isLoading && <Loading position="absolute" />}
            {photos.map((item, index) => {
               return (
                  <PhotoItems src={item.data} key={item._id} id={item._id} />
               );
            })}
         </div>
      </Context.Provider>
   );
}
export { Context };
export default App;
