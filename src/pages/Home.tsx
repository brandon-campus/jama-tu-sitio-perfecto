import { Button } from "@/components/ui/button";
import { MessageCircle, Search, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-restaurant.jpg";
import jamitoMascot from "@/assets/jamito-mascot.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative h-64 overflow-hidden">
        <img
          src={heroImage}
          alt="Restaurante acogedor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
          <h1 className="text-4xl font-bold mb-2 text-center">
            Jama
          </h1>
          <p className="text-lg text-center opacity-90 max-w-sm">
            Encuentra el lugar perfecto para cada momento
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 -mt-8 relative z-10">
        {/* Quick Stats */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Lugares</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">4.8</div>
              <div className="text-sm text-muted-foreground">Calificación</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">25k+</div>
              <div className="text-sm text-muted-foreground">Reseñas</div>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4 mb-8">
          <Button
            variant="hero"
            size="lg"
            className="w-full h-20 flex items-center justify-between p-6"
            onClick={() => navigate('/jamito')}
          >
            <div className="flex items-center">
              <img
                src={jamitoMascot}
                alt="Jamito"
                className="w-12 h-12 mr-4"
              />
              <div className="text-left">
                <div className="text-xl font-bold">Habla con Jamito</div>
                <div className="text-sm opacity-90">
                  Recomendaciones personalizadas
                </div>
              </div>
            </div>
            <MessageCircle className="w-6 h-6" />
          </Button>

          <Button
            variant="fresh"
            size="lg"
            className="w-full h-20 flex items-center justify-between p-6"
            onClick={() => navigate('/explore')}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4 bg-white/20 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">Explorar lugares</div>
                <div className="text-sm opacity-90">
                  Busca con filtros avanzados
                </div>
              </div>
            </div>
            <Search className="w-6 h-6" />
          </Button>
        </div>

        {/* Quick Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            ¿Qué estás buscando?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="card"
              className="h-24 flex flex-col items-center justify-center"
              onClick={() => navigate('/explore?category=trabajo')}
            >
              <MapPin className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm font-medium">Para trabajar</span>
            </Button>
            <Button
              variant="card"
              className="h-24 flex flex-col items-center justify-center"
              onClick={() => navigate('/explore?category=cita')}
            >
              <Clock className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Cita romántica</span>
            </Button>
            <Button
              variant="card"
              className="h-24 flex flex-col items-center justify-center"
              onClick={() => navigate('/explore?category=familia')}
            >
              <MessageCircle className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm font-medium">En familia</span>
            </Button>
            <Button
              variant="card"
              className="h-24 flex flex-col items-center justify-center"
              onClick={() => navigate('/explore?category=nuevo')}
            >
              <Search className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Algo nuevo</span>
            </Button>
          </div>
        </div>

        {/* Near You */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Cerca de ti
          </h2>
          <div className="space-y-3">
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Café Central</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfecto para trabajar • 0.2 km
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">4.5 ⭐</div>
                  <div className="text-xs text-muted-foreground">Abierto</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">La Terraza</h3>
                  <p className="text-sm text-muted-foreground">
                    Ideal para cenas • 0.5 km
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">4.7 ⭐</div>
                  <div className="text-xs text-muted-foreground">Abierto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;