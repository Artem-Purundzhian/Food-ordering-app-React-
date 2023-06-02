import Modal from "../UI/Modal";
import classes from "../Cart/Cart.module.css";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://foodordering-4ef92-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedOrders = [];
      for (const key in data) {
        loadedOrders.push({
          id: key,
          name: data[key].user.name,
          total: data[key].total,
          items: data[key].items,
        });
      }
      setOrders(loadedOrders);
      console.log(loadedOrders);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.total}>
        <span>Orders</span>
      </div>
      <ul className={classes["cart-items"]}>
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            name={order.name}
            amount={order.items.length}
            price={order.total}
          ></OrderItem>
        ))}
      </ul>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Orders;
