import classes from "./HeaderCartButton.module.css";

const OrdersButton = (props) => {
  const btnClasses = `${classes.button}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>Orders</span>
      {/* <span className={classes.badge}>{0}</span> */}
    </button>
  );
};

export default OrdersButton;
