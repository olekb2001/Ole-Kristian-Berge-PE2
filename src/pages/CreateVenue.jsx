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
              <input type="number" />
            </div>
          </div>

          <div className="two-inputs">
            <div>
              <label>City</label>
              <input type="text" />
            </div>
            <div>
              <label>Country</label>
              <input type="text" />
            </div>
          </div>

          <h3 className="amenities-title">Amenities</h3>
          <div className="amenities-row">
            <label>
              <input type="checkbox" /> Wifi
            </label>
            <label>
              <input type="checkbox" /> Parking
            </label>
            <label>
              <input type="checkbox" /> Pets allowed
            </label>
            <label>
              <input type="checkbox" /> Breakfast included
            </label>
          </div>

          <div className="create-venue-buttons">
            <button className="create-venue-button">Create Venue</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>

        {/*right cont*/}
        <div className="create-venue-right">
          <h3 className="images-title">Images</h3>
          <input type="text" placeholder="https://example.com/image.jpg" />
          <button className="add-image-button">Add Another Image</button>
        </div>
      </div>
    </div>
  );
}
