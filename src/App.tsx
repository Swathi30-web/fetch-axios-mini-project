import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Todos from "./pages/Todos";
import Images from "./pages/Images";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
               <Route path="/posts" element={<Posts />} />
               <Route path="/todos" element={<Todos />} />
          <Route path="/contacts" element={<Contacts />} />
            <Route path="/images" element={<Images />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;