import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

function Products() {
  return (
    <>
      <h1>Products</h1>
      <ul>
        {PRODUCTS.map(product => {
          return (
            <li key={product.id}>
              <Link to={product.id}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Products;
