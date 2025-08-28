import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 12,
    title: "Advanced JavaScript",
    description: "Learn modern JavaScript techniques and patterns",
  },
  {
    id: "p3",
    price: 18,
    title: "React Complete Guide",
    description: "Master React with hooks, context, and Redux",
  },
  {
    id: "p4",
    price: 24,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
  },
  {
    id: "p5",
    price: 30,
    title: "Full-Stack Web Development",
    description: "Complete guide to modern web development",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
