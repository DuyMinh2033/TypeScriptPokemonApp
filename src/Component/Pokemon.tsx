import React, { useState } from "react";
import { Pokemonss } from "../interface";
import { Modal } from "antd";
import "../App.css";
import "../grid.css";

interface Props {
  poke: Pokemonss[];
}

interface DetailPokemon {
  name: string;
  img: string;
  height: number;
  weight: number;
}

const PokemonComponent: React.FC<Props> = (props) => {
  const [open, setIsOpen] = useState<boolean | undefined>(false);
  const [detail, setDetail] = useState<DetailPokemon>({
    name: "",
    img: "",
    height: 0,
    weight: 0,
  });

  const { poke } = props;

  const handleDetails = (id: number) => {
    const selectedPokemon = poke.find((p) => p.id === id);
    console.log(selectedPokemon);
    if (selectedPokemon) {
      setDetail({
        name: selectedPokemon.name,
        img: selectedPokemon.sprites.front_default,
        height: selectedPokemon.height,
        weight: selectedPokemon.weight,
      });
      setIsOpen(true);
    }
  };

  return (
    <div className="grid wide">
      <div className="row">
        {poke.map((p, index) => {
          return (
            <div
              onClick={() => handleDetails(p.id)}
              key={index}
              className="col l-2"
            >
              <div className="list__poke" key={p.id}>
                <h3 className="title__poke">{p.name}</h3>
                <img
                  className="img__poke"
                  src={p.sprites.front_default}
                  alt={p.name}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        title="Detail"
        open={open}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <h3>Name: {detail.name}</h3>
        <img src={detail.img} alt={detail.name} />
        <h3>Chiều cao: {detail.height} cm</h3>
        <h3>Cân nặng: {detail.weight} kg</h3>
      </Modal>
    </div>
  );
};

export default PokemonComponent;
