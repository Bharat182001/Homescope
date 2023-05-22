import React from 'react'
import Search from './Search'

function Buy(props) {
  return (
    <div>
      <Search />

        <div className='cards__section'>
          <h3>Homes Listed</h3>
          <hr />
          <div className='cards'>
            {props.homes.map((home, index) => (
              <div className="card" key={index} onClick={() => props.togglePopHome(home)}>
                <div className="card__image">
                  <img src= {home.image} alt="Home Images" />
                </div>
                <div className="card__info">
                  <h4>{home.attributes[0].value} ETH</h4>
                  <p>
                    <strong>{home.attributes[2].value}</strong> Beds | 
                    <strong>{home.attributes[3].value}</strong> ba |
                    <strong>{home.attributes[4].value}</strong> sqft
                  </p>
                  <p>{home.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='cards__section'>
          <h3>Cars Listed</h3>
          <hr />
          <div className='cards'>
            {props.cars.map((car, index) => (
              <div className="card" key={index} onClick={() => props.togglePopCar(car)}>
                <div className="card__image">
                  <img src= {car.image} alt="Cars Images" />
                </div>
                <div className="card__info">
                  <h4>{car.attributes[0].value} ETH</h4>
                  <p>
                    Seates - <strong>{car.attributes[2].value}</strong> | 
                    Mileage - <strong>{car.attributes[3].value}</strong> |
                    Model - <strong>{car.attributes[4].value}</strong> | 
                    SunRoof- <strong>{car.attributes[5].value}</strong>
                  </p>
                  <p>{car.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='cards__section_storey'>
          <h3>Storeys Listed</h3>
          <hr />
          <div className='cards_storey'>
            {props.storeys.map((storey, index) => (
              <div className="card_storey" key={index} onClick={() => props.togglePopStorey(storey)}>
                <div className="card__image_storey">
                  <img src= {storey.image} alt="Storey Images" />
                </div>
                <div className="card__info_storey">
                  <h4>{storey.attributes[0].value} ETH</h4>
                  <p>
                    High Security - <strong>{storey.attributes[1].value}</strong> | 
                    Swimming Pool - <strong>{storey.attributes[2].value}</strong> |
                    3BHK+ - <strong>{storey.attributes[3].value}</strong> |
                    Gym+Spa - <strong>{storey.attributes[4].value}</strong> |
                    StoreHouse Included - <strong>{storey.attributes[5].value}</strong>
                  </p>
                  <p>{storey.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  )
}

export default Buy