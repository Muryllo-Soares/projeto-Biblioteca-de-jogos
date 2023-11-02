import { useState } from "react"


export default function App(){
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")
  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("obc-game-lib")
    if (!storedGames) return []
    return JSON.parse(storedGames)
  })

  const addGame = ({title, cover}) => {
    const id = Math.floor(Math.random()*1000)
    const game = {id, title, cover}
    setGames(state => {
      const newState = [...state, game]
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }

  const removeGame = (id) => {
    setGames(state => {
      const newState = state.filter(game => game.id !== id)
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }

  const handleSubmit = (ev) =>{
    ev.preventDefault()
    addGame({title, cover})
  }


  return(
    <div id="app">
      <h1>Biblioteca de jogos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input 
          type="text" 
          name="title" 
          id="title" 
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cover">Capa:</label>
          <input 
          type="text" 
          name="cover" 
          id="cover"
          value={cover}
          onChange={(ev)=> setCover(ev.target.value)} 
          />
        </div>
        <button type="submit">Adicionar á biblioteca</button>
      </form>
      <div className="games">
        {games.map((game) =>(
          <div key={game.id}>
            <img src={game.cover} alt="capa do jogo"/>
            <div>
              <h2>{game.title}</h2>
              <button onClick={()=> removeGame(game.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}