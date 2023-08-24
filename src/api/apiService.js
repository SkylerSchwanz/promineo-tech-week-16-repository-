const BASE_URL = 'http://localhost:3001';

export const addToCart = async ({ username, productId }) => {
  // Get access token
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${BASE_URL}/users/${username}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId }),
    });

    // Read the response data as text
    const data = await response.text();

    // Attempt to parse the response data as JSON
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw parseError;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    console.error('Error response status:', error.response?.status);
    throw error;
  }
};

export const removeFromCart = async ({ productId }) => {
  // Get access token from localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Check if accessToken is present
  if (!accessToken) {
    throw new Error('Access token not found.');
  }

  try {
    const response = await fetch(`${BASE_URL}/users/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the retrieved token
      },
    });

    if (!response.ok) {
      // Throw an error if the response status is not ok
      throw new Error('Failed to remove product from cart');
    }

    // Return a success message if removal is successful
    return { message: 'Product removed from cart' };
  } catch (error) {
    console.error('Error removing from cart:', error); // Log the caught error
    console.error('Error response status:', error.response?.status); // Log the response status code if available
    throw error;
  }
};

export const placeOrder = async () => {
  // Get access token
  const accessToken = localStorage.getItem('accessToken');

  try {
    // Perform the POST request to place the order
    const response = await fetch(`${BASE_URL}/users/place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
      },
    });

    if (!response.ok) {
      // Throw an error if the response status is not ok
      throw new Error('Failed to place order');
    }
  } catch (error) {
    console.error('Error placing order:', error); // Log the caught error
    console.error('Error response status:', error.response?.status); // Log the response status code if available
    throw error;
  }
};

export const updateCartItem = async ({ productId, quantity }) => {
  // Get access token
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${BASE_URL}/users/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    });

    // Read the response data as text
    const data = await response.text();

    // Attempt to parse the response data as JSON
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw parseError;
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    console.error('Error response status:', error.response?.status);
    throw error;
  }
};
