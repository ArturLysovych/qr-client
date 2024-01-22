import { IGood } from '../interfaces';
import { goodsArr } from '../constants';

const ShopPage:React.FC = ():JSX.Element => (
    <div className="w-full max-h-[800px] h-screen flex justify-center items-center bg-red-500">
        <h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Shop</h2>
        <div className="max-w-screen-lg w-full h-full flex flex-col justify-around items-center px-[10px] relative">
          
            <a href='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</a>
          
            <div className="text-[50px] text-transparent select-none">
                empty
            </div>

            <div className="flex flex-wrap justify-center items-center gap-[10px] md:gap-[30px]">
                {goodsArr.map((item, index) => (
                    <GoodItem key={index} good={item} />
                ))}
            </div>
        </div>
    </div>
);

const GoodItem = ({ good }: { good: IGood }) => (
    <div className="h-[200px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-red-400 transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]">
        <img height={130} width={130} src={good.img} alt="good img" />
        <h3 className='w-full bg-red-400 text-white text-xl flex justify-center'>{good.title}</h3>
        <h2 className='text-3xl text-red-500 font-bold'>{good.price} coins</h2>
    </div>
);
  
export default ShopPage;