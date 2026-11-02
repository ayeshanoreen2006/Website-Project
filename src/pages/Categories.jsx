import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import products from "../data/products";
import "./Categories.css";

const categoryDetails = [
  {
    name: "Fashion",
    description: "Everyday styles and timeless essentials.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Electronics",
    description: "Smart gadgets to make life easier.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Beauty",
    description: "Little essentials for your self-care routine.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Home & Living",
    description: "Thoughtful details for a lovely home.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
  },
];

function getStoreProducts() {
  try {
    const savedProducts = localStorage.getItem("ayeshaAdminProductsV2");
    if (savedProducts !== null) {
      const parsedProducts = JSON.parse(savedProducts);
      return Array.isArray(parsedProducts) ? parsedProducts : products;
    }
    return products;
  } catch {
    return products;
  }
}

function Categories() {
  const [allProducts, setAllProducts] = useState(getStoreProducts);

  useEffect(() => {
    const updateProducts = () => setAllProducts(getStoreProducts());

    window.addEventListener("adminProductsUpdated", updateProducts);
    window.addEventListener("storage", updateProducts);

    return () => {
      window.removeEventListener("adminProductsUpdated", updateProducts);
      window.removeEventListener("storage", updateProducts);
    };
  }, []);

  return (
    <div className="categories-page">
      <section className="categories-banner">
        <div className="container">
          <span>EXPLORE OUR COLLECTIONS</span>
          <h1>Shop by Category</h1>
          <p>Discover something special in every Ayesha collection.</p>
          <div className="categories-breadcrumb">
            <Link to="/">Home</Link> / Categories
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="categories-heading">
          <div>
            <span>FIND YOUR FAVOURITES</span>
            <h2>Browse Collections</h2>
            <p>Explore our handpicked range of products.</p>
          </div>
          <span className="category-count">
            {categoryDetails.length} COLLECTIONS
          </span>
        </div>

        <div className="categories-grid">
          {categoryDetails.map((category, index) => {
            const count = allProducts.filter(
              (item) => item.category === category.name
            ).length;

            return (
              <Link to="/shop" className="category-card" key={category.name}>
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <span className="category-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="category-card-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-products">
                      {count} {count === 1 ? "PRODUCT" : "PRODUCTS"}
                    </span>
                  </div>
                  <span className="category-arrow">
                    <ArrowRight size={19} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="category-promo">
        <div>
          <span>YOUR NEXT FAVOURITE IS WAITING</span>
          <h2>Good Finds. Great Prices.</h2>
          <p>Explore the complete collection at Ayesha Online Store.</p>
          <Link to="/shop">
            Shop All Products <ArrowRight size={17} />
          </Link>
        </div>
        <Sparkles size={76} />
      </section>
    </div>
  );
}

export default Categories;
