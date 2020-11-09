//**** I need to add a null check and return a default value *****/
import React, { useState, useEffect } from "react";
import * as moment from 'moment';

const apiKey = process.env.REACT_APP_NASA_KEY;

var date = new Date();

const theDate = moment(date).format('YYYY-MM-DD');

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${theDate}`

function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      try {
        const response = await fetch(url);
        if (!response.ok){
          throw Error(response.statusText);
        }
        const data = await response.json();
        setPhotoData(data);
      } catch(error) {
        console.log(error);
      }
    }
  }, []);

  if (!photoData) return <div className="pl-3">Photo information loading...</div>;

  return (
    <div className="nasa-photo pl-3">
      <p></p>
      {photoData.media_type === "image" ? (
        <img
          src={photoData.url}
          alt={photoData.title}
          className="photo"
        />
      ) : (
        <iframe
          title="space-video"
          src={photoData.url}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
          className="photo"
        />
      )}
      <div>
        <h1>{photoData.title}</h1>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
      </div>
    </div>
  );
}

export default NasaPhoto;