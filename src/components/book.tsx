
export default function BookForm({ id, title, onAdd }) {
  const handleAddClick = () => {
    if (title.trim() !== '') {
      onAdd({
        id: id,
        title: title
      });
    }
  };

  return (
    <div>
      <button onClick={handleAddClick}>Add to Wishlist</button>
    </div>
  );
}
