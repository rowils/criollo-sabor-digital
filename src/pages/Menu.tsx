
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Search, Star, Clock, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const { addItem } = useCart();

  const categories = [
    { id: 'todos', name: 'Todos', count: 24 },
    { id: 'entradas', name: 'Entradas', count: 6 },
    { id: 'principales', name: 'Principales', count: 12 },
    { id: 'postres', name: 'Postres', count: 4 },
    { id: 'bebidas', name: 'Bebidas', count: 8 }
  ];

  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'vegano', name: 'Vegano' },
    { id: 'sin-gluten', name: 'Sin Gluten' },
    { id: 'sin-lactosa', name: 'Sin Lactosa' }
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Empanadas de Pino',
      description: 'Tradicionales empanadas rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. Masa casera horneada a la perfección.',
      price: 3500,
      image: '/placeholder.svg',
      category: 'entradas',
      rating: 4.8,
      prepTime: '15 min',
      ingredients: ['Carne molida', 'Cebolla', 'Huevo', 'Aceitunas', 'Pasas', 'Masa de harina'],
      dietary: []
    },
    {
      id: '2',
      name: 'Pastel de Choclo',
      description: 'Auténtico pastel chileno con choclo molido dulce, relleno de carne con pollo, huevos duros y aceitunas.',
      price: 8500,
      image: '/placeholder.svg',
      category: 'principales',
      rating: 4.9,
      prepTime: '25 min',
      ingredients: ['Choclo', 'Carne de vacuno', 'Pollo', 'Cebolla', 'Huevo', 'Aceitunas'],
      dietary: ['sin-gluten']
    },
    {
      id: '3',
      name: 'Cazuela Nogada',
      description: 'Sopa tradicional con carne de vacuno, zapallo, choclo, porotos verdes y papas. Servida bien caliente.',
      price: 7200,
      image: '/placeholder.svg',
      category: 'principales',
      rating: 4.7,
      prepTime: '20 min',
      ingredients: ['Carne de vacuno', 'Zapallo', 'Choclo', 'Porotos verdes', 'Papas', 'Caldo de verduras'],
      dietary: ['sin-gluten', 'sin-lactosa']
    },
    {
      id: '4',
      name: 'Humitas',
      description: 'Deliciosas humitas de choclo tierno envueltas en chala, cocidas al vapor. Dulces y cremosas.',
      price: 4200,
      image: '/placeholder.svg',
      category: 'entradas',
      rating: 4.6,
      prepTime: '18 min',
      ingredients: ['Choclo tierno', 'Cebolla', 'Albahaca', 'Leche', 'Mantequilla'],
      dietary: ['vegano']
    },
    {
      id: '5',
      name: 'Charquicán',
      description: 'Guiso tradicional con charqui, papas, zapallo, choclo y verduras. Acompañado con huevo frito.',
      price: 6800,
      image: '/placeholder.svg',
      category: 'principales',
      rating: 4.5,
      prepTime: '22 min',
      ingredients: ['Charqui', 'Papas', 'Zapallo', 'Choclo', 'Zanahoria', 'Huevo'],
      dietary: ['sin-gluten']
    },
    {
      id: '6',
      name: 'Sopaipillas',
      description: 'Tradicionales sopaipillas caseras, crujientes por fuera y suaves por dentro. Servidas con pebre.',
      price: 2800,
      image: '/placeholder.svg',
      category: 'entradas',
      rating: 4.4,
      prepTime: '10 min',
      ingredients: ['Harina', 'Zapallo', 'Aceite', 'Sal'],
      dietary: ['vegano']
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesFilter = selectedFilter === 'todos' || item.dietary.includes(selectedFilter);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    
    toast({
      title: "Agregado al carrito",
      description: `${item.name} ha sido agregado a tu pedido.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
      <Header title="Menú" />
      
      <div className="px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Buscar platos, ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-chilean-blue/20 focus:border-chilean-blue"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-chilean-blue text-white' 
                  : 'border-chilean-blue/30 text-chilean-blue hover:bg-chilean-blue/10'
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap ${
                selectedFilter === filter.id 
                  ? 'bg-chilean-red text-white' 
                  : 'border-chilean-red/30 text-chilean-red hover:bg-chilean-red/10'
              }`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.name}
            </Badge>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4 pb-20">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-chilean-blue font-chilean">
                        {item.name}
                      </h3>
                      <span className="font-bold text-chilean-red text-lg">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">{item.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-sm ml-1">{item.prepTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dietary badges */}
                    {item.dietary.length > 0 && (
                      <div className="flex space-x-1 mb-2">
                        {item.dietary.map((diet) => (
                          <Badge key={diet} variant="secondary" className="text-xs">
                            {diet === 'vegano' ? '🌱' : diet === 'sin-gluten' ? '🌾' : '🥛'}
                            {diet.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-chilean-red hover:bg-chilean-red/90 text-white"
                      size="sm"
                    >
                      <Plus size={16} className="mr-1" />
                      Agregar al Carrito
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Menu;
