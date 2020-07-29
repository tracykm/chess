import React from "react";

export default function Piece({ isWhite }) {
  return (
    <svg
      viewBox="0 0 297 297"
      style={{ height: 100, width: 100, fill: isWhite ? "white" : "black" }}
    >
      <path
        d="M207.218,255.77h-3.369c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.129-39.546-24.438-64.4h3.519
		c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.582-8-8-8c4.418,0,8-3.582,8-8v-1c0-4.418-3.249-8-7.667-8h-4.626
		c-2.064-21.741,1.078-43.054,5.959-54.666c1.86-4.425,4.118-7.79,6.296-10.334h1.371c4.418,0,7.667-3.582,7.667-8v-1
		c0-4.418-3.249-8-7.667-8h-9.8c-1.803-10.896-8.998-19.966-18.755-24.383c1.783-2.607,2.829-5.757,2.829-9.154
		C165.492,7.267,158.227,0,149.26,0s-16.234,7.267-16.234,16.232c0,3.385,1.037,6.525,2.809,9.127
		c-9.788,4.406-17.01,13.49-18.816,24.41h-10.8c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h2.371
		c2.178,2.544,4.436,5.909,6.296,10.334c4.881,11.612,8.023,32.925,5.959,54.666h-4.626c-4.418,0-8.333,3.582-8.333,8v1
		c0,4.418,3.582,8,8,8c-4.418,0-8,3.582-8,8v1c0,4.418,3.915,8,8.333,8h3.602c0.692,24.854-15.536,53.495-24.438,64.4
		c-9.031,11.063-2.926,22.263-0.712,25.6h-3.452c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118V280.7
		c4-0.493,7-3.853,7-7.931v-9C214.885,259.352,211.636,255.77,207.218,255.77z"
      />
    </svg>
  );
}
