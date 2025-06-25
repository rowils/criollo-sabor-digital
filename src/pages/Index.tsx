
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Star, Clock, Utensils, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredDishes = [
    {
      id: '1',
      name: 'Empanadas de Pino',
      description: 'Tradicionales empanadas con carne, cebolla, huevo y aceitunas',
      price: 3500,
      image: '/placeholder.svg',
      rating: 4.8,
      prepTime: '15 min'
    },
    {
      id: '2', 
      name: 'Pastel de Choclo',
      description: 'Auténtico pastel con choclo molido, carne y pollo',
      price: 8500,
      image: '/placeholder.svg',
      rating: 4.9,
      prepTime: '25 min'
    },
    {
      id: '3',
      name: 'Cazuela Nogada',
      description: 'Sopa tradicional con verduras y carne de vacuno',
      price: 7200,
      image: '/placeholder.svg',
      rating: 4.7,
      prepTime: '20 min'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
      <Header title="Sabor Criollo" />
      
      {/* Welcome Section */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-r from-chilean-blue to-chilean-red p-6 rounded-lg text-white mb-6 chilean-pattern">
          <h2 className="text-2xl font-bold font-chilean mb-2">
            ¡Bienvenidos a Sabor Criollo! 🇨🇱
          </h2>
          <p className="text-sm opacity-90 mb-3">
            Auténtica cocina chilena en el corazón de la tradición
          </p>
          <div className="flex items-center text-sm opacity-80">
            <Clock size={16} className="mr-2" />
            {currentTime.toLocaleTimeString('es-CL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => navigate('/menu')}
            className="h-20 bg-chilean-blue hover:bg-chilean-blue/90 text-white flex flex-col items-center justify-center"
          >
            <Utensils size={24} className="mb-1" />
            <span className="text-sm">Ver Menú</span>
          </Button>
          
          <Button
            onClick={() => navigate('/orders')}
            variant="outline"
            className="h-20 border-chilean-red text-chilean-red hover:bg-chilean-red/10 flex flex-col items-center justify-center"
          >
            <Clock size={24} className="mb-1" />
            <span className="text-sm">Mis Pedidos</span>
          </Button>
        </div>

        {/* Featured Dishes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-chilean-blue font-chilean">
              Platos Destacados
            </h3>
            <Award className="text-chilean-red" size={20} />
          </div>
          
          <div className="space-y-4">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-chilean-blue font-chilean">
                          {dish.name}
                        </h4>
                        <span className="font-bold text-chilean-red">
                          {formatPrice(dish.price)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {dish.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-500 fill-current" />
                            <span className="text-sm ml-1">{dish.rating}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {dish.prepTime}
                          </Badge>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => navigate('/menu')}
                          className="bg-chilean-red hover:bg-chilean-red/90 text-white"
                        >
                          Pedir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div className="bg-gradient-to-r from-chilean-terracotta/20 to-chilean-copper/20 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-chilean-blue font-chilean mb-2">
            🎉 Promoción Especial
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            ¡2x1 en empanadas todos los martes! 
            Válido hasta agotar stock.
          </p>
          <Badge className="bg-chilean-red text-white">
            Oferta limitada
          </Badge>
        </div>
      </div>

      <div className="pb-20">
        {/* Space for navigation */}
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;
