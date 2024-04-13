import React from 'react'
import FormatPrice from "../Halpers/FormatPrice";
import CartAmountToggle from './CartAmountToggle';
import {FaTrash} from "react-icons/fa";
import { useCartContext } from '../contextapi/Cart_Context';


const CartItem = ({id,name,image,color,price,amount}) => {
    const {removeItem,setDecrease,setIncrement} = useCartContext();
    // const setDecrease = () => {
    //     amount > 1 ? setAmount(amount - 1) : setAmount(1);
    //   };
    
    //   const setIncrement = () => {
    //     amount < stock ? setAmount(amount + 1) : setAmount(stock);
    //   };
  return (
    <div className='cart-heading grid grid-five-column'>
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <div className="color-div">
                    <p>Color: </p>
                    <div className="color-style" style={{backgroundColor:color , color:color}}>

                    </div>
                 </div>
            </div>
        </div>
      {/* price */}
      <div className="cart-hide">
        <p><FormatPrice price = {price}/></p>
      </div>

      {/* quantity */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />

      {/* SubTotal */}
      <div className="cart-hide">
        <p>
            <FormatPrice price = {price * amount}/>
        </p>
      </div>

      {/* remove */}
      <div>
        <FaTrash className="remove_icon" onClick={()=> removeItem(id)}/>
      </div>
    </div>
  )
}

export default CartItem
