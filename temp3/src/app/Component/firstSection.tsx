"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import { allProducts, four } from '../../sanity/lib/queries';
import { Product } from '../../../types/products';
import { urlFor } from '@/sanity/lib/image';

const FirstSection = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchproduct() { 
      const fetchedProduct: Product[] = await client.fetch(allProducts); 
      setProduct(fetchedProduct);
      setLoading(false);
    }
    fetchproduct();
  }, []);

  // FIX: Hydration mismatch avoid karne ke liye loading state check
  if (loading) {
    return null; // ya koi loading spinner render karo
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6 text-center'> Best of Air Max</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {product.map((product) => (
          <div key={product._id}
            className='border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200'
          >
            {product.image && (
              <Image 
                src={urlFor(product.image).url()}
                alt={product.productName}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className='text-lg font-semibold mt-4 '>{product.productName}</h2>
            <p className='text-gray-500 mt-2'>
              {product.price ? `$${product.price}` : 'Price not available'}
            </p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstSection;
