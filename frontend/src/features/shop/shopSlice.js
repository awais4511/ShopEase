import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const currency = '$';
const deliveryFee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://shopease-i69l.onrender.com';

const initialState = {
  currency,
  delivery_fee: deliveryFee,
  backendUrl,
  search: '',
  showSearch: false,
  cartItem: {},
  products: [],
  loading: false,
  token: localStorage.getItem('token') || '',
};

export const fetchProducts = createAsyncThunk('shop/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/product/list`);
    if (response.data.success) {
      return response.data.products;
    }
    return rejectWithValue(response.data.message || 'Failed to fetch products');
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch products');
  }
});

export const getUserCart = createAsyncThunk('shop/getUserCart', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
    if (response.data.success) {
      return response.data.cartData || {};
    }
    return rejectWithValue(response.data.message || 'Failed to fetch cart');
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch cart');
  }
});

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
    toggleShowSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCartItem: (state, action) => {
      state.cartItem = action.payload;
    },
    addToCart: (state, action) => {
      const { itemId, size, token } = action.payload;
      if (!size) {
        toast.error('Please select a size');
        return;
      }

      const cartData = JSON.parse(JSON.stringify(state.cartItem || {}));
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      state.cartItem = cartData;

      if (token) {
        axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } }).catch(console.error);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, size, quantity, token } = action.payload;
      const cartData = JSON.parse(JSON.stringify(state.cartItem || {}));
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = quantity;
      state.cartItem = cartData;

      if (token) {
        axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } }).catch(console.error);
      }
    },
    clearCart: (state) => {
      state.cartItem = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Unable to load products');
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cartItem = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        toast.error(action.payload || 'Unable to load cart');
      });
  },
});

export const {
  setSearch,
  setShowSearch,
  toggleShowSearch,
  setToken,
  setCartItem,
  addToCart,
  updateQuantity,
  clearCart,
} = shopSlice.actions;

export const selectShop = (state) => state.shop;

export const getCartCount = (state) => {
  let totalCount = 0;
  const { cartItem } = state.shop;
  for (const items in cartItem) {
    for (const item in cartItem[items]) {
      if (cartItem[items][item] > 0) {
        totalCount += cartItem[items][item];
      }
    }
  }
  return totalCount;
};

export const getCartAmount = (state) => {
  const { cartItem, products } = state.shop;
  let totalAmount = 0;
  for (const items in cartItem) {
    const itemInfo = products.find((product) => product._id === items);
    for (const item in cartItem[items]) {
      if (cartItem[items][item] > 0 && itemInfo) {
        totalAmount += itemInfo.price * cartItem[items][item];
      }
    }
  }
  return totalAmount;
};

export default shopSlice.reducer;
