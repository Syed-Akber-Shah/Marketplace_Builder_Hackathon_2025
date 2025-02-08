// src/app/product/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductPageProps {
  product: Product;
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        productName,
        _type,
        image,
        price,
      }`,
    { slug }
  );
}

// Server-side rendering with getServerSideProps
export async function getServerSideProps({ params }: any) {
  const { slug } = params;
  const product = await getProduct(slug);

  return { props: { product } };
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product?.productName}
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.productName}</h1>
          <p className="text-2xl font-sans">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

