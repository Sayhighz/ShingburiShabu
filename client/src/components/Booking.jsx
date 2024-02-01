import React from 'react'

function Booking() {
    return (
        <form>
        <label>
          Name:
          <input type="text"/>
        </label>
        <br />
        <label>
          Table Number:
          <input type="text"  />
        </label>
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
    )
}

export default Booking