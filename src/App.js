import React, {useState, useEffect} from 'react' 
import alanBtn from '@alan-ai/alan-sdk-web';
// import './app.css';


const App = () => {
    const [cart, setCart] = useState([]);
    const [menuItems, setMenuItems] = useState([])


useEffect(() => {
  alanBtn({
      key: 'b47ef1c09a03302dcd0dd70fa0a0ed2d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if(commandData.command === 'getMenu') {
            setMenuItems(commandData.data)
        }else if(commandData.command === 'addToCart') {
            addToCart(commandData.data)
        }
      },
  });
}, []);

    const addToCart = (item) => {
        setCart((oldCart) => {
            return [...oldCart, item];
        })
     }
    return (
        <div>
            {menuItems.map(item => (
                <li key={item.name}>
                    {item.name} - RM{item.price} - {item.category}
                    <button onClick={() => addToCart(item)}>Add to cart</button>
                    </li>
            ))}

            <h2>Food Menu</h2>
            {cart.map(cartItem => (
                 <li key={cartItem.name}>{cartItem.name} - #{cartItem.price} - {cartItem.category}</li>
            ))}
        </div>
    )
}

export default App
