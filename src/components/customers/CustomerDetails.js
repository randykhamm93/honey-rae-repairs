import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
  const {customerId} = useParams()
  const [customer, updateCustomer] = useState({})

  useEffect(
    () => {
      fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
      .then(response => response.json())
      .then((data) => {
        const singleCustomer = data[0]
        updateCustomer(singleCustomer)
      })

    },
    [customerId]
  )

  return (
    <section className="customer">
      {customer && (
        <>
          <header className="customer__header">{customer.user?.fullName}</header>
          <div className="customer__div">
          <div>Email: {customer.user?.email}</div>
          <div>Address: {customer.address}</div>
          <div>Phone Number: {customer.phoneNumber}</div>
          </div>
        </>
      )}
    </section>
  )
}
