export let getFavoriteInfo = (props) => {

  let { name, 
    species, 
    homeworld, 
    population, 
    language, 
    terrain, 
    model, 
    vehicle_class, 
    residents, 
    climate, 
    type,
    passengers,
   } = props

  if (type === 'people') {
    return { name, species, homeworld, population, language, type}
  }

  if (type === 'vehicles') {
    return { name, model, vehicle_class, passengers, type}
  }

  if (type === 'planets') {
    return { name, population, terrain, climate, residents, type}
  }

}

export let getCardClass = (favorites, name) => {
  if (favorites.map(favorite => favorite.name).includes(name)) {
    return 'favorite'
  } else {
    return ''
  }
}