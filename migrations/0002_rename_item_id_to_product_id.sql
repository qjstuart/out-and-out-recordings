-- Migration number: 0002 	 2026-07-02T22:10:35.369Z
ALTER TABLE orders RENAME COLUMN item_id TO product_id;
