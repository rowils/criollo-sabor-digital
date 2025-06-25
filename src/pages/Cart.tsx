
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado de tu carrito.",
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega algunos platos antes de realizar el pedido.",
        variant: "destructive"
      });
      return;
    }

    if (!tableNumber) {
      toast({
        title: "Número de mesa requerido",
        description: "Por favor ingresa tu número de mesa.",
        variant: "destructive"
      });
      return;
    }

    // Simulate order placement
    toast({
      title: "¡Pedido enviado! 🎉",
      description: `Tu pedido para la mesa ${tableNumber} ha sido enviado a cocina. Tiempo estimado: 20-25 minutos.`,
    });

    // Clear cart and navigate to orders
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
        <Header title="Mi Carrito" showCart={false} />
        
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 text-center mb-6">
            ¡Explora nuestro menú y agrega tus platos favoritos!
          </p>
          <Button
            onClick={() => navigate('/menu')}
            className="bg-chilean-blue hover:bg-chilean-blue/90 text-white"
          >
            Ver Menú
          </Button>
        </div>
        
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
      <Header title="Mi Carrito" showCart={false} />
      
      <div className="px-4 py-4">
        {/* Table Number */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-chilean-blue mb-2">
              Número de Mesa *
            </label>
            <Input
              type="number"
              placeholder="Ej: 5"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border-chilean-blue/30 focus:border-chilean-blue"
            />
          </CardContent>
        </Card>

        {/* Cart Items */}
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-chilean-blue font-chilean">
                      {item.name}
                    </h3>
                    <p className="text-chilean-red font-bold">
                      {formatPrice(item.price)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus size={16} />
                        </Button>
                        
                        <span className="font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Instructions */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-chilean-blue mb-2">
              Instrucciones Especiales
            </label>
            <Textarea
              placeholder="Ej: Sin cebolla, punto de cocción, alergias..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="border-chilean-blue/30 focus:border-chilean-blue"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-bold text-chilean-blue font-chilean mb-3">
              Resumen del Pedido
            </h3>
            
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              
              <hr className="my-2" />
              
              <div className="flex justify-between font-bold text-lg text-chilean-red">
                <span>Total:</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-chilean-red hover:bg-chilean-red/90 text-white py-3"
          >
            Enviar Pedido a Cocina
          </Button>
          
          <Button
            onClick={() => navigate('/payment')}
            variant="outline"
            className="w-full border-chilean-blue text-chilean-blue hover:bg-chilean-blue/10"
          >
            Proceder al Pago
          </Button>
          
          <Button
            onClick={() => navigate('/menu')}
            variant="outline"
            className="w-full"
          >
            Seguir Agregando Platos
          </Button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Cart;
