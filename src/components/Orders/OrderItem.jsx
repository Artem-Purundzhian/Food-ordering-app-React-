import classes from "../Cart/CartItem.module.css";

const OrderItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <span> number of items: x {props.amount}</span>

        <div className={classes.summary}>
          Total:
          <span className={classes.price}>{props.price}</span>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
