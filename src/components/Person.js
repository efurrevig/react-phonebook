import Button from './Button'

const Person = ({person, onDelete}) => {
    const handleClick = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            onDelete(person.id)
        }
    }

    return (
        <div>
            {person.name}: {person.number}
            <Button text="delete" onClick={handleClick} />
        </div>
    )
}

export default Person