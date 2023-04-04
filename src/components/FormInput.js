
const FormInput = ({ label, value, onChange }) => {
    return (
        <div>
            {label}: <input value={value} onChange={onChange} />
        </div>
    )
}

export default FormInput