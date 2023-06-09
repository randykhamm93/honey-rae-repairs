import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"
export const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8088/customers")
      .then((response) => response.json())
      .then((customerData) => {
        setCustomers(customerData)
      })

    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((userData) => {
        setUsers(userData);
      })
  }, [])

  return (
    <article className="customers">
      {customers.map((customer) => (
        <Customer
          key={`customer--${customer.id}`}
          customer={customer}
          users={users}
        />
      ))}
    </article>
  )
}
