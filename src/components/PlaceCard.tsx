import { Star, MapPin, DollarSign, Wifi, Coffee, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlaceCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  tags: string[];
  distance?: string;
  description?: string;
  onClick?: () => void;
}

export const PlaceCard = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  priceRange,
  tags,
  distance,
  description,
  onClick,
}: PlaceCardProps) => {
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
    <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <Heart className="w-4 h-4 text-white" />
        </Button>
        {distance && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
            <MapPin className="w-3 h-3 inline mr-1" />
            {distance}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm ml-2">
            <DollarSign className="w-3 h-3" />
            <span>{priceRange}</span>
          </div>
        </div>

        {description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {rating} ({reviewCount} reseñas)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              {getTagIcon(tag)}
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          variant="hero"
          className="w-full"
          onClick={onClick}
        >
          Ver más
        </Button>
      </div>
    </div>
  );
};