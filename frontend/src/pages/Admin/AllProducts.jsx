import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto ml-4"> 
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="text-xl font-bold h-12 ">
            All Products ({products.length})
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xl font-semibold mb-2">
                        {product?.name}
                      </h5>
                      <p className="text-gray-400 text-xs">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        {product?.description?.substring(0, 160)}...
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold">$ {product?.price}</p>
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
                      >
                        Update Product
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2 hidden md:block">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
