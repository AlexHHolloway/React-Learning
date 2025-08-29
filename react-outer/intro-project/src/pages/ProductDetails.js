import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const ProductDetails = () => {
  const { productId } = useParams();

  // Find the product from the PRODUCTS array
  const product = PRODUCTS.find(p => p.id === productId);

  // Handle case where product is not found
  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product with ID {productId} was not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.title}</h2>
      <p>Product ID: {product.id}</p>
    </div>
  );
};

export default ProductDetails;
