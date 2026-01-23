// first find the venue id from the url of the page
// then i need to create a state where i can store the venue 
// when page loads , then i get spesific venue by that id
// then i want to save the result in state
// if the venue has not leaded, i want to show a loading message on screen
// when loading is finished then i want to display the name and desc of the venue
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findVenueId } from "../api/venues";


export default function VenueDetails() {
    const {id } = useParams();
    const [venue, setVenue] = useState(null)
    useEffect(() =>{
        async function loadTheVenue() {
            const dataRecieved = await findVenueId(Id);
            setVenue(dataRecieved);
        }
        loadTheVenue();
    },[id]
    );

    if (!venue){
        return <p>Loading Venue...</p>
    }

  return ( 
    <div>
        <h1>{venue.name}</h1>
        <p>{venue.description}</p>
    </div>
  );
}
