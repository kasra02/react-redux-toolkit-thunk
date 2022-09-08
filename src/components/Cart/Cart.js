import Card from '../UI/Card';
import classes from './Cart.module.css';
import {useSelector} from "react-redux";
import CartItem from "./CartItem";

const Cart = (props) => {
    const carts = useSelector(state=>state.cart.items)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
          {carts.map(cart=>(
            <CartItem
              item={{ title: cart.title, quantity: cart.quantity, total: cart.totalPrice, price: cart.price }}
            />
          ))}
      </ul>
    </Card>
  );
};

export default Cart;
