
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { User, Mail, Bell, Star, Award, History } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+56 9 8765 4321',
    preferences: ['sin-lactosa', 'vegetariano']
  });

  const stats = {
    totalOrders: 47,
    favoriteCategory: 'Principales',
    totalSpent: 324500,
    averageRating: 4.8
  };

  const achievements = [
    { title: 'Cliente Frecuente', description: '20+ pedidos realizados', icon: '🏆' },
    { title: 'Crítico Gourmet', description: '15+ reseñas escritas', icon: '⭐' },
    { title: 'Explorador', description: 'Probó 10+ platos diferentes', icon: '🗺️' }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido guardados exitosamente.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chilean-wheat/20 to-chilean-terracotta/10">
      <Header title="Mi Perfil" showCart={false} />
      
      <div className="px-4 py-4">
        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-chilean-blue rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-chilean-blue font-chilean">
                  {userData.name}
                </h2>
                <p className="text-gray-600">{userData.email}</p>
                <Badge className="bg-chilean-red text-white mt-1">
                  Cliente Frecuente
                </Badge>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  placeholder="Nombre completo"
                />
                <Input
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  placeholder="Correo electrónico"
                  type="email"
                />
                <Input
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  placeholder="Teléfono"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-chilean-blue">
                    Guardar
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-full border-chilean-blue text-chilean-blue"
              >
                Editar Perfil
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <History className="mx-auto mb-2 text-chilean-blue" size={24} />
              <p className="text-2xl font-bold text-chilean-red">{stats.totalOrders}</p>
              <p className="text-sm text-gray-600">Pedidos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="mx-auto mb-2 text-chilean-blue" size={24} />
              <p className="text-2xl font-bold text-chilean-red">{stats.averageRating}</p>
              <p className="text-sm text-gray-600">Rating Promedio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="mx-auto mb-2 text-chilean-blue" size={24} />
              <p className="text-sm font-bold text-chilean-red">{stats.favoriteCategory}</p>
              <p className="text-sm text-gray-600">Categoría Favorita</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-chilean-red">
                {formatPrice(stats.totalSpent)}
              </p>
              <p className="text-sm text-gray-600">Total Gastado</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-chilean-blue font-chilean">
              🏆 Logros Desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-chilean-blue/10 to-chilean-red/10 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold text-chilean-blue">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-chilean-blue font-chilean">
              Preferencias Alimentarias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 flex-wrap gap-2">
              {userData.preferences.map((pref) => (
                <Badge key={pref} variant="secondary">
                  {pref === 'sin-lactosa' ? '🥛 Sin Lactosa' : 
                   pref === 'vegetariano' ? '🌱 Vegetariano' : pref}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-20">
          <CardHeader>
            <CardTitle className="text-chilean-blue font-chilean">
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell size={20} className="text-chilean-blue" />
                <span>Notificaciones</span>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-chilean-blue" />
                <span>Promociones por email</span>
              </div>
              <Button variant="outline" size="sm">
                Activar
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
            >
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
