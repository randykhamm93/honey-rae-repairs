import { useEffect, useState } from "react"

export const CustomerForm = () => {
  // TODO: Provide initial state for profile
  const [profile, updateProfile] = useState({
    address: "",
    phoneNumber: "",
    userId: 0
  })

  const [feedback, setFeedback] = useState("")

  const localHoneyUser = localStorage.getItem("honey_user")
  const honeyUserObject = JSON.parse(localHoneyUser)


  // TODO: Get customer profile info from API and update state
  useEffect(() => {
    fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
      .then(response => response.json())
      .then((data) => {
        const customerObject = data[0]
        updateProfile(customerObject)
      })
  }, [])

  const handleSaveButtonClick = (event) => {
    event.preventDefault()

    /*
        TODO: Perform the PUT fetch() call here to update the profile.
        Navigate user to home page when done.
    */
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
      .then(response => response.json())
      .then(() => {
        setFeedback("Customer profile successfully saved")
      })
  }

  useEffect(() => {
    if (feedback !== "") {
      // Clear feedback to make entire element disappear after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback])

  return (
    <div>
      <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
      </div>
      <form className="profile">
        <h2 className="profile__title">Profile</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              required autoFocus
              type="text"
              className="form-control"
              value={profile.address}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.address = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              value={profile.phoneNumber}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.phoneNumber = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <button onClick={handleSaveButtonClick} className="btn btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );

}
