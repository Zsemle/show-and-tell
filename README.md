# Launch project
Start the API server with:
```
npm run api
```
Then start the development server with:
```
npm start
```

# API:

http://localhost:3001/carbrands

Get an array of all the car brands, with all their available models at once.
Response data: [CarBrand]

http://localhost:3001/carbrandslight

Get an array of all the car brands, with all their available models at once.
Response data: [CarBrandLight]

http://localhost:3001//modelsofcarbrand/{id}

Parameters:
|  name 	        |   type	| description  	                                        |
|---	            |---	    |---	                                                |
|id   	            |string	    |unique identifier for this brand          	            |

Get a list of all the car models produced by the brand with the given {id}
Response data: [CarModel]


Response data types:

CarBrand:
|  name 	        |   type	| description  	                                        |
|---	            |---	    |---	                                                |
|id   	            |string	    |unique identifier for this brand          	            |
|displayName        |string	    |Friendly name of the car brand            	            |
|availableModels    |[CarModel] |A list of all the car models produced by this brand    |

CarBrandLight:
|  name 	        |   type	| description  	                                        |
|---	            |---	    |---	                                                |
|id   	            |string	    |unique identifier for this brand          	            |
|displayName        |string	    |Friendly name of the car brand            	            |

CarModel:
|  name 	        |   type	| description  	                                        |
|---	            |---	    |---	                                                |
|id   	            |string	    |unique identifier for this car model      	            |
|displayName        |string	    |Friendly name of the car model            	            |


## special considerations
Considering the scope of this project, the following also applies:
- All the available fields MUST be present.
- All the fields having a string type MUST NOT have empty string as a value.
- All the fields MUST NOT have null as value.
