import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/recipe/${id}`)
                setRecipe(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getRecipe()
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/recipe/${id}`)
            navigate('/recipes')
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    console.log(recipe)
    return (
        <div>
            <h1>A recipe</h1>

            <p>{errorMessage}</p>

            <div>
                <Link to={`/recipes/${id}/edit`}>Edit this Recipe</Link>

                <button onClick={handleDelete}>Delete Recipe</button>
            </div>

            <div>
                <h2>{recipe.name}</h2>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Directions: {recipe.directions}</p>
            </div>

            <div>
                <h2>Comments:</h2>
                {/* <p>{recipe.comments}</p> */}

            </div>

        </div>
    )
}