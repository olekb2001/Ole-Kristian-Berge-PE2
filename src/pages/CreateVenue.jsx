/*
this page lets venue managers create a new venue.

here the manager fills out a form with venue details
which will later be sent to the api to create the venue.
*/
import "./CreateVenue.css";
export default function CreateVenue() {
  return (
    <div className="create-venue-page">
      <div className="create-venue-top">
        <h1 className="create-venue-title">Create New Venue</h1>
        <p className="create-venue-subtitle">
          Fill in the details below to publish your venue
        </p>
      </div>

      <div className="create-venue-layout">
        {/* left container*/}
        <div className="create-venue-left">
          <label>Venue Name</label>
          <input type="text" />

          <label>Description</label>
          <textarea />

          <div className="two-inputs">
            <div>
              <label>Pricing Per Night</label>
              <input type="number" />
            </div>
            <div>
              <label>Maximum Guests</label>
              <input type="number"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
