import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';
import { Link } from 'react-router-dom';

const Car = ({ car, provider, account, escrow, togglePopCar }) => {
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)
    const [seller, setSeller] = useState(null)

    const [owner, setOwner] = useState(null)

    const fetchDetails = async () => {
        // -- Buyer

        const buyer = await escrow.buyer(car.id)
        setBuyer(buyer)

        const hasBought = await escrow.approval(car.id, buyer)
        setHasBought(hasBought)

        // -- Seller

        const seller = await escrow.seller()
        setSeller(seller)

        const hasSold = await escrow.approval(car.id, seller)
        setHasSold(hasSold)

        // -- Lender

        const lender = await escrow.lender()
        setLender(lender)

        const hasLended = await escrow.approval(car.id, lender)
        setHasLended(hasLended)

        // -- Inspector

        const inspector = await escrow.inspector()
        setInspector(inspector)

        const hasInspected = await escrow.inspectionPassed(car.id)
        setHasInspected(hasInspected)
    }

    const fetchOwner = async () => {
        if (await escrow.isListed(car.id)) return

        const owner = await escrow.buyer(car.id)
        setOwner(owner)
    }

    const buyHandler = async () => {
        const escrowAmount = await escrow.escrowAmount(car.id)
        const signer = await provider.getSigner()

        // Buyer deposit earnest
        let transaction = await escrow.connect(signer).depositEarnest(car.id, { value: escrowAmount })
        await transaction.wait()

        // Buyer approves...
        transaction = await escrow.connect(signer).approveSale(car.id)
        await transaction.wait()

        setHasBought(true)
    }

    const inspectHandler = async () => {
        const signer = await provider.getSigner()

        // Inspector updates status
        const transaction = await escrow.connect(signer).updateInspectionStatus(car.id, true)
        await transaction.wait()

        setHasInspected(true)
    }

    const lendHandler = async () => {
        const signer = await provider.getSigner()

        // Lender approves...
        const transaction = await escrow.connect(signer).approveSale(car.id)
        await transaction.wait()

        // Lender sends funds to contract...
        const lendAmount = (await escrow.purchasePrice(car.id) - await escrow.escrowAmount(car.id))
        await signer.sendTransaction({ to: escrow.address, value: lendAmount.toString(), gasLimit: 60000 })

        setHasLended(true)
    }

    const sellHandler = async () => {
        const signer = await provider.getSigner()

        // Seller approves...
        let transaction = await escrow.connect(signer).approveSale(car.id)
        await transaction.wait()

        // Seller finalize...
        transaction = await escrow.connect(signer).finalizeSale(car.id)
        await transaction.wait()

        setHasSold(true)
    }

    useEffect(() => {
        fetchDetails()
        fetchOwner()
    }, [hasSold])

    return (
        <>
        <div className="home">
            <div className='home__details'>
                <div className="home__image">
                    <img src={car.image} alt="Home" />
                </div>
                <div className="home__overview">
                    <h2>{car.name}</h2>
                    <p>
                        Seates - <strong>{car.attributes[2].value}</strong> |
                        Mileage - <strong>{car.attributes[3].value}</strong> | 
                        Model - <strong>{car.attributes[4].value}</strong> 
                        <br />
                        SunRoof- <strong>{car.attributes[5].value}</strong> 
                    </p>
                    <p>{car.address}</p>

                    <h2>{car.attributes[0].value} ETH</h2>

                    {owner ? (
                        <div className='home__owned'>
                            Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                        </div>
                    ) : (
                        <div>
                            {(account === inspector) ? (
                                <button className='home__buy' onClick={inspectHandler} disabled={hasInspected}>
                                    Approve Inspection
                                </button>
                            ) : (account === lender) ? (
                                <button className='home__buy' onClick={lendHandler} disabled={hasLended}>
                                    Approve & Lend
                                </button>
                            ) : (account === seller) ? (
                                <button className='home__buy' onClick={sellHandler} disabled={hasSold}>
                                    Approve & Sell
                                </button>
                            ) : (
                                <button className='home__buy' onClick={buyHandler} disabled={hasBought}>
                                    Buy
                                </button>
                            )}

                            <button className='home__contact'>
                                Contact agent
                            </button>
                        </div>
                    )}

                    <hr />

                    <h2>Overview</h2>

                    <p>
                        {car.description}
                    </p>

                    <hr />

                    <h2>Facts and features</h2>

                    <ul>
                        {car.attributes.map((attribute, index) => (
                            <li key={index}><strong>{attribute.trait_type}</strong> : {attribute.value}</li>
                        ))}
                    </ul>

                    <hr />

                    <h2>Customer Reviews</h2>
                    <Link className='btn btn-warning home__review' to="/review" role='button'
                    onClick={togglePopCar} car={car}>Take a look</Link>
                </div>


                <button onClick={togglePopCar} className="home__close">
                    <img src={close} alt="Close" />
                </button>
            </div>
        </div >
        </>
    );
}

export default Car;