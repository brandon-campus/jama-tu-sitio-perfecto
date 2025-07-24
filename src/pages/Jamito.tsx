import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jamitoMascot from "@/assets/jamito-mascot.png";
import { PlaceCard } from "@/components/PlaceCard";
import coffeeWork from "@/assets/coffee-work.jpg";
import romanticDinner from "@/assets/romantic-dinner.jpg";
import familyRestaurant from "@/assets/family-restaurant.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  places?: any[];
}

const Jamito = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy Jamito, tu asistente gastronómico 🍽️ ¿Qué tipo de lugar estás buscando hoy? Puedo ayudarte a encontrar el sitio perfecto según tu estado de ánimo, compañía y preferencias.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simular respuesta de Jamito
    setTimeout(() => {
      const jamitoResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getJamitoResponse(currentMessage),
        isUser: false,
        timestamp: new Date(),
        places: getPlaceSuggestions(currentMessage),
      };
      setMessages(prev => [...prev, jamitoResponse]);
    }, 1000);

    setCurrentMessage("");
  };

  const getJamitoResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('trabajo') || message.includes('estudiar') || message.includes('wifi')) {
      return "¡Perfecto! Para trabajar te recomiendo lugares tranquilos con buen WiFi. He encontrado algunos cafés ideales cerca de ti:";
    } else if (message.includes('cita') || message.includes('romántico') || message.includes('pareja')) {
      return "¡Qué romántico! Te sugiero algunos lugares perfectos para una cita especial:";
    } else if (message.includes('familia') || message.includes('niños') || message.includes('familiar')) {
      return "¡Excelente! Aquí tienes restaurantes perfectos para disfrutar en familia:";
    } else {
      return "Basándome en lo que me cuentas, creo que estos lugares podrían interesarte:";
    }
  };

  const getPlaceSuggestions = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('trabajo') || message.includes('estudiar') || message.includes('wifi')) {
      return [
        {
          id: "1",
          name: "Café Laptop",
          image: coffeeWork,
          rating: 4.5,
          reviewCount: 127,
          priceRange: "$$",
          tags: ["WiFi", "Tranquilo", "Café"],
          distance: "0.3 km",
          description: "Ambiente perfecto para trabajar con excelente WiFi"
        }
      ];
    } else if (message.includes('cita') || message.includes('romántico') || message.includes('pareja')) {
      return [
        {
          id: "2",
          name: "La Terraza Romántica",
          image: romanticDinner,
          rating: 4.8,
          reviewCount: 89,
          priceRange: "$$$",
          tags: ["Romántico", "Terraza", "Cena"],
          distance: "0.7 km",
          description: "Ambiente íntimo con vista hermosa"
        }
      ];
    } else if (message.includes('familia') || message.includes('niños') || message.includes('familiar')) {
      return [
        {
          id: "3",
          name: "Restaurante Familiar",
          image: familyRestaurant,
          rating: 4.6,
          reviewCount: 203,
          priceRange: "$$",
          tags: ["Familiar", "Pet Friendly", "Espacioso"],
          distance: "0.5 km",
          description: "Perfecto para disfrutar en familia"
        }
      ];
    }
    
    return [];
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Aquí iría la lógica de reconocimiento de voz
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-soft p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img
          src={jamitoMascot}
          alt="Jamito"
          className="w-10 h-10 mr-3"
        />
        <div>
          <h1 className="font-semibold text-lg">Jamito</h1>
          <p className="text-sm text-muted-foreground">
            Tu asistente gastronómico
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-card text-card-foreground shadow-soft mr-4"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Place suggestions */}
            {message.places && message.places.length > 0 && (
              <div className="mt-4 space-y-3">
                {message.places.map((place) => (
                  <PlaceCard
                    key={place.id}
                    {...place}
                    onClick={() => navigate(`/place/${place.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Cuéntame qué estás buscando..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                isListening ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="default"
            size="icon"
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Jamito;