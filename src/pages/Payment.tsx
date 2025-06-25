
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Users, Receipt, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [splitBill, setSplitBill] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const total = getTotal();
  const splitAmount = splitBill ? total / numberOfPeople : total;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = () => {
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "No hay productos en el carrito para pagar.",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "🎉 ¡Pago exitoso!",
      description: `Se ha procesado el pago por ${formatPrice(splitAmount)}${splitBill ? ' por persona' : ''}. ¡Gracias por tu preferencia!`,
    });

    // Clear cart and navigate
    clearCart();
    navigate('/orders');
  };

  const handleSplitToggle = () => {
    setSplitBill(!splitBill);
    if (!splitBill) {
      setNumberOfPeople(2);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
        <Header title="Pago" showCart={false} />
        
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <Receipt size={64} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">
            No hay productos para pagar
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Agrega productos a tu carrito antes de proceder al pago.
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
      <Header title="Pago" showCart={false} />
      
      <div className="px-4 py-4">
        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-chilean-blue font-chilean">
              Resumen del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <hr className="mb-4" />
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-chilean-red">{formatPrice(total)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Split Bill Option */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="text-chilean-blue" size={20} />
                <span className="font-medium">Dividir la cuenta</span>
              </div>
              <Button
                variant={splitBill ? "default" : "outline"}
                size="sm"
                onClick={handleSplitToggle}
                className={splitBill ? "bg-chilean-blue" : "border-chilean-blue text-chilean-blue"}
              >
                {splitBill ? 'Activado' : 'Activar'}
              </Button>
            </div>
            
            {splitBill && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Número de personas</Label>
                  <Input
                    type="number"
                    min="2"
                    max="10"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 2)}
                    className="mt-1"
                  />
                </div>
                <div className="bg-chilean-blue/10 p-3 rounded-lg">
                  <p className="text-sm font-medium text-chilean-blue">
                    Cada persona paga: {formatPrice(splitAmount)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-chilean-blue font-chilean">
              Método de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-2">
                  <CreditCard size={20} />
                  <span>Tarjeta de Crédito/Débito</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webpay" id="webpay" />
                <Label htmlFor="webpay" className="flex items-center space-x-2">
                  <img 
                    src="/placeholder.svg" 
                    alt="WebPay" 
                    className="w-8 h-6"
                  />
                  <span>WebPay</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-chilean-blue font-chilean">
                Datos de la Tarjeta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Número de tarjeta</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({...cardData, number: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vencimiento</Label>
                  <Input
                    placeholder="MM/AA"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label>Nombre del titular</Label>
                <Input
                  placeholder="Como aparece en la tarjeta"
                  value={cardData.name}
                  onChange={(e) => setCardData({...cardData, name: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Button */}
        <div className="space-y-3 pb-20">
          <Button
            onClick={handlePayment}
            className="w-full bg-chilean-red hover:bg-chilean-red/90 text-white py-4 text-lg"
          >
            <CheckCircle size={20} className="mr-2" />
            Pagar {formatPrice(splitAmount)}{splitBill ? ' (por persona)' : ''}
          </Button>
          
          <Button
            onClick={() => navigate('/cart')}
            variant="outline"
            className="w-full border-chilean-blue text-chilean-blue"
          >
            Volver al Carrito
          </Button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Payment;
