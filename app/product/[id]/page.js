import ProductDetails from './ProductDetails';
import products from '@/app/data/products';

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

const Page = ({ params }) => {
  const { id } = params;
  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
  <div style={{padding: '6rem 0rem 2rem'}}>
    <ProductDetails product={product} />
  </div>
  )
};

export default Page;
