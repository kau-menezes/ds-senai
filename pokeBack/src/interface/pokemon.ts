export interface IPokemon {
    poke_id: number, 
    name: string, 
    types: {
        name: string
    }[]
}