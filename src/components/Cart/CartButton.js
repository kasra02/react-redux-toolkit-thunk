import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiAction} from "../../store/uiSlice";

const CartButton = (props) => {
    const totalQuantity = useSelector(state=>state.cart.totalQuantity)
    const dispatch = useDispatch()

    function clickHandler() {
        dispatch(uiAction.toggle())
    }

    return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
