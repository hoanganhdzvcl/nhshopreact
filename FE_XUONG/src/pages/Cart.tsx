import UseCart from '@/hooks/useCart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '@/scss/cart.scss';

const CartPage = () => {
    const { data, mutate, calculateTotal, isLoading, isError } = UseCart();
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;

    console.log(data);

    return (
        <div className='container'>
            <section className='header'>
                <div className='header__subbanner'>
                    <img src='https://picsum.photos/id/1/1440/500' alt='banner' />
                </div>
            </section>
            <section className='infocart'>
                <div className='container'>
                    <div className='infocart__info'>
                        <ul className='infocart__list'>
                            <ul className='infocart__listheader'>
                                <li className='img'></li>
                                <li className='name'>Product</li>
                                <li className='price'>Price</li>
                                <li className='quantity'>Quantity</li>
                                <li className='subtotal'>Subtotal</li>
                                <li className='remove'></li>
                            </ul>
                            {data?.products.map((product: any, index: number) => (
                                <li key={index} className='infocart__listitem'>
                                    <div className='img'>
                                        <div className='infocart__imageitem'>
                                            <img src={product.image} alt="" />
                                        </div>
                                    </div>
                                    <p className='infocart__nameitem name'>{product.name}</p>
                                    <p className='infocart__priceitem price'>{product.price} $</p>
                                    <div className='quantity'>
                                        <div className='infocart__quantityitem'>
                                            <span className='minus' onClick={() => mutate({ action: "DECREMENT", productId: product.productId })}>
                                                -
                                            </span>
                                            <span className='quanityproduct'>{product.quantity}</span>
                                            <span className='plus' onClick={() => mutate({ action: "INCREMENT", productId: product.productId })}>
                                                +
                                            </span>
                                        </div>
                                    </div>
                                    <p className='infocart__subtotalitem subtotal'>{Math.ceil(product.quantity * product.price)} $</p>
                                    {/* <div className='remove'>
                                        <div className='infocart__removeitem'>
                                            <img src={removeIcon} alt='' />
                                        </div>
                                    </div> */}
                                </li>
                            ))}
                        </ul>
                        <form method='' action='#' className='infocart__checkout'>
                            <h3 className='infocart__titletotal'>Cart Totals</h3>
                            <div className='__crosslinecheckout'></div>
                            <div className='infocart__subtotalcart'>
                                <p>Subtotal</p>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className='infocart__totalcart'>
                                <p>Total</p>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className='__crosslinecheckout'></div>

                            <Link to='/order' className='buttonCheckOut'>Check out</Link>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}



export default CartPage