import { Link } from "react-router-dom"

export const Customer = ({ customer, users }) => {
  // Find the corresponding user object based on the customerId
  const user = users.find((user) => user.id === customer.userId)

  return (
    <section className="customer">
      <div>
        <Link to={`/customers/${customer.id}`}>Name: {user?.fullName}</Link>
      </div>
      <div>Address: {customer.address}</div>
      <div>Phone Number: {customer.phoneNumber}</div>
    </section>
  )
}
