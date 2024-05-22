import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addToCart } from "../../redux/features/cart/cartSlice";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
        

      </div>

      <div className="p-4 flex justify-between ">
        <Link to={`/product/${product._id}`}>
          <h2 >
          <p className="font-semibold" >
              ${product.price}
            </p>
            <div className="text-lg">{product.name}</div>
            
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
