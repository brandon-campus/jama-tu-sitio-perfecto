import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, MapPin } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlaceCard } from "@/components/PlaceCard";
import coffeeWork from "@/assets/coffee-work.jpg";
import romanticDinner from "@/assets/romantic-dinner.jpg";
import familyRestaurant from "@/assets/family-restaurant.jpg";

interface FilterOption {
  id: string;
  label: string;
  category: string;
}

const filterOptions: FilterOption[] = [
  // Tipo de lugar
  { id: "cafeteria", label: "Cafetería", category: "tipo" },
  { id: "restaurante", label: "Restaurante", category: "tipo" },
  { id: "bar", label: "Bar", category: "tipo" },
  
  // Ideal para
  { id: "trabajar", label: "Trabajar", category: "ideal" },
  { id: "citas", label: "Citas", category: "ideal" },
  { id: "familia", label: "Familia", category: "ideal" },
  { id: "nuevo", label: "Algo nuevo", category: "ideal" },
  
  // Ambiente
  { id: "tranquilo", label: "Tranquilo", category: "ambiente" },
  { id: "animado", label: "Animado", category: "ambiente" },
  
  // Precio
  { id: "economico", label: "$", category: "precio" },
  { id: "moderado", label: "$$", category: "precio" },
  { id: "caro", label: "$$$", category: "precio" },
  
  // Extras
  { id: "wifi", label: "WiFi", category: "extras" },
  { id: "terraza", label: "Terraza", category: "extras" },
  { id: "petfriendly", label: "Pet Friendly", category: "extras" },
  { id: "reservas", label: "Reservas", category: "extras" },
];

const samplePlaces = [
  {
    id: "1",
    name: "Café Laptop",
    image: coffeeWork,
    rating: 4.5,
    reviewCount: 127,
    priceRange: "$$",
    tags: ["WiFi", "Tranquilo", "Café"],
    distance: "0.3 km",
    description: "Ambiente perfecto para trabajar con excelente WiFi y café de especialidad"
  },
  {
    id: "2",
    name: "La Terraza Romántica",
    image: romanticDinner,
    rating: 4.8,
    reviewCount: 89,
    priceRange: "$$$",
    tags: ["Romántico", "Terraza", "Cena"],
    distance: "0.7 km",
    description: "Ambiente íntimo con vista hermosa, perfecto para cenas especiales"
  },
  {
    id: "3",
    name: "Restaurante Familiar",
    image: familyRestaurant,
    rating: 4.6,
    reviewCount: 203,
    priceRange: "$$",
    tags: ["Familiar", "Pet Friendly", "Espacioso"],
    distance: "0.5 km",
    description: "Perfecto para disfrutar en familia con menú para niños"
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    const category = searchParams.get('category');
    return category ? [category] : [];
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const getFiltersByCategory = (category: string) => {
    return filterOptions.filter(option => option.category === category);
  };

  const filteredPlaces = samplePlaces.filter(place => {
    // Filtro por búsqueda
    if (searchQuery) {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           place.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
    }

    // Filtros seleccionados
    if (selectedFilters.length > 0) {
      // Aquí implementarías la lógica de filtrado real
      // Por ahora, solo mostramos los lugares que coinciden con algunos filtros básicos
      if (selectedFilters.includes('trabajar') || selectedFilters.includes('trabajo')) {
        return place.tags.some(tag => tag.toLowerCase().includes('wifi') || tag.toLowerCase().includes('tranquilo'));
      }
      if (selectedFilters.includes('citas') || selectedFilters.includes('cita')) {
        return place.tags.some(tag => tag.toLowerCase().includes('romántico'));
      }
      if (selectedFilters.includes('familia')) {
        return place.tags.some(tag => tag.toLowerCase().includes('familiar'));
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-soft p-4">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">Explorar lugares</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar lugares, comida, ambiente..."
            className="pl-10"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {selectedFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedFilters.length}
              </Badge>
            )}
          </Button>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {filteredPlaces.length} lugares encontrados
          </div>
        </div>

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedFilters.map(filterId => {
              const filter = filterOptions.find(f => f.id === filterId);
              return filter ? (
                <Badge
                  key={filterId}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filterId)}
                >
                  {filter.label} ×
                </Badge>
              ) : null;
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs"
            >
              Limpiar
            </Button>
          </div>
        )}
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card border-b border-border p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Tipo de lugar</h3>
            <div className="flex flex-wrap gap-2">
              {getFiltersByCategory('tipo').map(filter => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Ideal para</h3>
            <div className="flex flex-wrap gap-2">
              {getFiltersByCategory('ideal').map(filter => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Ambiente</h3>
            <div className="flex flex-wrap gap-2">
              {getFiltersByCategory('ambiente').map(filter => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Precio</h3>
            <div className="flex flex-wrap gap-2">
              {getFiltersByCategory('precio').map(filter => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Extras</h3>
            <div className="flex flex-wrap gap-2">
              {getFiltersByCategory('extras').map(filter => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="p-4">
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No se encontraron lugares con los filtros seleccionados
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlaces.map(place => (
              <PlaceCard
                key={place.id}
                {...place}
                onClick={() => navigate(`/place/${place.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;