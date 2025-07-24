import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink,
  Heart,
  Share,
  Navigation,
  Wifi,
  Coffee,
  Users
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import coffeeWork from "@/assets/coffee-work.jpg";

const PlaceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Datos de ejemplo - en una app real vendría de una API
  const place = {
    id: "1",
    name: "Café Laptop",
    images: [coffeeWork, coffeeWork, coffeeWork],
    rating: 4.5,
    reviewCount: 127,
    priceRange: "$$",
    tags: ["WiFi", "Tranquilo", "Café"],
    description: "Un acogedor café perfecto para trabajar, estudiar o reunirse con amigos. Ofrecemos una selección premium de cafés de especialidad y un ambiente tranquilo con excelente WiFi.",
    address: "Calle 85 #15-30, Zona Rosa",
    phone: "+57 1 234 5678",
    hours: {
      "Lunes": "7:00 AM - 9:00 PM",
      "Martes": "7:00 AM - 9:00 PM", 
      "Miércoles": "7:00 AM - 9:00 PM",
      "Jueves": "7:00 AM - 9:00 PM",
      "Viernes": "7:00 AM - 10:00 PM",
      "Sábado": "8:00 AM - 10:00 PM",
      "Domingo": "8:00 AM - 8:00 PM"
    },
    menu: [
      { name: "Cappuccino", price: "$8.000", description: "Café espresso con leche vaporizada" },
      { name: "Americano", price: "$6.000", description: "Café negro clásico" },
      { name: "Croissant", price: "$5.000", description: "Recién horneado con mantequilla" },
      { name: "Sandwich Club", price: "$15.000", description: "Pollo, tomate, lechuga y mayonesa" }
    ],
    reviews: [
      {
        id: "1",
        user: "María González",
        rating: 5,
        comment: "Excelente lugar para trabajar. WiFi súper rápido y el ambiente es muy tranquilo. El café está delicioso.",
        date: "Hace 2 días"
      },
      {
        id: "2", 
        user: "Carlos Ruiz",
        rating: 4,
        comment: "Muy buen café y atención. Solo le falta más variedad en la comida.",
        date: "Hace 1 semana"
      }
    ],
    features: ["WiFi gratis", "Tomas eléctricas", "Ambiente tranquilo", "Café de especialidad", "Zona de trabajo"]
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'tranquilo':
        return <Coffee className="w-3 h-3" />;
      case 'familiar':
        return <Users className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Share className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Header Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              {place.name}
            </h1>
            <div className="text-lg font-semibold text-muted-foreground">
              {place.priceRange}
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(place.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {place.rating} ({place.reviewCount} reseñas)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {place.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {getTagIcon(tag)}
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground mb-4">
            {place.description}
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="hero" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Cómo llegar
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Llamar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="menu">Menú</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-4">
            {/* Contact Info */}
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <h3 className="font-semibold mb-3">Información de contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-muted-foreground mr-3" />
                  <span className="text-sm">{place.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-muted-foreground mr-3" />
                  <span className="text-sm">{place.phone}</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Horarios
              </h3>
              <div className="space-y-2">
                {Object.entries(place.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <h3 className="font-semibold mb-3">Características</h3>
              <div className="flex flex-wrap gap-2">
                {place.features.map((feature) => (
                  <Badge key={feature} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="mt-4">
            <div className="space-y-3">
              {place.menu.map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-4 shadow-soft">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.name}</h4>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {place.reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-lg p-4 shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {place.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${place.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlaceDetail;