import React, { useState ,useEffect} from 'react'
import PinList from './PinList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [pins, setPins] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
      let userId = JSON.parse(localStorage.getItem("user"));
      // navigate("/")

        const fetchPins = async () => {
          const result = await axios.get('http://localhost:3030/pins');
          setPins(result.data);
        };
        fetchPins();
      }, []);
    
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Pinterest Clone</h1>
    <PinList pins={pins} />
  </div>
  )
}
