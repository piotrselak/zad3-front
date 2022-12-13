import { useState, useMemo } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Routes, Route, Navigate, BrowserRouter
} from "react-router-dom";
import ImageControl from './components/ImageControl';
import './App.css'
import axios from 'axios';

function App() {
  const [isFetched, setFetched] = useState(false)
  const [images, setImages] = useState([])

  useMemo(() => {
    axios.get('https://dummyapi.io/data/v1/post?limit=10', {
      headers: {
        "app-id": "63986aebaab7fd77f4235798"
      }
    })
      .then(function (response) {
        const dataArray = response.data.data
        const mapped = dataArray.map((elem) => {
          return {
            "image": elem.image, "rating": elem.likes / 10,
            "author": elem.owner.firstName, "other": elem.text,
            "date": randomDate()
          }
        })
        setImages(mapped)
        setFetched(true)
      })
  }, [])

  function setRating(index) {
    return (rating, name) => {
      const filtered = images.filter((value, ind) => { return index !== ind })
      let toBeChanged = images[index]
      toBeChanged.rating = rating
      filtered.splice(index, 0, toBeChanged)
      setImages(filtered)
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Outlet /> <Navigate to="/0" /></>,
      children: [{
        path: "0",
        element: isFetched ? <ImageControl first={true} changeRating={setRating(1)} imgObj={images[1]} />
          : <p>Loading...</p>
      }]
    },
  ]);

  return <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<><Outlet /> <Navigate to="/0" /></>}
      />

      {images.map((element, index) => {
        return <Route path={"/" + index} key={index} element={isFetched ? <ImageControl first={index === 0}
          finish={index === (images.length - 1)} ind={index} changeRating={setRating(index)} imgObj={element} />
          : <p>Loading...</p>} />
      })}
    </Routes>
  </BrowserRouter>;
}

export default App

function randomDate(start, end) {
  return new Date(Date.parse("'01 Jan 1970 00:00:00 GMT'")
    + Math.random() * Date.parse('01 Jan 1970 00:00:00 GMT')).toString();
}
