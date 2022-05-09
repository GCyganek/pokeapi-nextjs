# Introductory task NextJS version

## Tasks

### Building a starter website

You'll use [PokeAPI](https://pokeapi.co) to fill your website with ready to use data, the app will consist of 4 pages:

1. Homepage
2. List of all pokemon
3. Favourite Pokémon page
4. Map page

### Homepage

This is a landing page and preview of other pages with links, something to entice users to checkout rest of the site. For example you can show a small list of pokemon with a link to proper page, a little box showing the pokemon user has favourited or an invitation to favourite onw, and a preview of a map.

How do you make this website load fast?

### List of all pokemon page

List of all pokemon, you can either choose pagination or infinite scrolling. Nice to show all of the pokemon photos. Is this feasible with this api?

Clicking on pokemon allows you to view it's information and favourite it.

### Favourite pokemon page

Displays your favourite pokemon (you can store the data in local storage), displays basic information about the pokemon, it's photo.

Nice to have an empty state when there is no pokemon.

Button that lets you unfavourite your pokemon.

### Map page

On this page there should be a map where you can add a new pin. Upon placing a pin you should be able to attach pokemon to it, indicating that it was spotted in this place.

If you have any other ideas for the map feel free!

How do you load a page with map quickly?

Use following libraries to setup the map:

- react-map-gl
- maplibre-gl
