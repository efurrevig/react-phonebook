import FormInput from './FormInput';

const Form = ( {onSubmit, inputs} ) => {
    const handleSubmit = (event) => {
        onSubmit(event)
    }

    return (
        <form onSubmit={handleSubmit}>
            {inputs.map(input => (
                <FormInput
                    key={input.label}
                    label={input.label}
                    value={input.value}
                    onChange={input.onChange}
                />
            ))}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form