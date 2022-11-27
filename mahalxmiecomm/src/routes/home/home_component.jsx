import {Outlet} from 'react-router-dom';
import Directory from "../../components/directory/directory_component";
import ProductCard from '../../components/product-card/product_card_component';
import { useSelector } from 'react-redux';
import homeWallpaper from '../../assets/bkg.avif'
import ShopWallpaper from '../../components/shop-wallpaper/shop_wallpaper';
import {  useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Loader from '../../components/loader/loader';
import { useLocation } from 'react-router-dom';
function Home() {
  /* 
   const [products,setProducts]=useState([]);
  useEffect(()=>{
    async function fetchProducts(){
     const {data}=await axios.get('api/products/');
      setProducts(data);
    }
    fetchProducts();
  },[])
  */
  const location=useLocation()
  const keyword=location.search
  console.log('keyword',keyword)
  const dispatch=useDispatch()
   
  useEffect(()=>{
    dispatch(listProducts(keyword))
  },[dispatch,keyword])

  const payList=useSelector(state=>state.productList)
  const {products,error,loading}=payList
  const categories=[
    {
      "id": 1,
      "title": "AJRAK",
      "imageUrl": "https://i.ibb.co/YyWncHp/white-ajrak.jpg"
    },
    {
      "id": 2,
      "title": "KALAMKARI",
      "imageUrl": "https://i.ibb.co/LQSx6VM/product-One.jpg"
    },
    {
      "id": 3,
      "title": "BANDHANI",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "PANTS",
      "imageUrl": "https://i.ibb.co/QmZFPnm/brown-pants.jpg"
    },
    {
      "id": 5,
      "title": "GARCHOLA",
      "imageUrl": "https://i.ibb.co/Z1kt3KF/product5-j-Oqo-TCO.jpg"
    },
    {
      "id": 6,
      "title": "NET",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]
  const Mystyle={
    textAlign:'center'
  }
  //in our category attribute of our callback function of map method we can destructur our category variable directly {title,id} etc 
  return (
    <div>
    <Outlet/>
    <ShopWallpaper image={homeWallpaper}></ShopWallpaper>
    <h1 style={Mystyle}>MAJOR CATEGORIES</h1>
    <Directory categories={categories}>
    </Directory>
    <h1 style={Mystyle}>TOP RATED PRODUCTS</h1>

    {loading?<Loader/>:error?<message variant='danger'>{error}</message>:
    <div className="products-container">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
   
      }
      </div>
    
  );
}

export default Home;
