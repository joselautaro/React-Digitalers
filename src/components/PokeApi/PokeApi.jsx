import React, { useState, useEffect } from "react";

export const PokeApi = () => {

    const [pokemon, setPokemon] = useState("");

    const [id, setId] = useState(1);

    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon({
                    numero: data.id,
                    nombre: data.name,
                    img: data.sprites.front_default
                })
            })
    }, [id])

    const anterior = () => {
        id > 1 && setId(id - 1)
    }
    const siguiente = () => {
        setId(id + 1)
    }

    const inputChange = (e) => {
        setBusqueda(e.target.value);
    }
    const submit = (e) => {
        e.preventDefault()
        if (busqueda.length > 2) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
                .then((res) => res.json())
                .then((data) => {
                    setPokemon({
                        nombre: data.name,
                        img: data.sprites.front_default
                    })
                    setId(
                        data.id
                    )
                })
        }
    }




    return (
        <>
            <div>
                {
                    !pokemon ? <h3>Cargando...</h3> :
                        <div>
                            <form onSubmit={submit}>
                                <input
                                    type="text"
                                    value={busqueda}
                                    onChange={inputChange}
                                />
                            </form>
                            <h3>{pokemon.numero}</h3>
                            <h3>{pokemon.nombre}</h3>
                            <img src={pokemon.img} alt={pokemon.img} />
                            <div>
                                <button onClick={anterior}>◀</button>
                                <button onClick={siguiente}>▶</button>
                            </div>
                        </div>
                }

            </div>
        </>

    )
}