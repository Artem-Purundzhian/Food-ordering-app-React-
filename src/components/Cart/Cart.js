import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    const orderData = {
      items: cartCtx.items,
      user: userData,
      total: totalAmount,
    };
    setIsLoading(true);
    const response = await fetch(
      "https://foodordering-4ef92-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.log(error.message);
    });
    if (response.ok) {
      setIsCheckout(false);
      cartCtx.clearCart();
      setSuccessMessage(true);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} submitHandler={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const loadingModalContent = (
    <div className="spinnerWrapper">
      <div className="loadingSpinner"></div>
    </div>
  );

  const submittedModalContent = (
    <h3 className="successMessage">Thank you for your order!</h3>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !successMessage && modalContent}
      {isLoading && loadingModalContent}
      {!isLoading && successMessage && submittedModalContent}
    </Modal>
  );
};

export default Cart;
