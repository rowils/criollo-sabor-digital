
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Clock, CheckCircle, Star, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const currentOrders = [
    {
      id: 'ORD001',
      items: [
        { name: 'Empanadas de Pino', quantity: 2, price: 3500 },
        { name: 'Cazuela Nogada', quantity: 1, price: 7200 }
      ],
      total: 14200,
      status: 'preparing',
      estimatedTime: '15 min',
      tableNumber: '5',
      orderTime: '14:30',
      specialInstructions: 'Sin cebolla en las empanadas'
    }
  ];

  const pastOrders = [
    {
      id: 'ORD002',
      items: [
        { name: 'Pastel de Choclo', quantity: 1, price: 8500 },
        { name: 'Humitas', quantity: 2, price: 4200 }
      ],
      total: 16900,
      status: 'completed',
      date: '2024-01-15',
      rating: 5,
      tableNumber: '3'
    },
    {
      id: 'ORD003',
      items: [
        { name: 'Charquicán', quantity: 1, price: 6800 },
        { name: 'Sopaipillas', quantity: 1, price: 2800 }
      ],
      total: 9600,
      status: 'completed',
      date: '2024-01-12',
      rating: 4,
      tableNumber: '7'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Badge className="bg-yellow-500 text-white">🔥 Preparando</Badge>;
      case 'ready':
        return <Badge className="bg-green-500 text-white">✅ Listo</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 text-white">✔️ Completado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleRateOrder = (orderId: string, rating: number) => {
    toast({
      title: "¡Gracias por tu calificación!",
      description: `Has calificado este pedido con ${rating} estrellas.`,
    });
  };

  const handleReorderOrder = (order: any) => {
    toast({
      title: "Pedido agregado al carrito",
      description: "Los mismos platos han sido agregados a tu carrito actual.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
      <Header title="Mis Pedidos" />
      
      <div className="px-4 py-4">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="current" className="data-[state=active]:bg-chilean-blue data-[state=active]:text-white">
              Pedidos Actuales
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-chilean-blue data-[state=active]:text-white">
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {currentOrders.length === 0 ? (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No tienes pedidos actuales
                </h3>
                <p className="text-gray-500 mb-4">
                  ¡Haz tu primer pedido desde el menú!
                </p>
                <Button 
                  onClick={() => window.location.href = '/menu'}
                  className="bg-chilean-blue hover:bg-chilean-blue/90"
                >
                  Ver Menú
                </Button>
              </div>
            ) : (
              currentOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-chilean-blue">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-chilean-blue font-chilean">
                          Pedido #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Mesa {order.tableNumber} • {order.orderTime}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {order.specialInstructions && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm">
                          <strong>Instrucciones:</strong> {order.specialInstructions}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-chilean-red">
                          Total: {formatPrice(order.total)}
                        </p>
                        {order.status === 'preparing' && (
                          <div className="flex items-center text-sm text-yellow-600 mt-1">
                            <Clock size={16} className="mr-1" />
                            Tiempo estimado: {order.estimatedTime}
                          </div>
                        )}
                      </div>
                      
                      {order.status === 'ready' && (
                        <Button 
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Marcar como Recogido
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pb-20">
            {pastOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-chilean-blue font-chilean">
                        Pedido #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Mesa {order.tableNumber} • {order.date}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-chilean-red">
                        Total: {formatPrice(order.total)}
                      </p>
                      {order.rating && (
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < order.rating! 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            Tu calificación
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReorderOrder(order)}
                      >
                        <RotateCcw size={16} className="mr-1" />
                        Repetir
                      </Button>
                      
                      {!order.rating && (
                        <Button
                          size="sm"
                          onClick={() => handleRateOrder(order.id, 5)}
                          className="bg-chilean-red hover:bg-chilean-red/90"
                        >
                          <Star size={16} className="mr-1" />
                          Calificar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Orders;
