import { useState, useEffect } from "react";
import { Grid2, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DenseAppBar from "./Navbar";
import './index.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const App = () => {
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [arrow, setArrow] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Para el modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const typeColors = {
    fire: '#fcae1e',
    water: '#1e90ff',
    grass: '#4caf50',
    electric: '#ffeb3b',
    ice: '#00bcd4',
    psychic: '#e91e63',
    normal: '#9e9e9e',
    fairy: '#e6a8fc',
    flying: '#a8bcfc',
    poison: '#73ccd5',
    bug: '#f87878',
    ground: '#a77272',
    fighting: '#d0d3ea',
    rock: '#b5b5b5',
    steel: '#bababa',
    ghost: '#cff2fa',
    dark: '#6f6f6f'
  };

  const getTypeStyle = (type) => {
    return {
      backgroundColor: typeColors[type] || '#ffffff',
      padding: '2px',
      borderRadius: '5px',
      margin: '1px',
      height: '14px',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px'
    };
  };

  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setArrow(true);
      } else {
        setArrow(false);
      }
    };
    window.addEventListener('scroll', handelScroll);
    return () => {
      window.removeEventListener('scroll', handelScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getPokemon = async () => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const pokemonList = await response.json();

    const newPokemones = await Promise.all(
      pokemonList.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default,
          type: poke.types,
          height: poke.height,  // Añadir detalles adicionales
          weight: poke.weight,
        };
      })
    );

    setPokemones(prev => [...prev, ...newPokemones]);
    setLoading(false);
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 20);
  };

  const handleClickOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon); // Guardar el Pokémon seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setSelectedPokemon(null); // Limpiar el Pokémon seleccionado
  };

  const filteredPokemones = busqueda
    ? pokemones.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : pokemones;

  const uniquePokemones = Array.from(
    new Map(filteredPokemones.map((pokemon) => [pokemon.id, pokemon])).values()
  );

  return (
    <div className="app-container">
      <DenseAppBar setBusqueda={setBusqueda} />

      {loading && offset === 0 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <CircularProgress color="black" />
        </div>
      ) : (
        <>
          <Grid2
            container
            sx={{
              width: '100%',
              maxWidth: { xs: '300px', sm: '1000px' },
              margin: '0 auto',
              backgroundColor: 'white',
              marginTop: '20px',
              padding: { xs: '10px', sm: '12px' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1px',
              borderRadius: '10px'
            }}
          >
            {uniquePokemones.map(pokemon => (
              <div className="cards" key={pokemon.id} onClick={() => handleClickOpenModal(pokemon)}>
                <Card sx={{
                  width: '230px', height: '300px', '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  }
                }}>
                  <CardMedia
                    sx={{
                      height: '200px',
                      width: '100%',
                      objectFit: 'contain',
                      backgroundSize: 'contain',
                      backgroundColor: '#f3f3f3',
                    }}
                    image={pokemon.img}
                    title={pokemon.name}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                      {pokemon.name.toUpperCase()}
                    </Typography>
                    <Typography>
                      {pokemon.type.map((element) => (
                        <span
                          className="tipo"
                          style={getTypeStyle(element.type.name)}
                          key={`${pokemon.id}-${element.type.name}`}
                        >
                          {element.type.name.toUpperCase()}
                        </span>
                      ))}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid2>

          <div>
            {!loading && (
              <div style={{ textAlign: 'center', marginTop: '20px', alignContent: 'center' }}>
                <Button variant="contained" onClick={handleLoadMore}>Cargar más
                  <CatchingPokemonIcon></CatchingPokemonIcon>
                </Button>
              </div>
            )}
          </div>

          {loading && offset > 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <CircularProgress color="black" />
            </div>
          )}
        </>
      )}

      {arrow && (
        <div onClick={scrollToTop} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}>
          <ArrowUpwardIcon />
        </div>
      )}

      {/* Modal para mostrar más detalles del Pokémon */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedPokemon?.name.toUpperCase()}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Altura:</strong> {selectedPokemon?.height} decímetros
          </Typography>
          <Typography variant="body1">
            <strong>Peso:</strong> {selectedPokemon?.weight} hectogramos
          </Typography>
          <Typography variant="body1">
            <strong>Tipo:</strong> {selectedPokemon?.type.map(t => t.type.name).join(', ')}
          </Typography>
          <img
            src={selectedPokemon?.img}
            alt={selectedPokemon?.name}
            style={{ width: '100%', marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
