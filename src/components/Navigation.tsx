
import { Home, List, User, History } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: List, label: 'Menú', path: '/menu' },
    { icon: History, label: 'Pedidos', path: '/orders' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 relative ${
                isActive 
                  ? 'text-chilean-blue' 
                  : 'text-gray-500 hover:text-chilean-red'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 truncate w-full text-center">
                {label}
              </span>
              {path === '/cart' && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-chilean-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
