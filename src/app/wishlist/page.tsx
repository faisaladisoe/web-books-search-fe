'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Wishlist from "@/components/wishlist";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  return (
    <div className="m-8">
      <Wishlist books={wishlist} clearWishlist={clearWishlist} />
      <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
        <Link href="/">
          Go back to Home
        </Link>
      </Button>
    </div>
  );
}
