import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { useGetProductssQuery } from "../redux/api/productApiSlice2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();

  // Fetching data from productApiSlice
  const { data: productsData, isLoading: productsLoading, isError: productsError } = useGetProductsQuery({ keyword });

  // Fetching data from productApiSlice2 only if there is no data from productApiSlice
  const { data: products2Data, isLoading: products2Loading, isError: products2Error } = useGetProductssQuery({ keyword });
  
  const isLoading = productsLoading || products2Loading;
  const isError = productsError || products2Error;

  // Use data from productApiSlice if available, otherwise use data from productApiSlice2
  const allProducts = productsData?.products || products2Data?.products || [];

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {allProducts.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
