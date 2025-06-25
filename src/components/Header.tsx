
import { Bell, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  title: string;
  showCart?: boolean;
  showNotifications?: boolean;
}

const Header = ({ title, showCart = true, showNotifications = true }: HeaderProps) => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center">
        <img 
          src="/placeholder.svg" 
          alt="Sabor Criollo" 
          className="h-8 w-8 mr-3"
        />
        <h1 className="text-xl font-bold text-chilean-blue font-chilean">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {showNotifications && (
          <button className="p-2 text-gray-600 hover:text-chilean-red">
            <Bell size={24} />
          </button>
        )}
        
        {showCart && (
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 text-gray-600 hover:text-chilean-red relative"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-chilean-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
