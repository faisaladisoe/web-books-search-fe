'use client';
import { Button, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import React from "react";
import { useState } from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import { Book } from "@/app/page";

interface Wishlist {
  books: Book[];
  clearWishlist: any;
}

export default function Wishlist({ books, clearWishlist }:Wishlist) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="m-8">
      <h1>Books Wishlist</h1>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
      >
        {books.map((book, index) => (
          <div key={index}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={book.title} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AbcIcon />
                  </ListItemIcon>
                  <ListItemText primary={book.id} />
                </ListItemButton>
              </List>
            </Collapse>
          </div>
        ))}
      </List>
      <Button className="mt-6" startIcon={<DeleteIcon />} onClick={clearWishlist} variant="outlined" color="error">
        Clear Wishlist
      </Button>
    </div>
  );
}
