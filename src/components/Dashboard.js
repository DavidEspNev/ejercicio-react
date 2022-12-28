import React, { Component } from "react";
import { Modal } from "./Modal.js";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      pokemonList: [],
      pokemon: "",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=25`).then((res) => {
      const pokemonList = res.data.results;
      this.setState({ pokemonList });
    });
  }

  getSinglePokemon = (url) => {
    axios.get(url).then((res) => {
      const nombre = res.data;
      this.setState({ nombre });
      this.setState({ pokemon: nombre });
      console.log(nombre);
    });
    this.setState({ show: true });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <h1>Pokemon List</h1>

        <Modal
          show={this.state.show}
          poke={this.state.pokemon}
          handleClose={this.hideModal}
        >
          <h1>Pokemon Information</h1>
        </Modal>

        <ul>
          {this.state.pokemonList.map((pokemonSingle) => (
            <li
              key={pokemonSingle.url}
              onClick={(e) => this.getSinglePokemon(pokemonSingle.url)}
            >
              {pokemonSingle.name}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}
